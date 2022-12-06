import { Alias, ClassType, MaybePromise, Token, Tokenized } from '../utils/types'

export enum ProviderScope {
  GLOBAL,
  MODULE,
  PROVIDER,
  INSTANCE,
  CALL,
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

export interface ProviderId extends Tokenized {
  module: Token
}

export interface InstanceId extends ProviderId {
  instance: symbol | string
}

export interface CallId extends InstanceId {
  method: string
}
