const MockRequest = require('./dist/mock-request.common');

const mr = new MockRequest();

test('路径数量', () => {
  mr.define('/a', {})
  mr.define('/b', {})
  expect(mr.routes().length).toBe(2);
})
test('获取接收query参数', () => {
  mr.define('/list', (ctx) => {
    return ctx
  })
  expect(JSON.stringify(mr.req('/list/?limit=10'))).toBe(JSON.stringify({
    param: {},
    query: {
      limit: '10'
    }
  }))

})
test('获取接收param参数', () => {
  mr.define('/user/:uid/post/:pid', (ctx) => {
    return ctx
  })
  expect(JSON.stringify(mr.req('/user/10/post/20'))).toBe(JSON.stringify({
    param: {
      uid: '10',
      pid: '20'
    },
    query: {}
  }))
})

test('[两个参数]函数方式返回数据', () => {
  mr.define('/user/:uid/post/:pid', (ctx) => {
    return ctx
  })
  expect(JSON.stringify(mr.req('/user/10/post/20'))).toBe(JSON.stringify({
    param: {
      uid: '10',
      pid: '20'
    },
    query: {}
  }))

})

test('[两个参数]直接返回数据', () => {
  mr.define('/user/:uid/post/:pid', {
    uid: '10',
    pid: '20'
  })
  expect(JSON.stringify(mr.req('/user/10/post/20'))).toBe(JSON.stringify({
    uid: '10',
    pid: '20'
  }))
})

test('[一个参数]函数返回数据', () => {
  mr.define({
    url: "/a",
    handler: () => {
      return {a: 1, b: 2};
    }
  })
  expect(JSON.stringify(mr.req('/a'))).toBe(JSON.stringify({
    a: 1,
    b: 2
  }))
})

test('[一个参数]直接返回数据', () => {
  mr.define({
    url: "/a",
    handler: {
      a: 3,
      b: 4
    }
  })
  expect(JSON.stringify(mr.req('/a'))).toBe(JSON.stringify({
    a: 3,
    b: 4
  }))
})