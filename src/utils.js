export function isFunction(obj) {
  return Object.prototype.toString.call(obj) === "[object Function]";
}

export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}