import { TypeModule } from '../interfaces/module.interface'
import { Type } from '../interfaces/type.interface'
import { isDynamicModule, isFunction, isOptionalModuleSync, isTypedModule } from './is'

export const getModuleToken = (module: TypeModule): Type | null => {
  if (isDynamicModule(module) || isOptionalModuleSync(module)) return module.module
  if (isTypedModule(module)) return module
  return null
}

export const stringifyToken = (token: Type | null): string => {
  if (typeof token === null) return 'null'
  if (!isFunction(token)) throw new Error(`Token "${token} has incorrect type`)
  return token.name
}

export const getStringifiedModuleToken = (module: TypeModule) => stringifyToken(getModuleToken(module))
