export type MaybePromise<T = any> = Promise<T> | T
export type MaybePromiseLike<T = any> = PromiseLike<T> | T

export interface ClassType<T = any> {
  new (...args: any[]): T
}
export type Instance<T = any> = T & { constructor: ClassType<T> }
