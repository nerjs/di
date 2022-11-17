export class EngineError extends Error {
  get name() {
    return this.constructor.name
  }
}
