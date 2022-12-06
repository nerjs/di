import { isAlias, isClassType, isFunction, isTokenized } from '../helpers/is'
import { IProvider, ProviderBase, ProviderUse, ProviderUseClass, ProviderUseFactory, ProviderUseValue } from './interface.provider'

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
  isClassType<T>(provider) || isAlias(provider) || isProviderUse<T>(provider)
