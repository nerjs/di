import { isToken } from '../../helpers/is'
import { tokenToString } from '../../helpers/token'
import { ParamsError } from '../../utils/errors/params.error'
import { Token } from '../../utils/types'
import { IProviderId } from '../types'

export class ProviderId implements IProviderId {
  readonly module: Token
  readonly token: Token
  constructor(provider: ProviderId)
  constructor(module: Token, token: Token)
  constructor(moduleOrProvider: Token | ProviderId, token?: Token) {
    if (moduleOrProvider instanceof ProviderId) {
      this.module = moduleOrProvider.module
      this.token = moduleOrProvider.token
    } else {
      if (!token) throw new ParamsError({ token })
      this.module = moduleOrProvider
      this.token = token
    }

    if (!isToken(this.module) || !isToken(this.token)) throw new ParamsError(this)
  }

  toString() {
    return `${tokenToString(this.module)}/${tokenToString(this.token)}`
  }
}
