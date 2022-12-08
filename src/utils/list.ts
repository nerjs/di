import { isTokenized } from '../helpers/is'
import { tokenToString } from '../helpers/token'
import { EngineError } from './errors/engine.error'
import { ParamsError } from './errors/params.error'
import { MaybePromise, Token, Tokenized } from './types'

interface ListItem extends Tokenized {
  destroy?: (reason?: any) => MaybePromise<void>
}

export class List<I extends ListItem> {
  private readonly items = new Map<Token, I>()

  add(item: I) {
    if (!isTokenized(item)) throw new ParamsError({ item })
    if (this.items.has(item.token)) throw new EngineError(`Item with token "${tokenToString(item.token)}" already exists.`)
    this.items.set(item.token, item)
  }

  has(token: Token) {
    return this.items.has(token)
  }

  get(token: Token) {
    const item = this.items.get(token)
    if (!item) throw new EngineError(`Item ${tokenToString(token)} not found`)
    return item
  }

  clear() {
    this.items.clear()
  }

  async destroy(reason?: any) {
    const items = [...this.items.values()]
    this.items.clear()
    await Promise.all(items.map(item => item?.destroy?.(reason)))
  }
}
