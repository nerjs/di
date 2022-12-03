import 'reflect-metadata'

@Reflect.metadata(Symbol('aaa'), 123)
export class AA {
  @Reflect.metadata('a', 'b')
  fn(_zz: number) {}
}

console.log(Reflect.getMetadataKeys(AA))

// const proto = AA.prototype
// console.log({ proto })
// const keys = Object.getOwnPropertyNames(proto)
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
