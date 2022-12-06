import { InitializationProviderError } from '../errors/initialization.provider.error'
import { INameProvider, IProviderStrategy } from '../interface.provider'

export class ValueProviderStrategy<T = any> implements IProviderStrategy<T> {
  constructor(private readonly name: INameProvider, private readonly value: T) {}

  init() {
    if (this.value === undefined) throw new InitializationProviderError(`Provider "${this.name}" value must not be equal to undefined`)
  }

  get() {
    return this.value
  }
}
