import { PARENT, RETRY_WAIT_CIRCULAR_INIT, RETRY_WAIT_INIT, TIMEOUT_WAIT_INIT } from '../../constants'
import { isRefInject, isToken } from '../../helpers/is'
import { sleep } from '../../helpers/time'
import { tokenToString } from '../../helpers/token'
import { EngineError } from '../../utils/errors/engine.error'
import { TimeoutError } from '../../utils/errors/timeout.error'
import { List } from '../../utils/list'
import { InjectToken, MaybePromise, Token } from '../../utils/types'
import { ProviderId } from '../ids/provider.id'
import { ListDependencies } from '../list.dependecies'
import { ICallId, IContext, IPartialContext, ProviderHooks } from '../types'
import { EmptyContext } from './empty.context'
import { ParentContextProvider } from './parent.context'

export class FactoryContextProvider<V = any> implements IPartialContext<V, ProviderHooks> {
  inited: boolean = false
  readonly dependencies: ListDependencies
  constructor(
    readonly id: ProviderId,
    readonly factory: (...args: any[]) => MaybePromise<V>,
    readonly injects: InjectToken[],
    readonly injector: List<IContext<any>>,
  ) {
    this.dependecies = new ListDependencies(id, injector)
  }

  async init() {
    if (this.inited) return
    if (!this.injects.length) {
      this.inited = true
      return
    }
  }

  get(_id: ICallId): MaybePromise<V> {
    throw new Error('Method not implemented.')
  }
  callHook?(_hook: ProviderHooks, ..._args: any[]): MaybePromise<void> {
    throw new Error('Method not implemented.')
  }

  destroy?(_reason?: any): MaybePromise<void> {
    throw new Error('Method not implemented.')
  }
}
