import { Defer } from '../defer'

describe('Defer promise', () => {
  const fn = jest.fn()
  let defer: Defer
  beforeEach(() => {
    fn.mockClear()
    fn.mockReset()
    defer = new Defer()
  })

  it('is promise', () => {
    expect(defer.then(fn)).toBeInstanceOf(Promise)
    expect(defer.catch(fn)).toBeInstanceOf(Promise)
    expect(defer.finally(fn)).toBeInstanceOf(Promise)
  })

  it('resolve success', async () => {
    defer.then(fn)
    await defer.resolve(1)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(1)
  })

  it('resolve error', async () => {
    defer.then(() => {}, fn)
    await defer.reject(1)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(1)
  })
  it('reject', async () => {
    defer.catch(fn)
    await defer.reject(1)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(1)
  })
  it('finally defer promise', async () => {
    defer.finally(fn)
    await defer.resolve(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
