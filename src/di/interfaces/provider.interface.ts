import { MaybePromiseLike } from '../helpers/types.helper'
import { ClassType, InjectFactoryToken, InjectionToken, Scope } from './type.interface'

export interface RefProvider {
  ref: () => MaybePromiseLike<IProvider>
}

export interface BaseProvider {
  provide: InjectionToken
}

export interface PresentProvide {
  provide: InjectionToken
  [key: string]: any
}

export interface ExistingProvider extends BaseProvider {
  useExisting: InjectionToken
}

export interface ValueProvider<T = any> extends BaseProvider {
  useValue: T
}

interface ScopedProvider extends BaseProvider {
  scope?: Scope
}

export interface ClassProvider<T = any> extends ScopedProvider {
  useClass: ClassType<T>
}

export interface FactoryProvider<T = any> extends ScopedProvider {
  useFactory: (...args: any[]) => T | Promise<T>
  inject?: InjectFactoryToken[]
}

export type IProvider<T = any> = ClassType<T> | ClassProvider<T> | ValueProvider<T> | FactoryProvider<T> | ExistingProvider | RefProvider
