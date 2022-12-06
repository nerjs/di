import { BaseError } from '../../errors/base.error'
import { tokenToString } from '../../helpers/string'
import { Token } from '../../helpers/types.helper'
import { INameProvider } from '../interface.provider'

export class MissingProviderError extends BaseError<{ source: INameProvider; target: Token }> {
  readonly code = 'MISSING_PROVIDER_ERR'
  constructor(source: INameProvider, target: Token) {
    super(`Provider "${tokenToString(target)}" is not found in the "${source}" scope`, {
      source,
      target,
    })
  }
}
