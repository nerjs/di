import { CONSTRUCTOR, PARAMS, PARENT } from '../constants'
import { isRefInject, isToken } from '../helpers/is'
import { sleep } from '../helpers/time'
import { tokenToString } from '../helpers/token'
import { EngineError } from '../utils/errors/engine.error'
import { TimeoutError } from '../utils/errors/timeout.error'
import { InjectToken, MaybePromise, Token } from '../utils/types'
import { EmptyContext } from './context/empty.context'
import { ParentContextProvider } from './context/parent.context'
import { CallId } from './ids/call.id'
import { ProviderId } from './ids/provider.id'
import { isProviderId } from './is'

export interface Ctx {
  id?: ProviderId
  inited?: boolean
  needParams?: boolean
  optionalParams?: boolean
  dependencies?: ListDependencies
  get(id: CallId, params?: any): MaybePromise<any>
  destroy?(reason?: any): MaybePromise<void>
}

interface Injector {
  has(token: Token): boolean
  get(token: Token): MaybePromise<Ctx>
}

export class ListDependencies {
  private deps: Ctx[] = []
  private readonly params = new WeakMap<Ctx, any>()
  private indexParams: number
  afterInitError?: Error
  optionalParams: boolean
  constructor(
    readonly id: ProviderId,
    private readonly injector: Injector,
    private readonly strictParams: boolean,
    private readonly tryCountInit: number,
    private readonly tryCountRecursiveInit: number,
    private readonly timeoutInit: number,
  ) {}

  get needParams() {
    return 'indexParams' in this && this.indexParams >= 0
  }

  async init(injects: InjectToken[]) {
    this.deps = Array.from({ length: injects.length })

    const tokenized = await this.loadRef(injects)
    await this.loadDeps(tokenized)
  }

  has(id: Token | ProviderId) {
    const token = isProviderId(id) ? id.token : id
    return !!this.deps.find(ctx => ctx?.id?.token === token)
  }

  async get(instance: symbol | string, params?: any) {
    this.chechCorrectCurrentParams(params)
    const deps: any[] = []
    await Promise.all(
      this.deps.map(async (ctx, i) => {
        if (this.needParams && this.indexParams === i) {
          deps[i] = params
        } else {
          const paramCtx = this.params.get(ctx)
          deps[i] = await ctx.get(new CallId(this.id, instance, CONSTRUCTOR), paramCtx)
        }
      }),
    )
    return deps
  }

  async destroy(reason?: any) {
    await Promise.all(this.deps.map(async ctx => ctx?.destroy?.(reason)))
  }

  private async loadRef(injects: InjectToken[]) {
    return Promise.all(
      injects.map(async token => {
        if (isToken(token)) return { token }

        if (isRefInject(token)) {
          const { ref, ...other } = token
          return {
            token: await ref(),
            ...other,
          }
        }

        return token
      }),
    )
  }

  private async loadDeps(tokenized: { token: Token; params?: boolean; optional?: boolean }[]) {
    await Promise.all(tokenized.map(({ token, optional, params }, i) => this.loadOnceDeps(token, i, optional, params)))
  }

  private async loadOnceDeps(token: Token, idx: number, params?: boolean, optional?: boolean) {
    if (token === PARENT) {
      this.deps[idx] = new ParentContextProvider(this.id)
      return
    }

    if (token === PARAMS) {
      if (this.needParams) throw new EngineError('You cannot get parameters in more than one argument')
      this.deps[idx] = new EmptyContext()
      this.indexParams = idx
      this.optionalParams = !!optional
      return
    }

    if (!this.injector.has(token)) {
      if (optional) {
        this.deps[idx] = new EmptyContext()
        return
      }
      throw new EngineError(`InjectKey ${tokenToString(token)} is not found in the scope of the ${this.id} provider`, {
        id: this.id,
        token,
      })
    }

    const ctx = await this.injector.get(token)
    this.checkCorrectParams(ctx, params)
    this.deps[idx] = ctx
    if (params) this.params.set(ctx, params)
    await this.waitCtx(ctx)
  }

  private async waitCtx(ctx: Ctx) {
    if (ctx.inited || !ctx.dependencies) return
    for (let i = 0; i < this.tryCountInit; i++) {
      await sleep(this.timeoutInit)
      if (ctx.inited) return
      if (i >= this.tryCountRecursiveInit && ctx.dependencies.has(this.id)) {
        setTimeout(() => {
          if (!ctx.inited) this.afterInitError = new EngineError(`Couldn't wait for the ${ctx.id} provider to initialize`)
        }, (this.tryCountInit - this.tryCountRecursiveInit + 1) * this.timeoutInit).unref()
        return
      }
    }

    if (!ctx.inited) throw new TimeoutError(this.tryCountInit * this.timeoutInit)
  }

  private chechCorrectCurrentParams(params?: any) {
    this.checkCorrectParams(this, params)
  }

  private checkCorrectParams({ id, needParams, optionalParams }: Pick<Ctx, 'id' | 'needParams' | 'optionalParams'>, params?: any) {
    if (!this.strictParams) return
    if (needParams && params === undefined && !optionalParams) throw new EngineError(`Parameters for ${id} cannot be missing`)
    if (params !== undefined && !needParams) throw new EngineError(`Provider ${id} does not need parameters`)
  }
}
