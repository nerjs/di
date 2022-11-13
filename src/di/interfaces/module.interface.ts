import { MaybePromise } from '../helpers/types.helper'
import { Provider } from './provider.interface'
import { InjectFactoryToken, InjectionToken, Type } from './type.interface'

export interface DynamicModule extends ModuleMetadata {
  module: Type<any>
  global?: boolean
}

export interface ForwardReference {
  forwardRef: Type<any>
}

interface OptionalModuleSync {
  module: Type<any>
  predicate: boolean
}

interface OptionalLazySync {
  lazy: () => MaybePromise<Type<any>>
  predicate: boolean
}

interface OptionalModuleFactory {
  module: Type<any>
  predicate: (...args: any[]) => MaybePromise<boolean>
  inject: InjectFactoryToken[]
}

interface OptionalLazyFactory {
  lazy: () => MaybePromise<Type<any>>
  predicate: (...args: any[]) => MaybePromise<boolean>
  inject: InjectFactoryToken[]
}

export type OptionalModule = OptionalModuleSync | OptionalModuleFactory | OptionalLazySync | OptionalLazyFactory

export interface ModuleMetadata {
  imports?: (Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference | OptionalModule)[]
  controllers?: Type<any>[]
  providers?: Provider[]
  exports?: InjectionToken[]
}
