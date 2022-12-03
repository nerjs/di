import { CONSTRUCTOR } from '../constants'
import { isFunction, isObject } from './is'

const objectMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(Object()))
export const getAllMethods = (obj: any, arr: string[] = []): string[] => {
  if (!obj || !isObject(obj)) return arr
  const methods = Object.getOwnPropertyNames(obj).filter(key => key !== CONSTRUCTOR && isFunction(obj[key]) && !objectMethods.includes(key))
  return getAllMethods(Object.getPrototypeOf(obj), [...new Set([...methods, ...arr])])
}
