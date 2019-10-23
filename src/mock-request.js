import Mockjs from 'mockjs';
import pathToRegexp from 'path-to-regexp';
import { isFunction, isPlainObject } from "./utils"

class MockRequest {
  constructor() {
    this._routes = [];
  }

  define(...params) {
    if (params.length > 1) {
      this._routes.push({
        url: params[0],
        handler: params[1]
      });
      return;
    }
    this._routes.push(params[0]);
  }

  defineAll(routes) {
    routes.forEach(route => {
      this.define(route);
    });
  }

  req(reqURL) {
    const routes = this._findAll(reqURL);
    if (routes.length > 0) {
      const idx = routes.length - 1;
      const { url, handler } = routes[idx];
      if (isFunction(handler)) {
        const param = this.parse(url, reqURL);
        const query = this.getQueryObject(reqURL);
        return this.mock(handler.call(this, { param, query }));
      }
      if (isPlainObject(handler)) {
        return this.mock(handler);
      }
    }
    return null;
  }

  parse(routeURL, reqURL) {
    const keys = [];
    const regexp = pathToRegexp(routeURL, keys, {
      end: false
    });
    const lastIdx = reqURL.lastIndexOf('?');
    const url = lastIdx !== -1 ? reqURL.slice(0, lastIdx) : reqURL;
    const result = url.match(regexp);
    const names = keys.map(key => key.name);
    return names.reduce((memo, name, idx) => {
      memo[name] = result[idx + 1];
      return memo;
    }, {});
  }

  getQueryObject(url) {
    const lastIdx = url.lastIndexOf('?');
    const queryString = lastIdx !== -1 ? url.slice(lastIdx + 1) : "";
    if (queryString === "") return {};
    const queries = queryString.split('&');
    return queries.reduce((objs, query) => {
      const obj = query.split('=');
      objs[obj[0]] = typeof obj[1] !== "undefined" ? obj[1] : true;
      return objs;
    }, {});
  }

  mock(data) {
    return Mockjs.mock(data);
  }

  _findAll(url) {
    return this._routes.filter(route => {
      const keys = [];
      const regexp = pathToRegexp(route.url, keys, {
        end: false,
      });
      return regexp.test(url);
    });
  }

  routes() {
    return this._routes.map(route => {
      return route.url;
    });
  }
}

export default MockRequest;
