export class Defer<T = any> implements Promise<T> {
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
  readonly promise = new Promise<T>((resolve, reject) => {
    this.resolve = resolve
    this.reject = reject
  })

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined,
  ): Promise<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected)
  }
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult> {
    return this.promise.catch(onrejected)
  }
  finally(onfinally?: (() => void) | null | undefined): Promise<T> {
    return this.promise.finally(onfinally)
  }
  [Symbol.toStringTag]: string = 'Promise'
}
