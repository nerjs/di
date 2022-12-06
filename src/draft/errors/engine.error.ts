import { BaseError } from './base.error'

export class EngineError extends BaseError {
  readonly code = 'ENGINE_ERR'
}
