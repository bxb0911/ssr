/**
 * 获取数据类型
 * @param {*} value
 * @return {string} type [可选值：boolean|date|function|null|number|object|regexp|string|undefined]
 */
function type(value: unknown): string {
  const objectToString = Object.prototype.toString;
  const typeString = objectToString.call(value);
  return typeString.toLowerCase().slice(8, -1);
}

/**
 * 取图片平均像素
 */
function getAverageRGB(img: HTMLImageElement, imgEl: HTMLImageElement): unknown {
  const blockSize = 5; // only visit every 5 pixels
  const defaultRGB = { r: 0, g: 0, b: 0 }; // for non-supporting envs
  const canvas = document.createElement('canvas');
  const context = canvas.getContext && canvas.getContext('2d');
  let i = -4;
  let data;
  const rgb = { r: 0, g: 0, b: 0 };
  let count = 0;
  if (!context) {
    return defaultRGB;
  }
  const height = (canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height);
  const width = (canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width);
  context.drawImage(img, 0, 0);
  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    console.log(e)  // eslint-disable-line
    /* security error, img on diff domain */
    return defaultRGB;
  }
  const length = data.data.length;
  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }
  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);
  return rgb;
}

/**
 * 跨越浏览器限制自由编辑图片
 */
function getNoLimitImage(url: string): URL {
  return new URL(url.replace(/\.file\./, '.image.'));
}

function getParameterByName(name: string, url: string): string | null {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, '\\$&')  // eslint-disable-line
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * 使用腾讯云图片压缩服务
 * @param {string} url
 * @param {object} option 详情见 https://cloud.tencent.com/document/product/460/6929
 *  -> mode [可选值：1|2|3|4|5  缺省为3]
 *  -> w 宽  h 高
 *  -> format 图片格式[缺省为原图格式]
 *  -> q 图片质量[可选值0-100]
 *  -> rq 图片的相对质量[可选值0-100]
 *  -> lq 图片的最低质量[可选值0-100]
 */
function getSpecifiedImage(url: string, option: { [key: string]: any } = { mode: 3, w: 1000 }): string {  // eslint-disable-line
  if (typeof url !== 'string' || url.match(/:\/\/(kw1|kd01)-/) === null) {
    return url;
  }
  const optArr: any = []; // eslint-disable-line
  ['mode', 'w', 'h', 'format', 'q', 'rq', 'lq'].forEach(el => {
    /* eslint-disable no-prototype-builtins */
    if (option.hasOwnProperty(el)) {
      el !== 'mode' && optArr.push(el);
      optArr.push(option[el]);
    }
  });
  const imgUrl = new URL(url.replace(/\.file\./, '.image.'));
  const urlSearch = imgUrl.search;
  if (urlSearch.length > 0) {
    const paramArray = urlSearch
      .slice(1)
      .split('&')
      .map(param => {
        if (param.indexOf('=') === -1) {
          return `${param}|imageView2/${optArr.join('/')}`;
        } else {
          return param;
        }
      });
    return imgUrl.href.split('?')[0] + '?' + paramArray.join('&');
  } else {
    return imgUrl.href + `?imageView2/${optArr.join('/')}`;
  }
}

/**
 * 释放 iframe
 */
function releaseIFrame(): void {
  Array.prototype.forEach.call(document.querySelectorAll('iframe'), el => {
    const iframe = el.contentWindow;
    if (el) {
      el.src = 'about:blank';
      try {
        iframe.document.write('');
        iframe.document.clear();
      } catch (e) {
        console.log(e)  // eslint-disable-line
      }
      el.remove();
    }
  });
}

/**
 * 异步加载 JS
 * @param {string} url JS链接
 * @param {string} root JS暴露的全局变量
 * @param {function} cb 回调函数
 */
function asyncJSLoader(url: string, root: string, cb: () => void): void {
  const body = document.querySelector('body');
  const js = document.createElement('script');
  js.type = 'text/javascript';
  js.src = url;
  body && body.appendChild(js);
  if (window[root as any]) { // eslint-disable-line
    cb && cb();
  } else {
    const timer = setInterval(() => {
      if (window[root as any]) { // eslint-disable-line
        clearInterval(timer);
        cb && cb();
      }
    }, 100);
  }
}

/**
 * 判断是否是纯对象
 * @param {*} 待判断的数据
 * @param {boolean} 判断结果
 */
function isPlainObject(obj: unknown): boolean {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

/**
 * 合并对象规则同 jQuery
 * @param {target} 目标对象
 * @param {object} 待合并对象（可多个）
 * @return {boolean} 判断结果
 */
function extend(this: any, ...args: any[]) { // eslint-disable-line
  let src;
  let copyIsArray;
  let copy;
  let name;
  let options;
  let clone;
  let target = args[0] || {};
  let i = 1;
  const length = args.length;
  let deep = false;
  if (typeof target === 'boolean') {
    deep = target;
    target = args[1] || {};
    i = 2;
  }
  if (typeof target !== 'object' && type(target) !== 'function') {
    target = {};
  }
  if (length === i) {
    target = this;
    --i;
  }
  for (; i < length; i++) {
    if ((options = args[i]) !== null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (target === copy) {
          continue;
        }
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }
          target[name] = extend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}

/**
 * 判断是否是空对象
 * @param {*} 待判断的数据
 * @param {boolean} 判断结果
 */
function isEmptyObject(obj: { [key: string]: unknown }): boolean {
  let name;
  for (name in obj) {
    return false;
  }
  return true;
}

/**
 * 判断是否有值
 * @param {value} 待判断的数据
 * @param {boolean} 判断结果
 */
function isDef(value: unknown): boolean {
  return value !== undefined && value !== null;
}

/**
 * 判断是否是数字
 * @param {value} 待判断的数据
 * @param {boolean} 判断结果
 */
function isNumber(value: string) {
  return /^\d+(\.\d+)?$/.test(value);
}

/**
 * 转为样式单位
 * @param {value} 待转换的数据
 * @param {boolean} 转换结果
 */
function addUnit(value: string | number): string | number | undefined {
  if (!isDef(value)) {
    return undefined;
  }
  value = String(value);
  return isNumber(value) ? value + 'px' : value;
}

function isHidden(element: HTMLElement): boolean {
  return window.getComputedStyle(element).display === 'none' || element.offsetParent === null;
}

/**
 * 获取url的域名
 * @param {url} 待解析的域名
 * @param {string} 解析结果
 */
function getDomain(url = location.href): string | undefined {
  let result;
  let match;
  if ('port' in location && location.port !== '') {
    result = location.hostname;
  } else if (
    (match = url.match(
      /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im  // eslint-disable-line
    ))
  ) {
    result = match[1];
    if ((match = result.match(/^[^\.]+\.(.+\..+)$/))) {  // eslint-disable-line
      result = match[1];
    }
  }
  return result;
}

/**
 * 校验是否有xss攻击字符串
 * @param {string} 传入string
 * @param {boolean} 传出是否有非法字符串
 */
function validateXSS(str: string): unknown {
  return new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]").test(str);
}

/**
 * 解析?后的url参数
 * @param {string} 传入url
 * @param {object} 传出解析后的参数对象对象
 */
function parseUrl(url: string): { [key: string]: unknown } {
  if (url.indexOf('?') === -1) {
    return {};
  } else {
    const arr = url.split('?')[1].split('&');
    const obj: { [key: string]: unknown } = {};
    for (const i of arr) {
      obj[i.split('=')[0]] = i.split('=')[1];
    }
    return obj;
  }
}

export {
  type,
  extend,
  isDef,
  addUnit,
  parseUrl,
  isHidden,
  getDomain,
  validateXSS,
  isPlainObject,
  isEmptyObject,
  asyncJSLoader,
  releaseIFrame,
  getAverageRGB,
  getNoLimitImage,
  getSpecifiedImage,
  getParameterByName
};
