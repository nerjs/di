import { BaseError } from '../../errors/base.error'

export class InitializationProviderError<T = any> extends BaseError<T> {
  readonly code = 'INIT_PROVIDER_ERR'
}
