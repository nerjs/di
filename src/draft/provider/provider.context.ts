import { MaybePromise } from '../helpers/types.helper'
import { InitializationProviderError } from './errors/initialization.provider.error'
import { NameProvider } from './name.provider'
import { INameProvider, IProviderContext, IProviderStrategy, ProviderScope } from './interface.provider'

export class ProviderContext<T = any> implements IProviderContext<T> {
  scope: ProviderScope = ProviderScope.GLOBAL
  inited: boolean = false
  readonly name: NameProvider
  private readonly strategy: IProviderStrategy

  async init() {
    await this.strategy.init()
    this.inited = true
  }

  get(name: INameProvider): MaybePromise<T> {
    if (!this.inited) throw new InitializationProviderError(`Provider "${this.name}" is not ready yet`)
    return this.strategy.get(name)
  }
}
