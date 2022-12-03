export type MaybePromise<T = any> = Promise<T> | T
export type MaybePromiseLike<T = any> = PromiseLike<T> | T

export interface ClassType<T = any> {
  new (...args: any[]): T
}
export type Instance<T = any> = T & { constructor: ClassType<T> }

export interface InjectableClassType<T = any> extends ClassType<T> {
  inject?: Token[]
}

export type Token = string | symbol | InjectableClassType

export interface Tokenized {
  token: Token
  [key: string | symbol]: any
}

export interface Alias extends Pick<Tokenized, 'token'> {
  alias: Token
}

export enum Hooks {
  CREATED = 'created',
  INIT = 'init',
  INITED = 'inited',
  BOOTSTRAP = 'bootstrap',
}
