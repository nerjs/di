import { CONSTRUCTOR } from '../constants'
import { isFunction, isObject } from './is'

export const getAllProperties = (obj: any, arr: string[] = []): string[] => {
  if (!obj || !isObject(obj)) return arr
  const properties = Object.getOwnPropertyNames(obj)
  return getAllProperties(Object.getPrototypeOf(obj), [...new Set([...properties, ...arr])])
}

const objectMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(Object()))
export const getAllMethods = (obj: any) =>
  getAllProperties(obj).filter(key => key !== CONSTRUCTOR && isFunction(obj[key]) && !objectMethods.includes(key))
