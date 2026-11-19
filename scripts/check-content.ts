/**
 * Checks the frontend side of the content against the backend (see fetch-content.ts):
 * every pack is in exactly one section of sections.json, and every step of every scenario
 * variant has its ATC audio file.
 * The scenarios themselves are validated by the backend tests.
 * Usage: npm run content:check
 */
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

import { sections } from '../src/shared/content/index.ts'
import { API_URL, PUBLIC_DIR, fetchContent } from './fetch-content.ts'
import { stepTransmissions } from './step-transmissions.ts'

const errors: string[] = []
const warnings: string[] = []

const { packs, scenarios, variants } = await fetchContent()

const packIds = new Set(packs.map((pack) => pack.id))
const sectionPackIds = sections.flatMap((section) => section.packIds)
for (const packId of packIds) {
  const count = sectionPackIds.filter((id) => id === packId).length
  if (count !== 1) errors.push(`sections.json: pack "${packId}" must be in exactly one section (found ${count})`)
}
for (const packId of sectionPackIds) {
  if (!packIds.has(packId)) errors.push(`sections.json: unknown pack "${packId}"`)
}

let stepCount = 0
const usedAudio = new Set<string>()
for (const scenario of variants) {
  for (const step of scenario.steps) {
    stepCount += 1
    for (const { audio } of stepTransmissions(step)) {
      usedAudio.add(audio)
      if (!existsSync(join(PUBLIC_DIR, audio))) {
        const name = scenario.variant ? `${scenario.id} [${scenario.variant}]` : scenario.id
        warnings.push(`${name} step "${step.id}": ${audio} missing, run npm run audio:atc`)
      }
    }
  }
}

for (const entry of readdirSync(join(PUBLIC_DIR, 'audio/atc'), { withFileTypes: true })) {
  const path = `/audio/atc/${entry.name}`
  if (entry.isDirectory() || (entry.name.endsWith('.mp3') && !usedAudio.has(path)))
    warnings.push(`public${path}: no scenario step uses it`)
}

for (const warning of warnings) console.warn(`warn  ${warning}`)
for (const error of errors) console.error(`error ${error}`)
console.log(
  `\n${API_URL}: ${scenarios.length} scenarios, ${variants.length} variants, ${stepCount} steps, ${errors.length} errors, ${warnings.length} warnings`,
)
process.exit(errors.length ? 1 : 0)
