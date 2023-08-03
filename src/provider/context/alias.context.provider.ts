import { isToken } from '../../helpers/is'
import { tokenToString } from '../../helpers/token'
import { EngineError } from '../../utils/errors/engine.error'
import { ParamsError } from '../../utils/errors/params.error'
import { List } from '../../utils/list'
import { Token } from '../../utils/types'
import { CallId } from '../ids/call.id'
import { ProviderId } from '../ids/provider.id'
import { IContext, IPartialContext } from '../types'

export class AliasContextProvider<V = any> implements IPartialContext<V> {
  constructor(readonly id: ProviderId, private readonly alias: Token, private readonly injector: List<IContext<V>>) {
    if (!isToken(alias)) throw new ParamsError({ alias })
  }

  async init() {
    if (!this.injector.has(this.alias)) throw new EngineError(`Alias ${tokenToString(this.alias)} not found`)
    const ctx = this.injector.get(this.alias)
    await ctx.init()
    if (!ctx.inited) throw new EngineError(`Context ${tokenToString}`)
  }

  get inited() {
    return this.injector.get(this.alias).inited
  }

  callHook(hook: string, ...args: any[]) {
    return this.injector.get(this.alias).callHook(hook, ...args)
  }

  destroy(reason?: any) {
    return this.injector.get(this.alias).destroy(reason)
  }

  get(id: CallId) {
    return this.injector.get(this.alias).get(id)
  }
}
