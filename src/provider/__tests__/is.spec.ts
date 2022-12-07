import { isString } from '../../helpers/is'
import {
  allCommonTypes,
  commonTypes,
  noClassTypes,
  noFunctionTypes,
  noTokenTypes,
  testData,
  testTokenized,
  tokenTypes,
} from '../../helpers/testIs'
import {
  isCallId,
  isInstanceId,
  isProvider,
  isProviderBase,
  isProviderId,
  isProviderUse,
  isProviderUseClass,
  isProviderUseFactory,
  isProviderUseValue,
} from '../is'

describe('provider helper is(...). type check', () => {
  it('is provider base', () => {
    testTokenized(isProviderBase)
  })

  it('is provider useValue', () => {
    testTokenized(isProviderUseValue, [{ useValue: 'test' }])
  })

  it('is provider useFactory', () => {
    testTokenized(
      isProviderUseFactory,
      [{ useFactory: () => {} }],
      noFunctionTypes.map(useFactory => ({ useFactory })),
    )
  })

  it('is provider useClass', () => {
    testTokenized(
      isProviderUseClass,
      [{ useClass: commonTypes.class }],
      noClassTypes.map(useClass => ({ useClass })),
    )
  })

  it('is provider use', () => {
    testTokenized(
      isProviderUse,
      [...allCommonTypes.map(useValue => ({ useValue })), { useFactory: () => {} }, { useClass: class {} }],
      [...noClassTypes.map(useClass => ({ useClass })), ...noFunctionTypes.map(useFactory => ({ useFactory }))],
    )
  })

  it('is provider', () => {
    testData(isProvider, [class {}], ['s', Symbol('f'), noTokenTypes])
    testTokenized(
      isProvider,
      [...allCommonTypes.map(useValue => ({ useValue })), { useFactory: () => {} }, { useClass: class {} }],
      [...noClassTypes.map(useClass => ({ useClass })), ...noFunctionTypes.map(useFactory => ({ useFactory }))],
    )
  })

  it('is provider id', () => {
    testTokenized(
      isProviderId,
      tokenTypes.map(module => ({ module })),
      noTokenTypes.map(module => ({ module })),
    )
  })

  it('is instance id', () => {
    testTokenized(
      isInstanceId,
      tokenTypes
        .map(module => [
          { module, instance: 'instance' },
          { module, instance: Symbol('instance') },
        ])
        .flat(),
      noTokenTypes.map(module => noTokenTypes.concat(class {}).map(instance => ({ module, instance }))).flat(),
    )
  })

  it('is call id', () => {
    testTokenized(
      isCallId,
      tokenTypes
        .map(module => [
          { module, instance: 'instance', method: 'method' },
          { module, instance: Symbol('instance'), method: 'method' },
        ])
        .flat(),
      noTokenTypes
        .map(module =>
          noTokenTypes.concat(class {}).map(instance =>
            allCommonTypes
              .filter(s => !isString(s))
              .map(method => ({
                module,
                instance,
                method,
              })),
          ),
        )
        .flat()
        .flat(),
    )
  })
})
