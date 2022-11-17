export const SOURCE_TYPE = 'source:type'
export enum SOURCE_TYPES {
  MODULE = 'MODULE',
  SERVER = 'SERVER',
  CONTROLLER = 'CONTROLLER',
  PROVIDER = 'PROVIDER',
}

export enum MODULE_METADATA {
  IMPORTS = 'imports',
  PROVIDERS = 'providers',
  CONTROLLERS = 'controllers',
  EXPORTS = 'exports',
}

export const SOURCE_HOOK = 'source:hook'
export enum SOURCE_HOOKS {
  CREATED = 'created',
  BEFORE_INIT = 'before_init',
  INIT = 'init',
  AFTER_INIT = 'after_init',
  LISTEN = 'listen',
  BOOTSTRAP = 'bootstrap',
}

export const GLOBAL_MODULE = 'global:module'
