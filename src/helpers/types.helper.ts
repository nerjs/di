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

class AA {
  asd() {
    return 123
  }
}

const aa = new AA()

// @ts-ignore
console.log(Object.getPrototypeOf(aa) === AA.prototype)
