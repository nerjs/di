import { CommonError } from './common.error'

export class EngineError extends CommonError {
  readonly code = 'ENGINE_ERR'
}
