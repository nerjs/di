import { AbortError } from '../errors/abort.error'
import { CommonError } from '../errors/common.error'
import { EngineError } from '../errors/engine.error'
import { ParamsError } from '../errors/params.error'
import { ProxyError } from '../errors/proxy.error'
import { TimeoutError } from '../errors/timeout.error'

describe('common errors', () => {
  describe('base common error', () => {
    class ChildError extends CommonError {
      code: string = 'child'
    }
    const cause = 'qwerty'
    const message = 'message'
    let err: ChildError

    beforeEach(() => {
      err = new ChildError(message, cause)
    })

    it('The error name must match the name of the heir', () => {
      expect(err.name).toEqual(ChildError.name)
    })

    it('error cause', () => {
      expect(err.cause).toEqual(cause)
      expect(new ChildError(message).cause).not.toBeDefined()
    })

    it('error to json', () => {
      expect(err.toJSON()).toEqual(
        expect.objectContaining({
          message,
          name: ChildError.name,
          cause,
          code: expect.any(String),
          stack: expect.any(Array),
        }),
      )

      delete err.stack
      expect(err.toJSON().stack).not.toBeDefined()
    })
  })

  describe('abort error', () => {
    it('code abort error', () => {
      expect(new AbortError().code).toEqual(expect.any(String))
    })

    it('abort error with label', () => {
      expect(new AbortError('label').cause).toEqual('label')
    })
    it('abort error without label', () => {
      expect(new AbortError().cause).not.toBeDefined()
    })

    it('abort error static is() helper', () => {
      const err = new Error()
      Object.assign(err, { code: 'ABORT_ERR' })
      expect(AbortError.is(new AbortError())).toBeTruthy()
      expect(AbortError.is(new AbortError())).toBeTruthy()
      expect(AbortError.is(new Error())).toBeFalsy()
      expect(AbortError.is({})).toBeFalsy()
      expect(AbortError.is(new AbortError().toJSON())).toBeFalsy()
    })

    it('from abort error', () => {
      const err = new AbortError()
      expect(AbortError.from(err)).toEqual(err)
    })

    it('from object', () => {
      expect(AbortError.from({ cause: 'qwerty' } as any).cause).toEqual('qwerty')
    })

    it('from error', () => {
      const err: any = new Error()
      expect(AbortError.from(err).stack).toEqual(err.stack)
    })
  })

  describe('engine error', () => {
    it('code engine error', () => {
      expect(new EngineError('message').code).toEqual(expect.any(String))
    })
  })

  describe('params error', () => {
    it('code params error', () => {
      expect(new ParamsError().code).toEqual(expect.any(String))
    })

    it('cause params', () => {
      const params = {
        field1: 1,
        field2: 2,
      }

      expect(new ParamsError(params).cause).toEqual(params)
    })

    it('params error message', () => {
      expect(new ParamsError().message).toMatch(/incorrect/)
    })

    it('keys params in message', () => {
      const params = {
        field1: 1,
      }

      expect(new ParamsError(params).message).toMatch(/field1/)
    })
  })

  describe('timeout error', () => {
    it('code timeout error', () => {
      expect(new TimeoutError().code).toEqual(expect.any(String))
    })

    it('timeout cause', () => {
      expect(new TimeoutError(1000).cause).toEqual(1000)
    })
  })

  describe('proxy error', () => {
    it('code timeout error', () => {
      expect(new ProxyError(new Error()).code).toEqual(expect.any(String))
    })

    it('Original error cause', () => {
      const err = new Error()
      expect(new ProxyError(err).cause).toEqual(err)
    })

    it('message of original error', () => {
      const err = new Error('qwerty')
      expect(new ProxyError(err, 'custom message').message).toMatch(err.message)
    })

    it('custom message', () => {
      const err = new Error('qwerty')
      expect(new ProxyError(err, 'custom message').message).toMatch('custom message')
    })
  })
})
