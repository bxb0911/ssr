import browser from '@/utils/browser';
import urlExt from '@/utils/url';
import { extend, isEmptyObject, isPlainObject } from '@/utils/common';

const commonData = {};
const inApp = /scancode/i.test(navigator.userAgent);
const uaExt = {
  _isKeyValid(key: string) {
    return /scancode/i.test(navigator.userAgent) && new RegExp('scancode_').test(key);
  },
  getRaw(key: string) {
    if (uaExt._isKeyValid(key)) {
      return null;
    }
    const reg = new RegExp('scancode_' + key + '/([^\\s]*)');
    const result = reg.exec(navigator.userAgent);
    return (result && result[1]) || null;
  },
  get(key: string) {
    const value = uaExt.getRaw(key);
    return value ? decodeURIComponent(value) : null;
  }
};
const _naData = !inApp
  ? {}
  : {
      i: uaExt.get('cuid'),
      vc: uaExt.get('vc'),
      av: uaExt.get('vcname'),
      c: uaExt.get('channel')
    };
const _isPrimitive = (arg: unknown) => {
  const type = typeof arg;
  return arg != null && type !== 'object' && type !== 'function';
};
const logger = {
  send(data: { [index: string]: any }, name?: string) {  // eslint-disable-line
    if (data && isPlainObject(data) && !isEmptyObject(data)) {
      if (!_isPrimitive(name) && !_isPrimitive(data.name)) {
        throw Error('name is invalid, please check');
      }
      new Image().src =
        'https://log.kuaiduizuoye.com/log/notice.gif?' +
        urlExt.jsonToQuery(
          extend(
            {
              pid: 1,
              name: data.name || name,
              page: document.documentElement.getAttribute('page'),
              url: location.origin + location.pathname,
              os: browser.os(),
              browser: browser.kernel(),
              elapse: window.logger_pageStartTime ? Number(new Date()) - window.logger_pageStartTime : 0,
              screen: (screen.width || 0) + '_' + (screen.height || 0),
              type: 'custom',
              refer: document.referrer
            },
            commonData,
            _naData,
            data
          ),
          true
        );
    }
  }
};

export const $logger = logger;

export default logger;
