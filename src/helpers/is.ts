import { Alias, ClassType, InjectToken, Instance, OptionalInject, RefInject, Token, Tokenized, WithParamsInject } from '../utils/types'

// common data types
export const isString = (str: any): str is string => typeof str === 'string'
export const isSymbol = (sym: any): sym is symbol => typeof sym === 'symbol'
export const isObject = (obj: any): obj is Object => obj && typeof obj === 'object' && !Array.isArray(obj)
export const isFunction = (func: any): func is Function => typeof func === 'function'
export const isPromiseLike = (promise: any): promise is PromiseLike<any> => isObject(promise) && 'then' in promise
export const isPromise = (promise: any): promise is Promise<any> => promise instanceof Promise
export const isClassType = <T extends ClassType<any> = ClassType<any>>(cl: any): cl is T =>
  isFunction(cl) && /^\s*class\s+/.test(cl.toString())
export const isInstance = <T extends Instance<any> = Instance<any>>(ins: any): ins is T =>
  isObject(ins) && 'constructor' in ins && isClassType(ins.constructor)

// specific data types
export const isClassTypeToken = (token: any): token is ClassType => isClassType(token)
export const isToken = (token: any): token is Token => isString(token) || isSymbol(token) || isClassTypeToken(token)
export const isTokenized = <T extends Tokenized = Tokenized>(obj: any): obj is T => isObject(obj) && 'token' in obj && isToken(obj.token)
export const isAlias = (obj: any): obj is Alias => isTokenized<Alias>(obj) && 'alias' in obj && isToken(obj.alias)
export const isRefInject = (token: any): token is RefInject => isObject(token) && 'ref' in token && isFunction(token.ref)
export const isOptionalInject = (token: any): token is OptionalInject =>
  (isTokenized(token) || isRefInject(token)) && 'optional' in token && !!(token as any).optional
export const isWithParamsInject = (token: any): token is WithParamsInject => (isTokenized(token) || isRefInject(token)) && 'params' in token
export const isInjectToken = (token: any): token is InjectToken => isToken(token) || isRefInject(token) || isOptionalInject(token)
