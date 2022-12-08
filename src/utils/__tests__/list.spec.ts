import { ParamsError } from '../errors/params.error'
import { List } from '../list'

describe('list contexts', () => {
  let list = new List()
  const item = { token: 'token' }

  beforeEach(() => {
    list = new List()
  })

  it('validate added item', () => {
    // @ts-ignore
    expect(() => list.add({})).toThrow(ParamsError)
    // @ts-ignore
    expect(() => list.add('token')).toThrow(ParamsError)
    // @ts-ignore
    expect(() => list.add({ token: 1 })).toThrow(ParamsError)

    expect(() => list.add({ token: 'token' })).not.toThrow()
  })

  it('Repeat until', () => {
    list.add(item)
    expect(() => list.add(item)).toThrow()
  })

  it('Adding an item with confirmation', () => {
    list.add(item)
    expect(list.has(item.token)).toBeTruthy()
    expect(list.get(item.token)).toEqual(item)
  })

  it('Getting an item that does not exist', () => {
    expect(() => list.get('token')).toThrow()
  })

  it('Clearing', () => {
    list.add(item)
    list.clear()
    expect(list.has(item.token)).toBeFalsy()
  })

  it('Calling the destroy method', async () => {
    const destroyedItem = {
      ...item,
      destroy: jest.fn(),
    }
    const reason = 'reason'
    list.add(destroyedItem)
    await list.destroy(reason)

    expect(destroyedItem.destroy).toHaveBeenCalled()
    expect(destroyedItem.destroy).toHaveBeenCalledWith(reason)
  })
})
