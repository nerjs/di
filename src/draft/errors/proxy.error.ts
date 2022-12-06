import { BaseError } from './base.error'

export class ProxyError extends BaseError<Error> {
  readonly code = 'PROXY_ERR'
  constructor(originalError: Error, message?: string) {
    super(`${message ? `${message}. ` : ''}${originalError.message}`, originalError)
  }
}
