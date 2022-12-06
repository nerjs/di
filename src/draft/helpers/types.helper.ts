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
}

export interface Alias extends Tokenized {
  alias: Token
}

export interface RefInject {
  ref: () => MaybePromise<Token>
}

export type InjectToken = RefInject | Token

export interface IInjector {
  get<T = any>(token: Token, parent?: Token): MaybePromise<T>
  getAll<T extends any[] = any[]>(tokens: Token[], parent?: Token): PromiseLike<T>
}

export enum Hooks {
  CREATED = 'created',
  INIT = 'init',
  INITED = 'inited',
  BOOTSTRAP = 'bootstrap',
  DESTROY = 'destroy',
  BEFORE_SHUTDOWN = 'before_shutdown',
  SHUTDOWN = 'shutdown',
}
