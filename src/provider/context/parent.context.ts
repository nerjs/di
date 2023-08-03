import { ProviderId } from '../ids/provider.id'

export class ParentContextProvider {
  constructor(private readonly parentId: ProviderId) {}

  get() {
    return this.parentId
  }
}
