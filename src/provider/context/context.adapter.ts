import { PROVIDER } from '../../constants'
import { isTokenized } from '../../helpers/is'
import { ParamsError } from '../../utils/errors/params.error'
import { CallId } from '../ids/call.id'
import { InstanceId } from '../ids/instance.id'
import { ProviderId } from '../ids/provider.id'
import { Ctx } from '../list.dependecies'
import { ProviderScope } from '../types'

export class ContextAdapter implements Ctx {
  constructor(protected context: Ctx) {
    if (!isTokenized(context)) throw new ParamsError({ context })
  }
  optionalParams: boolean

  scope: ProviderScope

  get(id: CallId | InstanceId | ProviderId) {
    if (id instanceof CallId) return this.context.get(id)
    if (id instanceof InstanceId) return this.context.get(new CallId(id, 'constructor'))
    return this.context.get(new CallId(id, Symbol.for('main'), 'constructor'))
  }

  get id() {
    return this.context.id
  }

  get token() {
    return this.id?.token || PROVIDER
  }

  get needParams() {
    return !!this.context.needParams
  }

  get dependencies() {
    return this.context.dependencies
  }

  get inited() {
    if ('inited' in this.context) return !!this.context.inited
    return true
  }

  async init() {
    await this.context?.init?.()
  }

  async callHook(hook: H, ...args: any[]) {
    await this.context?.callHook?.(hook, ...args)
  }

  async destroy(reason?: any) {
    await this.context?.destroy?.(reason)
  }
}
