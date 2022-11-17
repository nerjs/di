import { MaybePromise } from '../helpers/types.helper'
import { Provider } from './provider.interface'
import { InjectFactoryToken, InjectionToken, Type } from './type.interface'

export interface DynamicModule extends ModuleMetadata {
  module: Type<any>
  global?: boolean
}

export interface LazyModule {
  lazy: () => MaybePromise<Type<any>>
}

interface OptionalStaticModuleSync {
  module: Type<any>
  predicate: boolean
}

interface OptionalStaticModuleFactory {
  module: Type<any>
  predicate: (...args: any[]) => MaybePromise<boolean>
  inject: InjectFactoryToken[]
}

export type OptionalModuleSync = OptionalStaticModuleSync | OptionalStaticModuleFactory

interface OptionalLazyModuleSync extends LazyModule {
  predicate: boolean
}

interface OptionalLazyModuleFactory extends LazyModule {
  predicate: (...args: any[]) => MaybePromise<boolean>
  inject: InjectFactoryToken[]
}

export type OptionalModuleLazy = OptionalLazyModuleSync | OptionalLazyModuleFactory

export type OptionalModule = OptionalModuleSync | OptionalModuleLazy

export type TypeModule = Type<any> | DynamicModule | OptionalModule | LazyModule

export interface ModuleMetadata {
  imports?: Array<TypeModule>
  providers?: Provider[]
  exports?: InjectionToken[]
  global?: boolean
}
