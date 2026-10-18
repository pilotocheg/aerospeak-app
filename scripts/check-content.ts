/**
 * Validates content/ the same way the backend does at startup, plus frontend checks:
 * every expectedPilotResponse scores 100, atcAudio paths follow the convention and exist.
 * Usage: npm run content:check
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { scoreTransmission } from '../src/shared/lib/local-scoring/index.ts'
import { packsFileSchema, scenarioSchema } from './content-schema.ts'
import { CONTENT_DIR, PUBLIC_DIR, readScenarioFiles } from './load-content.ts'

const errors: string[] = []
const warnings: string[] = []

const packs = packsFileSchema.safeParse(JSON.parse(readFileSync(join(CONTENT_DIR, 'packs.json'), 'utf8')))
if (!packs.success) {
  errors.push(...packs.error.issues.map((i) => `packs.json ${i.path.join('.')}: ${i.message}`))
}
const packIds = new Set(packs.success ? packs.data.map((p) => p.id) : [])
const scenarioIds = new Set<string>()
let stepCount = 0

for (const { name, raw } of readScenarioFiles()) {
  const parsed = scenarioSchema.safeParse(raw)
  if (!parsed.success) {
    errors.push(...parsed.error.issues.map((i) => `${name} ${i.path.join('.')}: ${i.message}`))
    continue
  }
  const scenario = parsed.data
  if (scenarioIds.has(scenario.id)) errors.push(`${name}: duplicate scenario id "${scenario.id}"`)
  if (!packIds.has(scenario.packId)) errors.push(`${name}: unknown packId "${scenario.packId}"`)
  if (!name.startsWith(`scenarios/${scenario.packId}/`))
    errors.push(`${name}: file must be in scenarios/${scenario.packId}/`)
  scenarioIds.add(scenario.id)

  for (const step of scenario.steps) {
    stepCount += 1
    const where = `${name} step "${step.id}"`

    const result = scoreTransmission(step, { transcript: step.expectedPilotResponse })
    if (result.score !== 100) {
      const misses = result.elements.filter((e) => e.status !== 'matched').map((e) => `${e.id}=${e.status}`)
      errors.push(`${where}: expectedPilotResponse scores ${result.score}, not 100 (${misses.join(', ')})`)
    }

    const weightSum = step.requiredElements.reduce((sum, e) => sum + e.weight, 0)
    if (weightSum !== 100) warnings.push(`${where}: element weights sum to ${weightSum}, expected 100`)

    if (step.atcText) {
      const expectedAudio = `/audio/atc/${scenario.id}/${step.id}.mp3`
      if (step.atcAudio !== expectedAudio) {
        errors.push(`${where}: atcAudio must be "${expectedAudio}"`)
      } else if (!existsSync(join(PUBLIC_DIR, step.atcAudio))) {
        warnings.push(`${where}: audio file missing, run npm run audio:atc`)
      }
    } else if (step.atcAudio) {
      errors.push(`${where}: atcAudio without atcText`)
    }
  }
}

for (const warning of warnings) console.warn(`warn  ${warning}`)
for (const error of errors) console.error(`error ${error}`)
console.log(`\n${scenarioIds.size} scenarios, ${stepCount} steps, ${errors.length} errors, ${warnings.length} warnings`)
process.exit(errors.length ? 1 : 0)
