import { GLOBAL_MODULE, MODULE_METADATA } from '../constants'
import { DynamicModule } from '../interfaces/module.interface'
import { Type } from '../interfaces/type.interface'
import { isDynamicModule } from './is'

type ParsedModule = Type<any> | DynamicModule
type RequiredModule = Required<DynamicModule>

export const getGlobalModule = (module: ParsedModule): boolean =>
  isDynamicModule(module) ? !!module.global || getGlobalModule(module.module) : !!Reflect.getMetadata(GLOBAL_MODULE, module)

export const getImportsModule = (module: ParsedModule): RequiredModule['imports'] =>
  isDynamicModule(module)
    ? (module.imports || []).concat(getImportsModule(module.module))
    : Reflect.getMetadata(MODULE_METADATA.IMPORTS, module) || []

export const getProvidersModule = (module: ParsedModule): RequiredModule['providers'] =>
  isDynamicModule(module)
    ? (module.providers || []).concat(getProvidersModule(module.module))
    : Reflect.getMetadata(MODULE_METADATA.PROVIDERS, module) || []

export const getExportsModule = (module: ParsedModule): RequiredModule['exports'] =>
  isDynamicModule(module)
    ? (module.exports || []).concat(getExportsModule(module.module))
    : Reflect.getMetadata(MODULE_METADATA.EXPORTS, module) || []

export const getModuleMetadata = (module: ParsedModule): RequiredModule => ({
  module: isDynamicModule(module) ? module.module : module,
  global: getGlobalModule(module),
  imports: getImportsModule(module),
  exports: getExportsModule(module),
  providers: getProvidersModule(module),
})
