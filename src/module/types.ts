import { IProvider } from '../provider/types'
import { Alias, ClassType, MaybePromise, Token } from '../utils/types'

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

export type IModule = ClassType | PartialModule | FullModule | OptionalFullModule | OptionalModule | LazyModule | OptionalLazyModule | Alias
