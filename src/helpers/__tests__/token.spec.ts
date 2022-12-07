import { tokenToString } from '../token'

describe('token helper', () => {
  it('stringify sting token', () => {
    expect(tokenToString('token')).toEqual('token')
  })

  it('stringify symbol token', () => {
    const token = Symbol('token')
    expect(tokenToString(token)).toEqual(token.toString())
  })

  it('stringify class token', () => {
    const token = class ClassToken {}
    expect(tokenToString(token)).toEqual('ClassToken')
  })

  it('stringify other types token', () => {
    ;[1, new Date(), {}, null, true, false, undefined].forEach(token => {
      expect(tokenToString(token as any)).toEqual(JSON.stringify(token))
    })
  })
})
