import { GLOBAL_MODULE, MODULE_METADATA } from '../constants'
import { DynamicModule, ReadyModule } from '../interfaces/module.interface'
import { isDynamicModule } from './is'

type RequiredModule = Required<DynamicModule>

export const getGlobalModule = (module: ReadyModule): boolean =>
  isDynamicModule(module) ? !!module.global || getGlobalModule(module.module) : !!Reflect.getMetadata(GLOBAL_MODULE, module)

export const getImportsModule = (module: ReadyModule): RequiredModule['imports'] =>
  isDynamicModule(module)
    ? (module.imports || []).concat(getImportsModule(module.module))
    : Reflect.getMetadata(MODULE_METADATA.IMPORTS, module) || []

export const getProvidersModule = (module: ReadyModule): RequiredModule['providers'] =>
  isDynamicModule(module)
    ? (module.providers || []).concat(getProvidersModule(module.module))
    : Reflect.getMetadata(MODULE_METADATA.PROVIDERS, module) || []

export const getExportsModule = (module: ReadyModule): RequiredModule['exports'] =>
  isDynamicModule(module)
    ? (module.exports || []).concat(getExportsModule(module.module))
    : Reflect.getMetadata(MODULE_METADATA.EXPORTS, module) || []

export const getModuleMetadata = (module: ReadyModule): RequiredModule => ({
  module: isDynamicModule(module) ? module.module : module,
  global: getGlobalModule(module),
  imports: getImportsModule(module),
  exports: getExportsModule(module),
  providers: getProvidersModule(module),
})
