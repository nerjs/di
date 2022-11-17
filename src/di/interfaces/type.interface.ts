export interface ClassType<T = any> extends Function {
  new (...args: any[]): T
}

export interface Instance {
  constructor: Function
}

export enum Scope {
  GLOBAL,
  MODULE,
  INSTANCE,
  REQUEST,
}

export type InjectionToken = string | symbol | ClassType<any>

export type OptionalFactoryDependency = {
  token: InjectionToken
  optional: boolean
}

export type InjectFactoryToken = InjectionToken | OptionalFactoryDependency
