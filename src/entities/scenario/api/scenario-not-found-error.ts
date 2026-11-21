export class ScenarioNotFoundError extends Error {
  constructor(id: string) {
    super(`Scenario "${id}" not found`)
    this.name = 'ScenarioNotFoundError'
  }
}
