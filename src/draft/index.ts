import 'reflect-metadata'
// import { Hooks } from './helpers/types.helper'
// import { HookCaller } from './common/hook.caller'
// import { HOOK } from './constants'
// import { getAllMethods } from './helpers/methods'
// import { sleep } from './helpers/time'
// import { Hooks } from './helpers/types.helper'

// @Reflect.metadata(Symbol('aaa'), 123)
// export class AA {
//   @Reflect.metadata('a', 'b')
//   fn(_zz: number) {}
// }

// console.log(Reflect.getMetadataKeys(AA))

// const proto = AA.prototype
// console.log({ proto })
// const keys = Object.getOwnPropertyNames(AA.prototype)
// console.log({ keys })
// const desc = Reflect.getOwnPropertyDescriptor(proto, 'fn')
// console.log({ desc })
// console.log('---------------')
// console.log(Reflect.getMetadataKeys(AA))
// console.log(Reflect.getMetadataKeys(proto.constructor))
// console.log(Reflect.getMetadataKeys(proto.fn))
// console.log(Reflect.getMetadataKeys(desc as any))
// console.log(Reflect.getMetadataKeys(desc?.value as any))
// console.log('----------------')
// console.log(Reflect.getMetadata('design:paramtypes', AA.prototype, 'fn'))

// export class AA {
//   @Reflect.metadata(HOOK, Hooks.BOOTSTRAP)
//   async test(a: number, b: string) {
//     await sleep(1000)
//     console.log({ a, b })
//   }
//   @Reflect.metadata(HOOK, Hooks.BOOTSTRAP)
//   async test2(a: Date, b: symbol) {
//     await sleep(1000)
//     console.log({ a, b })
//   }
// }
// const instance = new AA()
// const caller = new HookCaller(instance, {
//   getAll(tokens: any, parent?: any) {
//     return tokens.map((token: any) => ({ token, parent }))
//   },
// })

// caller.call(instance, Hooks.BOOTSTRAP, 'aaa')

// class ZZ extends AA {
//   qwerty = 'Tratata'
//   ddd() {}
// }

// console.log(getAllMethods(new ZZ()))

// class Proxer {
//   call(signal: string) {
//     console.log({ signal })
//   }

//   hook(hook: Hooks) {
//     console.log({ hook })
//   }

//   static proxy<T extends object>(instance: T): T {
//     const proxer = new Proxer()
//     return new Proxy(instance, {
//       get(target: T, name: string | symbol, receiver: any) {

//       },
//     })
//   }
// }

const arr = [1, 2, 3, 'f', 'g', 4, 5, 6, new Date(), 't', 7]
console.log(arr)
arr.sort((a, b) => (typeof a === typeof b ? 0 : typeof a === 'string' ? 1 : -1))
console.log(arr)
