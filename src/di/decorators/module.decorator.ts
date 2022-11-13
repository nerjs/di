import { MODULE_METADATA, SOURCE_TYPE, SOURCE_TYPES } from '../constants'
import { ModuleMetadata } from '../interfaces/module.interface'

const metadataKeys = [MODULE_METADATA.IMPORTS, MODULE_METADATA.EXPORTS, MODULE_METADATA.CONTROLLERS, MODULE_METADATA.PROVIDERS] as string[]

export const Module = (metadata?: ModuleMetadata): ClassDecorator => {
  if (!metadata) return Module({})
  return (target: Function) => {
    for (const property in metadata) {
      if (!metadataKeys.includes(property)) throw new Error(`Invalid property '${property}' passed into the @Module() decorator.`)
      Reflect.defineMetadata(property, (metadata as any)[property], target)
    }
    Reflect.defineMetadata(SOURCE_TYPE, SOURCE_TYPES.MODULE, target)
  }
}
