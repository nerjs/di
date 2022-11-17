import { SOURCE_TYPE, SOURCE_TYPES } from '../constants'
import {
  DynamicModule,
  LazyModule,
  OptionalModule,
  OptionalModuleLazy,
  OptionalModuleSync,
  TypeModule,
} from '../interfaces/module.interface'
import { Type } from '../interfaces/type.interface'
import { Instance } from './types.helper'

export const isObject = (obj: any): obj is Object => obj && typeof obj === 'object'

export const isFunction = (func: any): func is Function => typeof func === 'function'

export const isInstance = (ins: any): ins is Instance => isObject(ins) && 'constructor' in ins && isFunction(ins.constructor)

export const isPromise = (promise: any): promise is PromiseLike<any> => isObject(promise) && 'then' in promise

export const isTyped = (cl: any): cl is Type<any> => isFunction(cl) && /^class\s/.test(Function.prototype.toString.call(cl))

export const isTypedSource = (cl: any, type: SOURCE_TYPES): boolean => isTyped(cl) && Reflect.getMetadata(SOURCE_TYPE, cl) === type

// MODULES

export const isTypedModule = (module: any): module is Type<any> => isTypedSource(module, SOURCE_TYPES.MODULE)

export const isDynamicModule = (module: any): module is DynamicModule => isObject(module) && 'module' in module && isTyped(module.module)

export const isLazyModule = (module: any): module is LazyModule => isObject(module) && 'lazy' in module && typeof module.lazy === 'function'

export const isOptionalModuleSync = (module: any): module is OptionalModuleSync => isDynamicModule(module) && 'predicate' in module

export const isOptionalModuleLazy = (module: any): module is OptionalModuleLazy => isLazyModule(module) && 'predicate' in module

export const isOptionalModule = (module: any): module is OptionalModule => isOptionalModuleSync(module) || isOptionalModuleLazy(module)

export const isModule = (module: any): module is TypeModule =>
  isTypedModule(module) || isDynamicModule(module) || isLazyModule(module) || isOptionalModule(module)
