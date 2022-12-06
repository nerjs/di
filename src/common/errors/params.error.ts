import { CommonError } from './common.error'

export class ParamsError extends CommonError<Record<string, any>> {
  readonly code = 'PARAMS_ERR'
  constructor(params?: Record<string, any>) {
    const keys = Object.keys(params || {})
    const message =
      keys.length === 1
        ? `Param [${keys[0]}] is incorrect`
        : keys.length > 1
        ? `Params [${keys.join(', ')}] is incorrect`
        : 'Params is incorrect'

    super(message, params || {})
  }
}
