import { ParamsError } from '../errors/params.error'
import { HooksCaller } from '../hooks.caller'

describe('hooks caller', () => {
  it('init class failed', () => {
    // @ts-ignore
    expect(() => new HooksCaller()).toThrow(ParamsError)
    // @ts-ignore
    expect(() => new HooksCaller('', {})).toThrow(ParamsError)
    expect(() => new HooksCaller([], {})).toThrow(ParamsError)
    expect(() => new HooksCaller([], {})).toThrow(ParamsError)
    // @ts-ignore
    expect(() => new HooksCaller(['f'], [])).toThrow(ParamsError)
  })

  it('init class success', () => {
    expect(() => new HooksCaller(['hook'], { hook: () => {} })).not.toThrow()
  })

  it('call hook failed', async () => {
    const caller = new HooksCaller(['method'], {})
    // @ts-ignore
    await expect(() => caller.call('method-fail')).rejects.toThrow(ParamsError)
  })

  it('call hooks success', async () => {
    const hook = jest.fn()
    const data = ['qwerty', new Date()]
    const caller = new HooksCaller(['hook', 'pseudohook'], { hook })
    await caller.call('pseudohook')
    await caller.call('hook', ...data)
    expect(hook).toHaveBeenCalled()
    expect(hook).toHaveBeenCalledWith(...data)
  })

  it('calling a hook multiple times', async () => {
    const hook = jest.fn()
    const caller = new HooksCaller(['hook'], { hook })
    await caller.call('hook')
    await caller.call('hook')
    await caller.call('hook')
    await caller.call('hook')
    expect(hook).toHaveBeenCalledTimes(1)
  })
})
