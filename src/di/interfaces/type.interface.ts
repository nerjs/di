export interface Type<T = any> extends Function {
  new (...args: any[]): T
}

export enum Scope {
  GLOBAL,
  MODULE,
  INSTANCE,
  REQUEST,
}

export interface Abstract<T> extends Function {
  prototype: T
}

export type InjectionToken = string | symbol | Type<any> | Abstract<any> | Function

export type OptionalFactoryDependency = {
  token: InjectionToken
  optional: boolean
}

export type InjectFactoryToken = InjectionToken | OptionalFactoryDependency
