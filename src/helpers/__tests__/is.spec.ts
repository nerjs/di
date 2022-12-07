import { isPromise } from 'util/types'
import {
  isAlias,
  isClassType,
  isClassTypeToken,
  isFunction,
  isInjectToken,
  isInstance,
  isObject,
  isOptionalInject,
  isPromiseLike,
  isRefInject,
  isString,
  isSymbol,
  isToken,
  isTokenized,
} from '../is'
import { noTokenTypes, testCommonData, testData, tokenTypes } from '../testIs'

describe('helper is(...). type check', () => {
  describe('coomon data types', () => {
    it('is string', () => {
      testCommonData(isString, ['string'])
    })
    it('is symbol', () => {
      testCommonData(isSymbol, ['symbol'])
    })
    it('is object', () => {
      testCommonData(isObject, ['object', 'promiselike', 'promise', 'instance'])
    })
    it('is function', () => {
      testCommonData(isFunction, ['function', 'class'])
    })
    it('is promise like', () => {
      testCommonData(isPromiseLike, ['promiselike', 'promise'])
    })
    it('is promise', () => {
      testCommonData(isPromise, ['promise'])
    })
    it('is class', () => {
      testCommonData(isClassType, ['class'])
    })
    it('is instance of class', () => {
      testCommonData(isInstance, ['instance'])
    })
  })

  describe('specific data types', () => {
    it('is class type token', () => {
      testCommonData(isClassTypeToken, ['class'])
    })

    it('is token', () => {
      testData(isToken, tokenTypes, noTokenTypes)
    })

    it('is tokenized', () => {
      testData(
        isTokenized,
        tokenTypes.map(token => ({ token })),
        noTokenTypes.concat(noTokenTypes.map(token => ({ token }))),
      )
    })

    it('is alias', () => {
      testData(
        isAlias,
        tokenTypes
          .map(token =>
            tokenTypes.map(alias => ({
              token,
              alias,
            })),
          )
          .flat(),
        noTokenTypes
          .map(token =>
            noTokenTypes.map(alias => ({
              token,
              alias,
            })),
          )
          .flat(),
      )
    })

    it('is ref inject', () => {
      const allTypes = [...tokenTypes, ...noTokenTypes]
      testData(isRefInject, [{ ref: () => {} }], [...allTypes, ...allTypes.filter(t => !isFunction(t)).map(ref => ({ ref }))])
    })

    it('is optional inject', () => {
      testData(
        isOptionalInject,
        [
          { ref: () => {}, optional: true },
          ...tokenTypes.map(token => ({
            token,
            optional: true,
          })),
        ],
        [...tokenTypes.map(token => [token, { token }, { token, optional: false }]).flat(), ...noTokenTypes],
      )
    })

    it('is inject token', () => {
      testData(
        isInjectToken,
        [{ ref: () => {}, optional: true }, { ref: () => {} }, ...tokenTypes.map(token => [token, { token, optional: true }]).flat()],
        [
          ...tokenTypes.map(token => ({ token })),
          ...noTokenTypes.map(token => [token, { token }]).flat(),
          ...[...tokenTypes, ...noTokenTypes].filter(f => !isFunction(f)).map(ref => ({ ref })),
        ],
      )
    })
  })
})
