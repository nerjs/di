import { Alias, ClassType, Instance, Token, Tokenized } from './types.helper'

export const isString = (str: any): str is string => typeof str === 'string'
export const isSymbol = (sym: any): sym is symbol => typeof sym === 'symbol'
export const isObject = (obj: any): obj is Object => obj && typeof obj === 'object'
export const isFunction = (func: any): func is Function => typeof func === 'function'
export const isPromiseLike = (promise: any): promise is PromiseLike<any> => isObject(promise) && 'then' in promise
export const isPromise = (promise: any): promise is Promise<any> => isPromise(promise) && 'catch' in promise && 'finally' in promise
export const isClassType = <T = any>(cl: any): cl is ClassType<T> => isFunction(cl) && /^\s*class\s+/.test(cl.toString())
export const isInstance = <T = any>(ins: any): ins is Instance<T> => isObject(ins) && 'constructor' in ins && isFunction(ins.constructor)
export const isInstanceOf = <T>(ins: any, cl: ClassType<T>): ins is Instance<T> =>
  isInstance(ins) && Object.getPrototypeOf(ins) === cl.prototype

export const isStringToken = (token: any): token is string => isString(token)
export const isSymbolToken = (token: any): token is symbol => isSymbol(token)
export const isClassTypeToken = (token: any): token is ClassType => isClassType(token)
export const isToken = (token: any): token is Token => isStringToken(token) || isSymbolToken(token) || isClassTypeToken(token)
export const isTokenized = (obj: any): obj is Tokenized => isObject(obj) && 'token' in obj && isToken(obj.token)
export const isAlias = (obj: any): obj is Alias => isTokenized(obj) && 'alias' in obj && isToken(obj.alias)
