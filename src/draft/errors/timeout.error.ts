import { BaseError } from './base.error'

export class TimeoutError extends BaseError<number> {
  readonly code = 'TIMEOUT_ERR'
  constructor(readonly timeout?: number) {
    const message = `Time is up`
    super(message, timeout)
  }

  get name() {
    return this.constructor.name
  }
}
