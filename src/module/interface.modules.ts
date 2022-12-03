import { InjectableClassType, MaybePromise, Token } from '../helpers/types.helper'
import { IProvider } from '../provider/interface.provider'

export interface PartialModule {
  token?: Token
  imports?: IModule[]
  providers: IProvider[]
  exports?: Token[]
  global?: boolean
  run?: Token
}

export interface FullModule extends PartialModule {
  token: Token
}

export interface OptionalFullModule extends PartialModule {
  predicate: boolean | ((...injecs: any[]) => MaybePromise<boolean>)
  inject?: Token[]
}

export interface OptionalModule {
  token?: Token
  module: PartialModule
  predicate: boolean | ((...injecs: any[]) => MaybePromise<boolean>)
  inject?: Token[]
}

export interface LazyModule {
  token?: Token
  lazy: (...injecs: any[]) => MaybePromise<IModule>
  inject?: Token[]
}

export interface OptionalLazyModule extends LazyModule {
  predicate: boolean | ((...injecs: any[]) => MaybePromise<boolean>)
}

export type OptionalPredicatedModule = (OptionalModule | OptionalLazyModule) & {
  predicate: (...injecs: any[]) => MaybePromise<boolean>
}

export type IModule =
  | InjectableClassType
  | PartialModule
  | FullModule
  | OptionalFullModule
  | OptionalModule
  | LazyModule
  | OptionalLazyModule
