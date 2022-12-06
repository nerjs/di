import { tokenToString } from '../helpers/string'
import { Token } from '../helpers/types.helper'
import { INameProvider } from './interface.provider'

export class NameProvider implements INameProvider {
  constructor(readonly module: Token, readonly token: Token) {}

  toString() {
    return `${tokenToString(this.module)}/${tokenToString(this.token)}`
  }
}
