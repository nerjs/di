import { DEFAULT_LENGTH, randomString } from '../string'

describe('helpers for string', () => {
  it('random string', () => {
    expect(randomString(5)).not.toEqual(randomString(5))
  })

  it('length random string', () => {
    expect(randomString().length).toEqual(DEFAULT_LENGTH)
    expect(randomString(5).length).toEqual(5)
  })
})
