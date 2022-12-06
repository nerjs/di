import { BaseError } from '../base.error'

export class IncorrectModuleError extends BaseError {
  readonly code = 'INCORRECT_MODULE_ERR'
  constructor(module: any) {
    super('Incorrect module', module)
  }
}
