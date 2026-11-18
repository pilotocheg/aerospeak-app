/**
 * Generates placeholder ATC audio for every step with atcText, in every scenario variant:
 * macOS `say` -> ffmpeg (radio band-pass, compression, radio hiss) -> MP3.
 *
 * A transmission is stitched from clips, so variants share most of their audio:
 * the callsign at the start ("SP-TFA, ..."), the body, and the wind at the end
 * ("..., wind 270 degrees 10 knots."). Each clip is spoken once and cached in
 * node_modules/.cache/atc-audio; the radio effect runs over the whole stitched
 * transmission, so the joins sit under the same hiss. Only the body is new per text:
 * that is what a paid TTS voice will be charged for.
 *
 * Only missing files are created; pass --force to rebuild placeholders. Placeholders no
 * scenario uses any more are deleted. Files not listed in public/audio/atc/placeholders.json
 * (real voices) are never overwritten or deleted.
 * Scenarios come from the backend API (see fetch-content.ts).
 * Usage: npm run audio:atc [-- --force]
 */
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { toSpoken } from '../src/shared/lib/phraseology/to-spoken.ts'
import { PUBLIC_DIR, ROOT, fetchContent } from './fetch-content.ts'

const VOICE = 'Daniel'
const RATE = '185'
/** Pause between stitched clips, as at a comma. */
const GAP_SECONDS = 0.12
const force = process.argv.includes('--force')
const placeholdersPath = join(PUBLIC_DIR, 'audio/atc/placeholders.json')
const placeholders = new Set<string>(
  existsSync(placeholdersPath) ? JSON.parse(readFileSync(placeholdersPath, 'utf8')) : [],
)
const cacheDir = join(ROOT, 'node_modules/.cache/atc-audio', VOICE)
mkdirSync(cacheDir, { recursive: true })

// Voice: radio band-pass + compression, 0.2 s lead-in and 0.25 s tail of open-mic hiss.
// Noise: band-limited white hiss with slight fading (tremolo); the mix is soft-clipped.
const RADIO_FILTER =
  'highpass=f=300,lowpass=f=3400,acompressor=threshold=-20dB:ratio=4:makeup=6,adelay=200,apad=pad_dur=0.25[v];' +
  'anoisesrc=color=white:amplitude=0.05:sample_rate=22050,highpass=f=400,lowpass=f=3000,tremolo=f=6:d=0.25[n];' +
  '[v][n]amix=inputs=2:duration=first:normalize=0,asoftclip=type=tanh,afade=t=in:d=0.01[out]'

const CALLSIGN = /^([A-Z0-9]{1,2}-[A-Z]{3,4}),\s*/
const WIND = /,\s*(wind \d{3} degrees \d+ knots)\.?$/

/** "SP-TFA, Poznań Tower, cleared to land, wind 270 degrees 10 knots." -> three clips. */
export const splitTransmission = (atcText: string) => {
  let body = atcText.trim()
  const callsign = CALLSIGN.exec(body)?.[1]
  if (callsign) body = body.replace(CALLSIGN, '')
  const wind = WIND.exec(body)?.[1]
  if (wind) body = body.replace(WIND, '')
  return [callsign, body, wind].filter((part): part is string => Boolean(part))
}

let spokenClips = 0
/** A clip spoken once by `say` and cached by its spoken text. */
const clip = (text: string) => {
  const spoken = toSpoken(text)
  const file = join(cacheDir, `${createHash('sha256').update(spoken).digest('hex').slice(0, 16)}.aiff`)
  if (!existsSync(file)) {
    execFileSync('say', ['-v', VOICE, '-r', RATE, '-o', file, spoken])
    spokenClips += 1
  }
  return file
}

const stitch = (clips: string[], target: string) => {
  const inputs = clips.flatMap((file) => ['-i', file])
  const parts = clips
    .map((_, i) => {
      const pad = i < clips.length - 1 ? `,apad=pad_dur=${GAP_SECONDS}` : ''
      return `[${i}:a]aformat=sample_rates=22050:channel_layouts=mono${pad}[c${i}];`
    })
    .join('')
  const joined = `${clips.map((_, i) => `[c${i}]`).join('')}concat=n=${clips.length}:v=0:a=1,`
  execFileSync('ffmpeg', [
    '-y',
    '-loglevel',
    'error',
    ...inputs,
    '-filter_complex',
    parts + joined + RADIO_FILTER,
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
}

const { variants } = await fetchContent()

const transmissions = new Map<string, string>()
for (const scenario of variants) {
  for (const step of scenario.steps) {
    if (step.atcText && step.atcAudio) transmissions.set(step.atcAudio, step.atcText)
  }
}

let created = 0
let skipped = 0
const clipTexts = new Set<string>()
for (const [audio, atcText] of transmissions) {
  const parts = splitTransmission(atcText)
  parts.forEach((part) => clipTexts.add(part))
  const target = join(PUBLIC_DIR, audio)
  if (existsSync(target) && !(force && placeholders.has(audio))) {
    skipped += 1
    continue
  }
  mkdirSync(dirname(target), { recursive: true })
  stitch(parts.map(clip), target)
  placeholders.add(audio)
  created += 1
}

let removed = 0
for (const audio of [...placeholders]) {
  if (transmissions.has(audio)) continue
  rmSync(join(PUBLIC_DIR, audio), { force: true })
  placeholders.delete(audio)
  removed += 1
}

writeFileSync(placeholdersPath, `${JSON.stringify([...placeholders].sort(), null, 2)}\n`)
const chars = [...clipTexts].reduce((sum, text) => sum + toSpoken(text).length, 0)
console.log(
  `${transmissions.size} transmissions: ${created} created, ${skipped} already present, ${removed} unused placeholders removed`,
)
console.log(`${clipTexts.size} distinct clips (${chars} spoken characters per voice), ${spokenClips} spoken now`)
