import { CommonError } from './common.error'

interface IAbortError extends Error {
  code: 'ABORT_ERR'
  cause?: string
}

export class AbortError extends CommonError<string> implements IAbortError {
  readonly code = 'ABORT_ERR'
  constructor(label?: string) {
    super('Operation was aborted', label)
  }

  static is(err: any): err is IAbortError {
    return (
      (err && typeof err === 'object' && err instanceof AbortError) ||
      (typeof err === 'object' && 'code' in err && err.code === 'ABORT_ERR' && err instanceof Error)
    )
  }

  static from(err: IAbortError | AbortError) {
    if (err instanceof AbortError) return err
    const err2 = new AbortError(err.cause)
    if (err instanceof Error) err2.stack = err.stack
    return err2
  }
}
