import { ProviderId } from '../ids/provider.id'
import { IPartialContext } from '../types'

export class ValueContextProvider<V> implements IPartialContext<V> {
  constructor(readonly id: ProviderId, private readonly value: V) {}

  get() {
    return this.value
  }
}
