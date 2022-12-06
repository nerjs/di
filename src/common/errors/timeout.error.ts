import { CommonError } from './common.error'

export class TimeoutError extends CommonError<number> {
  readonly code = 'TIMEOUT_ERR'
  constructor(readonly timeout?: number) {
    const message = `Time is up`
    super(message, timeout)
  }
}
