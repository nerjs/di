import { ClassType, Instance } from '../utils/types'

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
