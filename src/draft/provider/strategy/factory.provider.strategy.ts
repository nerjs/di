import { PROVIDER } from '../../constants'
import { EngineError } from '../../errors/engine.error'
import { IncorrectTokenError } from '../../errors/incorrect.token.error'
import { isRefInject, isToken } from '../../helpers/is'
import { tokenToString } from '../../helpers/string'
import { sleep } from '../../helpers/time'
import { InjectToken, MaybePromise, Token } from '../../helpers/types.helper'
import { MissingProviderError } from '../errors/missing.provider.error'
import { TimeoutInitProviderError } from '../errors/timeout-init.provider.error'
import { INameProvider, IProviderStrategy, ProviderScope, ProviderScopeInjector } from '../interface.provider'

export class FactoryProviderStrategy<T = any> implements IProviderStrategy<T> {
  #scope: ProviderScope
  get scope() {
    return this.#scope
  }
  constructor(
    private readonly name: INameProvider,
    scope: ProviderScope,
    private readonly injects: InjectToken[],
    private readonly factory: (...args: any[]) => MaybePromise<T>,
    private readonly injector: ProviderScopeInjector,
    private readonly tryNoInit: number = 5,
    private readonly timeoutNoInit: number = 100,
  ) {
    this.#scope = scope
  }

  async init() {
    if (!this.injects.length) return

    const injects = await this.loadCtx()
    let noInited = injects.filter(ctx => !ctx.inited)

    for (let i = 0; i < this.tryNoInit; i++) {
      if (!noInited.length) break
      await sleep(this.timeoutNoInit)
      noInited = noInited.filter(ctx => !ctx.inited)
    }

    if (noInited.length) throw new TimeoutInitProviderError(noInited[0].name, this.tryNoInit * this.timeoutNoInit)

    for (const ctx of injects) {
      if (ctx.scope > this.scope) this.#scope = ctx.scope
    }
  }

  get(name: INameProvider): MaybePromise<T> {
    switch (this.scope) {
      case ProviderScope.GLOBAL:
        return this.getByGlobal()
      case ProviderScope.MODULE:
        return this.getByModule(name.module)
      case ProviderScope.CALL:
        return this.getByCall(name)
      default:
        throw new EngineError(`Unsupported provider scope "${this.scope}"`)
    }
  }

  #instance?: T
  private async getByGlobal(): Promise<T> {
    if (!this.#instance) {
      this.#instance = await this.create()
    }
    return this.#instance
  }

  private getByModule(token: Token): Promise<T> {
    return this.getByCall({
      module: token,
      token: PROVIDER,
    })
  }

  #instances: Map<Token, Map<Token, T>>
  private async getByCall(name: INameProvider): Promise<T> {
    if (!this.#instances) this.#instances = new Map()
    const module = this.#instances.get(name.module) || new Map<Token, T>()
    this.#instances.set(name.module, module)
    if (module.has(name.token)) return module.get(name.token) as T
    const instance = await this.create()
    module.set(name.token, instance)
    return instance
  }

  private async create(): Promise<T> {
    const injects = await this.loadCtx()
    const args = await Promise.all(injects.map(async ctx => ctx.get(this.name)))
    const instance = await this.factory(...args)
    return instance
  }

  private async loadCtx() {
    if (!this.injects.length) return []
    return Promise.all(
      this.injects.map(async (rt, i) => {
        let token: Token
        if (isRefInject(rt)) {
          await sleep(10 * (i + 1))
          token = await rt.ref()
        } else {
          token = rt
        }

        if (!isToken(token))
          throw new IncorrectTokenError(
            `Incorrect "${tokenToString(token)}" token in provider dependencies "${this.name}" at position ${i}`,
          )

        const ctx = await this.injector.get(token)
        if (!ctx) throw new MissingProviderError(this.name, token)
        return ctx
      }),
    )
  }
}
