export type MaybePromise<T = any> = Promise<T> | T
export type MaybePromiseLike<T = any> = PromiseLike<T> | T

export interface ClassType<T = any> {
  new (...args: any[]): T
}
export type Instance<T = any> = T & { constructor: ClassType<T> }

export type Noop = (...args: any[]) => MaybePromise<any>

export type Token = string | symbol | ClassType

export interface Tokenized {
  token: Token
}

export interface Alias extends Tokenized {
  alias: Token
}

export interface RefInject {
  ref: () => MaybePromise<Token>
}

export type OptionalInject = {
  optional: true
} & (Tokenized | RefInject)

export type WithParamsInject = {
  params: any
} & (OptionalInject | RefInject | Tokenized)

export type InjectToken = RefInject | Token | OptionalInject | WithParamsInject
