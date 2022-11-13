import { InjectFactoryToken, InjectionToken, Scope, Type } from './type.interface'

export interface ExistingProvider {
  provide: InjectionToken
  useExisting: InjectionToken
}

export interface ValueProvider<T = any> {
  provide: InjectionToken
  useValue: T
}

interface ProviderBase {
  provide: InjectionToken
  scope?: Scope
}

export interface ClassProvider<T = any> extends ProviderBase {
  useClass: Type<T>
}

export interface FactoryProvider<T = any> extends ProviderBase {
  useFactory: (...args: any[]) => T | Promise<T>
  inject?: InjectFactoryToken[]
}

export type Provider<T = any> = Type<T> | ClassProvider<T> | ValueProvider<T> | FactoryProvider<T> | ExistingProvider
