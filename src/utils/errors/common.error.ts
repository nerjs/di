export abstract class CommonError<C = unknown> extends Error {
  abstract readonly code: string
  constructor(message: string, cause?: C) {
    super(message, cause !== undefined ? { cause } : undefined)
  }

  get name() {
    return this.constructor.name
  }

  get cause(): C {
    return super.cause as C
  }

  get clearedStack() {
    return this.stack
      ?.split('\n')
      .map(str => str.trim())
      .filter(str => str.startsWith('at') && !/(\(|\s)node\:internal/.test(str))
      .join('\n')
  }

  toJSON() {
    const { name, message, clearedStack, cause, code, ...obj } = this
    return {
      name,
      code,
      message,
      cause,
      ...obj,
      stack: clearedStack?.split('\n'),
    }
  }
}
