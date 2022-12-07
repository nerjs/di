import { listMethodsOf, listPropertiesOf } from '../object'

describe('helpers for objects', () => {
  class A {
    field1 = 1
    method1() {}
    method2() {}
  }

  class B extends A {
    field2 = 2
    method3() {}
  }
  it('prototype properties', () => {
    expect(listPropertiesOf(A.prototype)).toEqual(expect.arrayContaining(['method1', 'method2']))
    expect(listPropertiesOf(B.prototype)).toEqual(expect.arrayContaining(['method1', 'method2', 'method3']))
    expect(listPropertiesOf(A.prototype).length).toEqual(2)
    expect(listPropertiesOf(B.prototype).length).toEqual(3)
  })

  it('instance properties', () => {
    expect(listPropertiesOf(new A())).toEqual(expect.arrayContaining(['field1', 'method1', 'method2']))
    expect(listPropertiesOf(new B())).toEqual(expect.arrayContaining(['field1', 'field2', 'method1', 'method2', 'method3']))
    expect(listPropertiesOf({ field: 1 })).toEqual(expect.arrayContaining(['field']))
    expect(listPropertiesOf(new A()).length).toEqual(3)
    expect(listPropertiesOf(new B()).length).toEqual(5)
    expect(listPropertiesOf({ field: 1 }).length).toEqual(1)
  })

  it('only methods', () => {
    expect(listMethodsOf(new A())).toEqual(expect.arrayContaining(['method1', 'method2']))
    expect(listMethodsOf(new B())).toEqual(expect.arrayContaining(['method1', 'method2', 'method3']))
    expect(listMethodsOf(new A()).length).toEqual(2)
    expect(listMethodsOf(new B()).length).toEqual(3)
  })

  it('no object', () => {
    expect(listPropertiesOf(1)).toEqual([])
    expect(listPropertiesOf(1).length).toEqual(0)
  })

  it('extends null', () => {
    const obj: any = Object.create(null)
    obj.field = 1
    expect(listPropertiesOf(null)).toEqual([])
    expect(listPropertiesOf(obj)).toEqual(['field'])
  })
})
