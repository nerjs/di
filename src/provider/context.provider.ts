import { DESIGN_PARAMTYPES, HOOK } from '../constants'
import { isClassType } from '../helpers/is'
import { List } from '../utils/list'
import { MetadataCaller } from '../utils/metadata.caller'
import { InjectToken, Noop, Token } from '../utils/types'
import { ProviderId } from './ids/provider.id'
import { isProviderUseValue } from './is'
import { IProvider, ProviderScope } from './types'

export class ContextProvider<T = any> {
  readonly token: Token
  readonly id: ProviderId
  readonly dependecies = new List<ContextProvider>()
  readonly hooks?: MetadataCaller
  readonly injects: InjectToken[] = []
  readonly factory: Noop

  #scope: ProviderScope = ProviderScope.MODULE
  get scope() {
    return this.#scope
  }

  constructor(module: Token, readonly provider: IProvider<T>, readonly scopeInjector: List<ContextProvider>) {
    if (isClassType(provider)) {
      this.token = provider
      this.id = new ProviderId(module, provider)
      this.hooks = new MetadataCaller(HOOK, provider.prototype)
      this.injects = Reflect.getMetadata(DESIGN_PARAMTYPES, provider)
      this.factory = (...args) => new provider(...args)
    } else {
      this.token = provider.token
      this.id = new ProviderId(module, provider.token)

      if (isProviderUseValue(provider)) {
        this.factory = () => provider.useValue
        this.#scope = ProviderScope.GLOBAL
      }
    }
  }
}
