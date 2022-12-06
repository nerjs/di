import { Alias, ClassType, MaybePromise, Token, Tokenized } from '../helpers/types.helper'

export enum ProviderScope {
  GLOBAL,
  MODULE,
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

export interface INameProvider {
  module: Token
  token: Token
}

export interface IProviderStrategy<T = any> {
  init(): MaybePromise<void>
  get(name: INameProvider): MaybePromise<T>
}

export interface IProviderContext<T = any> extends IProviderStrategy<T> {
  scope: ProviderScope
  inited: boolean
  name: INameProvider
}

export interface ProviderScopeInjector {
  get<T = any>(token: Token): MaybePromise<IProviderContext<T> | undefined>
}
