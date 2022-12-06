import { isFunction, isObject } from './is'

export const CONSTRUCTOR = 'constructor'
export const objectProperties = Object.getOwnPropertyNames(Object.prototype)
export const listPropertiesOf = (obj: any): string[] => {
  if (!obj || !isObject(obj)) return []
  const properties = new Set<string>()

  let instance = obj

  while (instance) {
    Object.getOwnPropertyNames(instance).forEach(prop => properties.add(prop))
    instance = Object.getPrototypeOf(instance)
  }

  return [...properties].filter(prop => !objectProperties.includes(prop))
}

export const listMethodsOf = (obj: any) => listPropertiesOf(obj).filter(key => isFunction(obj[key]))
