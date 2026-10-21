/**
 * Checks the frontend side of the content against the backend (see fetch-content.ts):
 * every pack is in exactly one section of sections.json, and every step's ATC audio file exists.
 * The scenarios themselves are validated by the backend tests.
 * Usage: npm run content:check
 */
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

import { sections } from '../src/shared/content/index.ts'
import { API_URL, PUBLIC_DIR, fetchContent } from './fetch-content.ts'

const errors: string[] = []
const warnings: string[] = []

const { packs, scenarios } = await fetchContent()

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
for (const scenario of scenarios) {
  for (const step of scenario.steps) {
    stepCount += 1
    if (step.atcAudio && !existsSync(join(PUBLIC_DIR, step.atcAudio))) {
      warnings.push(`${scenario.id} step "${step.id}": ${step.atcAudio} missing, run npm run audio:atc`)
    }
  }
}

const scenarioIds = new Set(scenarios.map((scenario) => scenario.id))
for (const dir of readdirSync(join(PUBLIC_DIR, 'audio/atc'), { withFileTypes: true })) {
  if (dir.isDirectory() && !scenarioIds.has(dir.name))
    warnings.push(`public/audio/atc/${dir.name}: no scenario with this id`)
}

for (const warning of warnings) console.warn(`warn  ${warning}`)
for (const error of errors) console.error(`error ${error}`)
console.log(
  `\n${API_URL}: ${scenarios.length} scenarios, ${stepCount} steps, ${errors.length} errors, ${warnings.length} warnings`,
)
process.exit(errors.length ? 1 : 0)
