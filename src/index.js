const MockRequest = require('./../dist/mock-request.common');

const mr = new MockRequest();
// mr.defineAll([{
//     url: "/user", 
//     handler: {
//       "name|1-100": 100,
//       "isLogin|1": true
//     }
// }, {
//     url: "/b",
//     handler: {
//       'title': /[a-z][A-Z][0-9]/
//     }
//   }
// ])
// mr.define({
//   url: "/user/:uid/post/:pid",
//   handler: (ctx) => {
//     return ctx;
//   }
// })
// mr.define("/post/:id", (ctx) => {
//   console.log(ctx);
//   return {
//     'title': /[a-z][A-Z][0-9]/,
//     "age": 100
//   };
// });
// const ss = {
//   code: 100,
//   msg: "操作成功",
//   data: {}
// };
// mr.define("/post/:id", {
//   ...ss,
//   data: {
//     'title': /[a-z][A-Z][0-9]/,
//     "age": 100
//   }
// })
mr.define("/list", (ctx) => {
  return ctx
})
// console.log(mr.routes());
// console.log(mr.req('/post/32?q=2&m'));
// console.log(mr.req('/user/12/post/324'));
console.log(mr.req('/list?limit=10'));
