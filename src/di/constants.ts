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
