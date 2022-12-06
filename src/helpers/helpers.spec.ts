import { isClassType, isFunction, isInstance, isObject, isPromise, isPromiseLike, isString, isSymbol } from './is'
import { listMethodsOf, listPropertiesOf } from './object'
import { DEFAULT_LENGTH, randomString } from './string'
import { sleep } from './time'

describe('helpers', () => {
  describe('is', () => {
    const data: Record<string, any> = {
      string: 'string',
      symbol: Symbol(''),
      number: 123,
      object: {},
      function: () => {},
      promiselike: { then() {} },
      promise: Promise.resolve(),
      class: class {},
      instance: new (class {})(),
    }

    const testData = (fn: (arg: any) => boolean, correct: (keyof typeof data)[]) => {
      for (const key in data) {
        const item = data[key]
        const exp = expect(fn(item))
        if (correct.includes(key)) {
          exp.toBeTruthy()
        } else {
          exp.toBeFalsy()
        }
      }
    }

    it('is string', () => {
      testData(isString, ['string'])
    })
    it('is symbol', () => {
      testData(isSymbol, ['symbol'])
    })
    it('is object', () => {
      testData(isObject, ['object', 'promiselike', 'promise', 'instance'])
    })
    it('is function', () => {
      testData(isFunction, ['function', 'class'])
    })
    it('is promise like', () => {
      testData(isPromiseLike, ['promiselike', 'promise'])
    })
    it('is promise', () => {
      testData(isPromise, ['promise'])
    })
    it('is class', () => {
      testData(isClassType, ['class'])
    })
    it('is instance of class', () => {
      testData(isInstance, ['instance'])
    })
  })

  describe('object', () => {
    class A {
      field1 = 1
      method1() {}
      method2() {}
    }

    class B extends A {
      field2 = 2
      method3() {}
    }
    it('prototype properties', () => {
      expect(listPropertiesOf(A.prototype)).toEqual(expect.arrayContaining(['method1', 'method2']))
      expect(listPropertiesOf(B.prototype)).toEqual(expect.arrayContaining(['method1', 'method2', 'method3']))
      expect(listPropertiesOf(A.prototype).length).toEqual(2)
      expect(listPropertiesOf(B.prototype).length).toEqual(3)
    })

    it('instance properties', () => {
      expect(listPropertiesOf(new A())).toEqual(expect.arrayContaining(['field1', 'method1', 'method2']))
      expect(listPropertiesOf(new B())).toEqual(expect.arrayContaining(['field1', 'field2', 'method1', 'method2', 'method3']))
      expect(listPropertiesOf({ field: 1 })).toEqual(expect.arrayContaining(['field']))
      expect(listPropertiesOf(new A()).length).toEqual(3)
      expect(listPropertiesOf(new B()).length).toEqual(5)
      expect(listPropertiesOf({ field: 1 }).length).toEqual(1)
    })

    it('only methods', () => {
      expect(listMethodsOf(new A())).toEqual(expect.arrayContaining(['method1', 'method2']))
      expect(listMethodsOf(new B())).toEqual(expect.arrayContaining(['method1', 'method2', 'method3']))
      expect(listMethodsOf(new A()).length).toEqual(2)
      expect(listMethodsOf(new B()).length).toEqual(3)
    })

    it('no object', () => {
      expect(listPropertiesOf(1)).toEqual([])
      expect(listPropertiesOf(1).length).toEqual(0)
    })

    it('extends null', () => {
      const obj: any = Object.create(null)
      obj.field = 1
      expect(listPropertiesOf(null)).toEqual([])
      expect(listPropertiesOf(obj)).toEqual(['field'])
    })
  })

  describe('string', () => {
    it('random string', () => {
      expect(randomString(5)).not.toEqual(randomString(5))
    })

    it('length random string', () => {
      expect(randomString().length).toEqual(DEFAULT_LENGTH)
      expect(randomString(5).length).toEqual(5)
    })
  })

  describe('time', () => {
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
})
