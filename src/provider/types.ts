import { Alias, ClassType, MaybePromise, Token, Tokenized } from '../utils/types'

export enum ProviderScope {
  GLOBAL,
  MODULE,
  PROVIDER,
  INSTANCE,
  CALL,
}

export enum ProviderHooks {
  CREATE = 'create',
  BEFOREINIT = 'beforeinit',
  INITED = 'inited',
  BEFOREDESTROY = 'beforedestroy',
  DESTROYED = 'destroyed',
}

export interface ProviderBase extends Tokenized {
  scope?: ProviderScope
}

export interface ProviderUseValue<T = any> extends ProviderBase {
  useValue: T
}

export interface ProviderUseFactory<T = any> extends ProviderBase {
  useFactory: (...args: any[]) => MaybePromise<T>
  inject?: Token[]
}

export interface ProviderUseClass<T = any> extends ProviderBase {
  useClass: ClassType<T>
}

export type ProviderUse<T = any> = ProviderUseValue<T> | ProviderUseFactory<T> | ProviderUseClass<T>

export type IProvider<T = any> = ClassType<T> | Alias | ProviderUse<T>

export interface IProviderId extends Tokenized {
  module: Token
}

export interface IInstanceId extends IProviderId {
  instance: symbol | string
}

export interface ICallId extends IInstanceId {
  method: string
}

export interface IPartialContext<V, H extends string = string> {
  id: IProviderId
  inited?: boolean
  needParams?: boolean
  scope?: ProviderScope
  get(id: ICallId): MaybePromise<V>
  callHook?(hook: H, ...args: any[]): MaybePromise<void>
  init?(): MaybePromise<void>
  destroy?(reason?: any): MaybePromise<void>
}

export type IContext<V, H extends string = string> = Required<IPartialContext<V, H>> &
  Tokenized & {
    get(id: ICallId | IProviderId | IInstanceId): MaybePromise<V>
  }
