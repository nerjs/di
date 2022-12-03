import { HOOK } from '../constants'
import { isFunction, isObject } from '../helpers/is'
import { getAllMethods } from '../helpers/methods'
import { Hooks } from '../helpers/types.helper'

export class HookCaller {
  private readonly hooks: Map<Hooks, string[]> = new Map()
  constructor(instance: any) {
    this.analize(instance)
  }

  async call(instance: any, hookName: Hooks, ...args: any[]) {
    if (!isObject(instance)) return
    const hookArr = this.hooks.get(hookName)
    if (!hookArr) return

    for (const hook of hookArr) {
      if (hook in instance && isFunction((instance as any)[hook])) {
        await (instance as any)[hook](...args)
      }
    }
  }

  private analize(instance: any) {
    if (!isObject(instance)) return
    const methods = getAllMethods(instance)
    console.log({ methods })
    methods.forEach(method => {
      const hook = Reflect.getMetadata(HOOK, instance, method) as Hooks
      console.log({ hook })
      if (!hook) return
      const saved = this.hooks.get(hook) || []
      saved.push(hook)
      this.hooks.set(hook, saved)
    })
  }
}
