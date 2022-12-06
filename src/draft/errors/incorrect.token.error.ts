import { BaseError } from './base.error'

export class IncorrectTokenError extends BaseError {
  readonly code = 'INCORRECT_TOKEN_ERR'
}
