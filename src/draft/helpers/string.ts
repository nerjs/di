import { ParamsError } from '../errors/params.error'
import { isClassType, isString, isSymbol } from './is'
import { Token } from './types.helper'

const numberTo32 = (num: number) => num.toString(32)

const currentRandom = () => `${numberTo32(Date.now()).substring(3)}${numberTo32(Math.random()).substring(2)}`

let count = Math.round(Math.random() * 1023)
const nextPrefix = () => {
  if (count > 1023) count = 0
  const counter = numberTo32(++count)
  return counter.padStart(2, '0')
}
export const randomString = (length: number = 10) => `${nextPrefix()}${currentRandom()}`.substring(0, length)

export const tokenToString = (token: Token) => {
  if (isString(token)) return token
  if (isSymbol(token)) return token.toString()
  if (isClassType(token)) return token.name
  throw new ParamsError({ token })
}
