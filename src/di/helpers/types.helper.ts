export type MaybePromise<T = any> = Promise<T> | T

export interface ClassType<T = any> extends Function {
  new (...args: any[]): T
}

export interface Instance {
  constructor: Function
}
