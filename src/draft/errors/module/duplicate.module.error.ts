import { tokenToString } from '../../helpers/string'
import { Token } from '../../helpers/types.helper'
import { BaseError } from '../base.error'

export class DuplicateModuleError extends BaseError {
  readonly code = 'DUPLICATE_MODULE_ERR'
  constructor(token: Token) {
    super(`Duplicate module by "${tokenToString(token)}"`)
  }
}
