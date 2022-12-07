import { Noop } from '../utils/types'
import { isClassType, isFunction } from './is'

export const commonTypes = {
  string: 'string',
  symbol: Symbol(''),
  number: 123,
  object: {},
  function: () => {},
  promiselike: { then() {} },
  promise: Promise.resolve(),
  class: class {},
  instance: new (class {})(),
  array: [],
  null: null,
  true: true,
  false: false,
  undefined: undefined,
}

export const allCommonTypes = Object.values(commonTypes)

export const tokenTypes = [commonTypes.string, commonTypes.symbol, commonTypes.class]
export const noTokenTypes = allCommonTypes.filter(v => !tokenTypes.includes(v as any))
export const noClassTypes = allCommonTypes.filter(v => !isClassType(v))
export const noFunctionTypes = noClassTypes.filter(v => !isFunction(v))

export const testData = (filter: Noop, allowed: any[], disallowed: any[]) => {
  allowed.forEach(at => expect(filter(at)).toBeTruthy())
  disallowed.forEach(at => expect(filter(at)).toBeFalsy())
}

export const testCommonData = <K extends keyof typeof commonTypes>(filter: Noop, correct: K[]) => {
  const allowed = correct.map(key => commonTypes[key])
  const disallowed = Object.keys(commonTypes)
    .filter(key => !correct.includes(key as K))
    .map(key => commonTypes[key as K])
  testData(filter, allowed, disallowed)
}

export const testTokenized = (filter: Noop, allowedMergeData?: any[] | null, disallowedMergeData?: any[]) => {
  testData(
    filter,
    tokenTypes.map(token => (allowedMergeData?.length ? allowedMergeData.map(d => Object.assign({ token }, d)) : [{ token }])).flat(),
    noTokenTypes
      .map(token => [token, { token }].concat(disallowedMergeData?.length ? disallowedMergeData.map(d => Object.assign({ token }, d)) : []))
      .flat(),
  )
}
