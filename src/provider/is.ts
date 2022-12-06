import { isAlias, isClassType, isFunction, isString, isSymbol, isToken, isTokenized } from '../helpers/is'
import { ClassType } from '../utils/types'
import {
  CallId,
  InstanceId,
  IProvider,
  ProviderBase,
  ProviderId,
  ProviderUse,
  ProviderUseClass,
  ProviderUseFactory,
  ProviderUseValue,
} from './types'

export const isProviderBase = <P extends ProviderBase = ProviderBase>(provider: any): provider is P => isTokenized(provider)

export const isProviderUseValue = <T = any>(provider: any): provider is ProviderUseValue<T> =>
  isProviderBase<ProviderUseValue>(provider) && 'useValue' in provider

export const isProviderUseFactory = <T = any>(provider: any): provider is ProviderUseFactory<T> =>
  isProviderBase<ProviderUseFactory>(provider) && 'useFactory' in provider && isFunction(provider.useFactory)

export const isProviderUseClass = <T = any>(provider: any): provider is ProviderUseClass<T> =>
  isProviderBase<ProviderUseClass>(provider) && 'useClass' in provider && isClassType(provider.useClass)

export const isProviderUse = <T = any>(provider: any): provider is ProviderUse<T> =>
  isProviderUseValue<T>(provider) || isProviderUseFactory<T>(provider) || isProviderUseClass<T>(provider)

export const isProvider = <T = any>(provider: any): provider is IProvider<T> =>
  isClassType<ClassType<T>>(provider) || isAlias(provider) || isProviderUse<T>(provider)

export const isProviderId = <T extends ProviderId = ProviderId>(id: any): id is T =>
  isTokenized<T>(id) && 'module' in id && isToken(id.module)

export const isInstanceId = <T extends InstanceId = InstanceId>(id: any): id is T =>
  isProviderId<T>(id) && 'instance' in id && (isString(id.instance) || isSymbol(id.instance))

export const isCallId = <T extends CallId = CallId>(id: any): id is T => isInstanceId<T>(id) && 'method' in id && isString(id.method)
