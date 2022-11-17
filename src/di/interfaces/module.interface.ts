import { MaybePromise, MaybePromiseLike } from '../helpers/types.helper'
import { IProvider } from './provider.interface'
import { ClassType, InjectFactoryToken, InjectionToken } from './type.interface'

export interface ModuleMetadata {
  imports?: MaybePromiseLike<IModule>[]
  providers?: MaybePromiseLike<IProvider>[]
  exports?: InjectionToken[]
  global?: boolean
}

export interface DynamicModule extends ModuleMetadata {
  module: ClassType
  global?: boolean
}

export interface PresentModule {
  module: ClassType
  [key: string]: any
}

export type ReadyModule = ClassType | DynamicModule

export interface LazyModule {
  lazy: () => MaybePromise<ReadyModule>
}

export interface OptionalStaticModuleSync {
  module: ClassType
  predicate: boolean
}

export interface OptionalStaticModuleFactory {
  module: ClassType
  predicate: (...args: any[]) => MaybePromise<boolean>
  inject?: InjectFactoryToken[]
}

export interface OptionalLazyModuleSync extends LazyModule {
  predicate: boolean
}

export interface OptionalLazyModuleFactory extends LazyModule {
  predicate: (...args: any[]) => MaybePromise<boolean>
  inject?: InjectFactoryToken[]
}

export type OptionalModule = OptionalStaticModuleSync | OptionalStaticModuleFactory | OptionalLazyModuleSync | OptionalLazyModuleFactory

export type IModule = ClassType | DynamicModule | OptionalModule | LazyModule
