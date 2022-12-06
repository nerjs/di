import { sleep } from '../../helpers/time'
import { Token } from '../../helpers/types.helper'
import { MissingProviderError } from '../errors/missing.provider.error'
import { TimeoutInitProviderError } from '../errors/timeout-init.provider.error'
import { INameProvider, IProviderStrategy, ProviderScopeInjector } from '../interface.provider'

export class AliasProviderStrategy implements IProviderStrategy {
  constructor(
    private readonly name: INameProvider,
    private readonly aliasToken: Token,
    private readonly injector: ProviderScopeInjector,
    private readonly tryNoInit: number = 5,
    private readonly timeoutNoInit: number = 100,
  ) {}

  async init() {
    const ctx = await this.injector.get(this.aliasToken)
    if (!ctx) throw new MissingProviderError(this.name, this.aliasToken)
    if (ctx.inited) return

    for (let i = 0; i < this.tryNoInit; i++) {
      await sleep(this.timeoutNoInit)
      if (!ctx.inited) continue
    }

    if (!ctx.inited) throw new TimeoutInitProviderError(this.name, this.tryNoInit * this.timeoutNoInit)
  }

  async get(name: INameProvider) {
    const ctx = await this.injector.get(this.aliasToken)
    if (!ctx) throw new MissingProviderError(this.name, this.aliasToken)
    if (!ctx.inited) throw new TimeoutInitProviderError(this.name, this.tryNoInit * this.timeoutNoInit)
    return ctx.get(name)
  }
}
