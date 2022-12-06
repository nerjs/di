import { isClassType, isFunction, isObject, isTokenized } from '../helpers/is'
import {
  FullModule,
  IModule,
  LazyModule,
  OptionalFullModule,
  OptionalLazyModule,
  OptionalModule,
  OptionalPredicatedModule,
  PartialModule,
} from './types'

export const isPartialModule = (mod: any): mod is PartialModule => isObject(mod) && 'providers' in mod && Array.isArray(mod.providers)

export const isFullModule = (mod: any): mod is FullModule => isPartialModule(mod) && isTokenized(mod)

export const isOptionalFullModule = (mod: any): mod is OptionalFullModule => isPartialModule(mod) && 'predicate' in mod

export const isOptionalModule = (mod: any): mod is OptionalModule =>
  isObject(mod) && 'module' in mod && 'predicate' in mod && isPartialModule(mod.module)

export const isLazyModule = (mod: any): mod is LazyModule => isObject(mod) && 'lazy' in mod && isFunction(mod.lazy)

export const isOptionalLazyModule = (mod: any): mod is OptionalLazyModule => isLazyModule(mod) && 'predicate' in mod

export const isModule = (mod: any): mod is IModule => isClassType(mod) || isPartialModule(mod) || isLazyModule(mod) || isOptionalModule(mod)

export const isOptionalPredicatedModule = (mod: any): mod is OptionalPredicatedModule =>
  (isOptionalModule(mod) || isOptionalLazyModule(mod)) && isFunction(mod.predicate)
