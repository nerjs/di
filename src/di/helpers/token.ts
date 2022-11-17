import { ParamsError } from '../errors/params.error'
import { IModule } from '../interfaces/module.interface'
import { IProvider } from '../interfaces/provider.interface'
import { ClassType, InjectFactoryToken, InjectionToken } from '../interfaces/type.interface'
import { isClassType, isOptionalFactoryDependency, isPresentModule, isPresentProvide, isString, isSymbol } from './is'

export const getModuleToken = (module: IModule): ClassType | null => {
  if (isClassType(module)) return module
  if (isPresentModule(module)) return module.module
  return null
}

export const getProviderToken = (provider: IProvider): InjectionToken | null => {
  if (isClassType(provider)) return provider
  if (isPresentProvide(provider)) return provider.provide
  return null
}

export const stringifyToken = (token: InjectFactoryToken): string => {
  if (isOptionalFactoryDependency(token)) return `optional:${stringifyToken(token.token)}`
  if (isString(token)) return token
  if (isSymbol(token)) return token.toString()
  if (isClassType(token)) return `class:${token.name}`
  throw new ParamsError(`Incorrect token "${token}"`)
}
