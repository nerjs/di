import { Alias, ClassType, InjectToken, Instance, RefInject, Token, Tokenized } from '../utils/types'

export const isString = (str: any): str is string => typeof str === 'string'
export const isSymbol = (sym: any): sym is symbol => typeof sym === 'symbol'
export const isObject = (obj: any): obj is Object => obj && typeof obj === 'object'
export const isFunction = (func: any): func is Function => typeof func === 'function'
export const isPromiseLike = (promise: any): promise is PromiseLike<any> => isObject(promise) && 'then' in promise
export const isPromise = (promise: any): promise is Promise<any> => isPromiseLike(promise) && 'catch' in promise && 'finally' in promise
export const isClassType = <T extends ClassType<any> = ClassType<any>>(cl: any): cl is T =>
  isFunction(cl) && /^\s*class\s+/.test(cl.toString())
export const isInstance = <T extends Instance<any> = Instance<any>>(ins: any): ins is T =>
  isObject(ins) && 'constructor' in ins && isClassType(ins.constructor)

export const isClassTypeToken = (token: any): token is ClassType => isClassType(token)
export const isToken = (token: any): token is Token => isString(token) || isSymbol(token) || isClassTypeToken(token)
export const isTokenized = <T extends Tokenized = Tokenized>(obj: any): obj is T => isObject(obj) && 'token' in obj && isToken(obj.token)
export const isAlias = (obj: any): obj is Alias => isTokenized<Alias>(obj) && 'alias' in obj && isToken(obj.alias)
export const isRefInject = (token: any): token is RefInject => isObject(token) && 'ref' in token && isFunction(token.ref)
export const isInjectToken = (token: any): token is InjectToken => isToken(token) || isInjectToken(token)
