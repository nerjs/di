import { CommonError } from './common.error'

export class ProxyError extends CommonError<Error> {
  readonly code = 'PROXY_ERR'
  constructor(originalError: Error, message?: string) {
    super(`${message ? `${message}. ` : ''}${originalError.message}`, originalError)
  }
}
