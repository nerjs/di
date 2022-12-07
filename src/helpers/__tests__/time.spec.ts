import { sleep } from '../time'

describe('helpers for time', () => {
  jest.useFakeTimers()
  it('sleep', async () => {
    const fn = jest.fn()
    sleep(2000).then(fn)
    await jest.advanceTimersByTime(1000)
    expect(fn).not.toBeCalled()
    await jest.advanceTimersByTime(1000)
    expect(fn).toBeCalled()
  })
})
