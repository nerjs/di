import { Token } from '../utils/types'
import { isClassType, isString, isSymbol } from './is'

export const tokenToString = (token: Token) => {
  if (isString(token)) return token
  if (isSymbol(token)) return token.toString()
  if (isClassType(token)) return token.name
  return `${token}`
}
