import { isFunction, isObject } from '../helpers/is'
import { Noop } from './types'
import { ParamsError } from './errors/params.error'

type Ins<K extends string> = {
  [key in K]?: Noop
}

export class HooksCaller<H extends string, I extends Ins<H> = Ins<H>> {
  private readonly called = new Set<H>()
  constructor(private readonly hooks: H, private readonly instance: I) {
    if (!Array.isArray(hooks)) throw new ParamsError({ hooks })
    if (!isObject(instance)) throw new ParamsError({ instance })
  }

  async call(hook: H, ...args: any) {
    if (!this.hooks.includes(hook)) throw new ParamsError({ hook })
    if (this.called.has(hook)) return
    if (isFunction(this.instance?.[hook])) return
    this.called.add(hook)
    await this.instance[hook]?.(...args)
  }
}
