import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

export const ROOT = join(import.meta.dirname, '..')
export const CONTENT_DIR = join(ROOT, 'content')
export const PUBLIC_DIR = join(ROOT, 'public')

const listJsonFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return listJsonFiles(path)
    return name.endsWith('.json') ? [path] : []
  })

export const readScenarioFiles = () =>
  listJsonFiles(join(CONTENT_DIR, 'scenarios'))
    .sort()
    .map((path) => ({ name: relative(CONTENT_DIR, path), raw: JSON.parse(readFileSync(path, 'utf8')) as unknown }))
