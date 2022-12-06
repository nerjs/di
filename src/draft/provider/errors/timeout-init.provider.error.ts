import { INameProvider } from '../interface.provider'
import { InitializationProviderError } from './initialization.provider.error'

export class TimeoutInitProviderError extends InitializationProviderError<{ source: INameProvider; timeout: number }> {
  constructor(source: INameProvider, timeout: number) {
    super(`Provider context "${source}" did not have time to initialize in ${timeout}ms`, { source, timeout })
  }
}
