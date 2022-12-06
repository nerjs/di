import { AbstractContext } from '../context/abstarct.context'

export class ContextModule extends AbstractContext {
  constructor(readonly parent: AbstractContext) {
    super()
  }
}
