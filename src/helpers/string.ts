export const DEFAULT_LENGTH = 10
const numberTo32 = (num: number) => num.toString(32)

const currentRandom = () => `${numberTo32(Date.now()).substring(3)}${numberTo32(Math.random()).substring(2)}`

let count = Math.round(Math.random() * 1023)
const nextPrefix = () => {
  if (count > 1023) count = 0
  const counter = numberTo32(++count)
  return counter.padStart(2, '0')
}
export const randomString = (length: number = DEFAULT_LENGTH) => `${nextPrefix()}${currentRandom()}`.substring(0, length)
