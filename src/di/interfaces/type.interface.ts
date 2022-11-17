import { ClassType } from '../helpers/types.helper'

export type Type<T = any> = ClassType<T>

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
