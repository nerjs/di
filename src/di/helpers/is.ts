import {
  DynamicModule,
  IModule,
  LazyModule,
  OptionalLazyModuleFactory,
  OptionalLazyModuleSync,
  OptionalModule,
  OptionalStaticModuleFactory,
  OptionalStaticModuleSync,
  PresentModule,
  ReadyModule,
} from '../interfaces/module.interface'
import {
  ClassProvider,
  ExistingProvider,
  FactoryProvider,
  IProvider,
  PresentProvide,
  RefProvider,
  ValueProvider,
} from '../interfaces/provider.interface'
import { ClassType, InjectFactoryToken, InjectionToken, Instance, OptionalFactoryDependency } from '../interfaces/type.interface'

// Base
export const isString = (str: any): str is string => typeof str === 'string'
export const isSymbol = (sym: any): sym is symbol => typeof sym === 'symbol'
export const isObject = (obj: any): obj is Object => obj && typeof obj === 'object'
export const isFunction = (func: any): func is Function => typeof func === 'function'
export const isPromiseLike = (promise: any): promise is PromiseLike<any> => isObject(promise) && 'then' in promise
export const isPromise = (promise: any): promise is Promise<any> => isPromise(promise) && 'catch' in promise && 'finally' in promise

// class
export const isClassType = (cl: any): cl is ClassType => isFunction(cl) && /^class\s/.test(Function.prototype.toString.call(cl))

// instance
export const isInstance = (ins: any): ins is Instance => isObject(ins) && 'constructor' in ins && isFunction(ins.constructor)

// provider token
export const isInjectionToken = (token: any): token is InjectionToken => isString(token) || isSymbol(token) || isClassType(token)

// factory token
export const isOptionalFactoryDependency = (opt: any): opt is OptionalFactoryDependency =>
  isObject(opt) && 'optional' in opt && 'token' in opt && isInjectionToken(opt.token)

export const isInjectFactoryToken = (token: any): token is InjectFactoryToken =>
  isInjectionToken(token) || isOptionalFactoryDependency(token)

// provider
export const isRefProvider = (provider: any): provider is RefProvider => isObject(provider) && 'ref' in provider && isFunction(provider.ref)

export const isPresentProvide = (provider: any): provider is PresentProvide =>
  isObject(provider) && 'provide' in provider && isInjectionToken(provider.provide)

export const isExistingProvider = (provider: any): provider is ExistingProvider =>
  isPresentProvide(provider) && 'useExisting' in provider && isInjectionToken(provider.useExisting)

export const isValueProvider = (provider: any): provider is ValueProvider => isPresentProvide(provider) && 'useValue' in provider

export const isClassProvider = (provider: any): provider is ClassProvider =>
  isPresentProvide(provider) && 'useClass' in provider && isClassType(provider.useClass)

export const isFactoryProvider = (provider: any): provider is FactoryProvider =>
  isPresentProvide(provider) && 'useFactory' in provider && isFunction(provider.useClass)

export const isProvider = (provider: any): provider is IProvider =>
  isRefProvider(provider) ||
  isExistingProvider(provider) ||
  isValueProvider(provider) ||
  isClassProvider(provider) ||
  isFactoryProvider(provider)

// modules

export const isPresentModule = (module: any): module is PresentModule =>
  isObject(module) && 'module' in module && isClassType(module.module)

export const isPresentLazy = (module: any): module is { lazy: LazyModule['lazy']; [key: string]: any } =>
  isObject(module) && 'lazy' in module && isFunction(module.lazy)

const isPresentPredicate = <T = any>(module: any, type: any): module is { predicate: T } =>
  isObject(module) && 'predicate' in module && typeof module.predicate === type

export const isOptionalStaticModuleSync = (module: any): module is OptionalStaticModuleSync =>
  isPresentModule(module) && isPresentPredicate(module, 'boolean')

export const isOptionalStaticModuleFactory = (module: any): module is OptionalStaticModuleFactory =>
  isPresentModule(module) && isPresentPredicate(module, 'function')

export const isOptionalLazyModuleSync = (module: any): module is OptionalLazyModuleSync =>
  isPresentLazy(module) && isPresentPredicate(module, 'boolean')

export const isOptionalLazyModuleFactory = (module: any): module is OptionalLazyModuleFactory =>
  isPresentLazy(module) && isPresentPredicate(module, 'function')

export const isOptionalModule = (module: any): module is OptionalModule =>
  isOptionalStaticModuleSync(module) ||
  isOptionalStaticModuleFactory(module) ||
  isOptionalLazyModuleSync(module) ||
  isOptionalLazyModuleFactory(module)

export const isLazyModule = (module: any): module is LazyModule =>
  isPresentLazy(module) && !isOptionalLazyModuleSync(module) && !isOptionalLazyModuleFactory(module)

export const isDynamicModule = (module: any): module is DynamicModule =>
  isPresentModule(module) && !isOptionalStaticModuleSync(module) && !isOptionalStaticModuleFactory(module)

export const isReadyModule = (module: any): module is ReadyModule => isClassType(module) || isDynamicModule(module)

export const isModule = (module: any): module is IModule => isOptionalModule(module) || isLazyModule(module) || isReadyModule(module)
