/**
 * Generates placeholder ATC audio for every step with atcText:
 * macOS `say` -> ffmpeg (radio band-pass, compression, light noise) -> MP3.
 * Only missing files are created; pass --force to rebuild placeholders.
 * Real voices (ElevenLabs / OpenAI TTS) replace these files later; files not listed
 * in public/audio/atc/placeholders.json are never overwritten.
 * Scenarios come from the backend API (see fetch-content.ts).
 * Usage: npm run audio:atc [-- --force]
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'

import { toSpoken } from '../src/shared/lib/phraseology/to-spoken.ts'
import { PUBLIC_DIR, fetchContent } from './fetch-content.ts'

const VOICE = 'Daniel'
const force = process.argv.includes('--force')
const placeholdersPath = join(PUBLIC_DIR, 'audio/atc/placeholders.json')
const placeholders = new Set<string>(
  existsSync(placeholdersPath) ? JSON.parse(readFileSync(placeholdersPath, 'utf8')) : [],
)

const RADIO_FILTER =
  '[0:a]highpass=f=300,lowpass=f=3400,acompressor=threshold=-20dB:ratio=4:makeup=6[v];' +
  'anoisesrc=color=pink:amplitude=0.015:sample_rate=22050[n];[v][n]amix=inputs=2:duration=first:normalize=0[out]'

let created = 0
let skipped = 0

const { scenarios } = await fetchContent()

for (const scenario of scenarios) {
  for (const step of scenario.steps) {
    if (!step.atcText || !step.atcAudio) continue
    const target = join(PUBLIC_DIR, step.atcAudio)
    const isPlaceholder = placeholders.has(step.atcAudio)

    if (existsSync(target) && !(force && isPlaceholder)) {
      skipped += 1
      continue
    }

    mkdirSync(dirname(target), { recursive: true })
    const aiff = join(tmpdir(), `atc-${process.pid}-${created}.aiff`)
    execFileSync('say', ['-v', VOICE, '-r', '185', '-o', aiff, toSpoken(step.atcText)])
    execFileSync('ffmpeg', [
      '-y',
      '-loglevel',
      'error',
      '-i',
      aiff,
      '-filter_complex',
      RADIO_FILTER,
      '-map',
      '[out]',
      '-ac',
      '1',
      '-ar',
      '22050',
      '-b:a',
      '48k',
      target,
    ])
    rmSync(aiff)
    placeholders.add(step.atcAudio)
    created += 1
    console.log(`created ${step.atcAudio}`)
  }
}

writeFileSync(placeholdersPath, `${JSON.stringify([...placeholders].sort(), null, 2)}\n`)
console.log(`\n${created} created, ${skipped} already present`)
