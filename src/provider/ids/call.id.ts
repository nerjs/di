import { isString } from '../../helpers/is'
import { ParamsError } from '../../utils/errors/params.error'
import { Token } from '../../utils/types'
import { ICallId } from '../types'
import { InstanceId } from './instance.id'
import { ProviderId } from './provider.id'

export class CallId extends InstanceId implements ICallId {
  readonly method: string

  constructor(callId: CallId)
  constructor(instance: InstanceId, method: string)
  constructor(provider: ProviderId, instance: string | symbol, method: string)
  constructor(module: Token, token: Token, instance: string | symbol, method: string)
  constructor(
    moduleOrCallOrInsOrPr: Token | CallId | InstanceId | ProviderId,
    tokenOrInsOrPrOrMethod?: Token,
    instanceOrMethod?: string | symbol,
    method?: string,
  ) {
    if (moduleOrCallOrInsOrPr instanceof CallId) {
      super(moduleOrCallOrInsOrPr)
      this.method = moduleOrCallOrInsOrPr.method
    } else if (moduleOrCallOrInsOrPr instanceof InstanceId) {
      super(moduleOrCallOrInsOrPr)
      if (!isString(tokenOrInsOrPrOrMethod)) throw new ParamsError({ method: tokenOrInsOrPrOrMethod })
      this.method = tokenOrInsOrPrOrMethod
    } else if (moduleOrCallOrInsOrPr instanceof ProviderId) {
      super(moduleOrCallOrInsOrPr, tokenOrInsOrPrOrMethod as any)
      if (!isString(instanceOrMethod)) throw new ParamsError({ method: instanceOrMethod })
      this.method = instanceOrMethod
    } else {
      if (!isString(method))
        throw new ParamsError({
          module: moduleOrCallOrInsOrPr,
          token: tokenOrInsOrPrOrMethod,
          instance: instanceOrMethod,
          method,
        })

      super(moduleOrCallOrInsOrPr, tokenOrInsOrPrOrMethod as any, instanceOrMethod as any)
      this.method = method
    }
  }

  toString(): string {
    return `${super.toString()}[${this.method}]`
  }
}
