import { isFunction, isString } from '../helpers/is'
import { listMethodsOf } from '../helpers/object'
import { Noop } from './types'

export class MetadataCaller<I extends Record<string, Noop> = Record<string, Noop>> {
  readonly hooks = new Map<string, string>()
  constructor(metadataKey: string | symbol, proto: I) {
    listMethodsOf(proto)
      .filter(key => isFunction(proto[key]) && Reflect.hasMetadata(metadataKey, proto[key]))
      .forEach(key => {
        const hook = Reflect.getMetadata(metadataKey, proto[key])
        if (isString(hook)) this.hooks.set(hook, key)
      })
  }

  async call(hook: string, instance: I, ...args: any[]) {
    const key = this.hooks.get(hook)
    if (!key) return
    return await instance?.[key]?.(...args)
  }
}
