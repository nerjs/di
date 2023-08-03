import { isString, isSymbol } from '../../helpers/is'
import { tokenToString } from '../../helpers/token'
import { ParamsError } from '../../utils/errors/params.error'
import { Token } from '../../utils/types'
import { IInstanceId } from '../types'
import { ProviderId } from './provider.id'

export class InstanceId extends ProviderId implements IInstanceId {
  instance: string | symbol

  constructor(instance: InstanceId)
  constructor(provider: ProviderId, instance: string | symbol)
  constructor(module: Token, token: Token, instance: string | symbol)
  constructor(moduleOrInsOrPr: Token | InstanceId | ProviderId, tokenOrIns?: Token, instance?: string | symbol) {
    if (moduleOrInsOrPr instanceof InstanceId) {
      super(moduleOrInsOrPr)
      this.instance = moduleOrInsOrPr.instance
    } else if (moduleOrInsOrPr instanceof ProviderId) {
      super(moduleOrInsOrPr)
      if (!isString(tokenOrIns) && !isSymbol(tokenOrIns)) throw new ParamsError({ instance: tokenOrIns })
      this.instance = tokenOrIns
    } else {
      super(moduleOrInsOrPr, tokenOrIns as any)
      if (!isString(instance) && !isSymbol(instance)) throw new ParamsError({ instance })
      this.instance = instance
    }
  }

  toString() {
    return `${super.toString()}:${tokenToString(this.instance)}`
  }
}
