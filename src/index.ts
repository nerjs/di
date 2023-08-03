import 'reflect-metadata'

@Reflect.metadata('a', 'b')
export class A<V extends number> {
  constructor(readonly f: V, readonly a: string, readonly b?: number, readonly c?: 'ff' | number) {}
}
