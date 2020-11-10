import axios from 'axios';
import qs from 'qs';
import { openCry } from '@/utils/openCry';
import Generate from '@/utils/generate';
// import { getCuid } from '@/utils/utils';
const isProd = process.env.NODE_ENV === 'production';

interface RequestOptions {
  headers?: { [key: string]: unknown };
  method: any; // eslint-disable-line
  url: string;
  params?: { [key: string]: unknown };
  data?: string | FormData;
}

interface ResponseOptions {
  errNo: number;
  errstr: string;
  data: { [key: string]: unknown };
}

/**
 * axios 默认配置
 */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    return Promise.reject(error.response);
  }
);

/**
 * 响应处理
 */
function responseHandler(response: ResponseOptions) {
  const { errNo } = response;
  if (typeof errNo !== 'undefined') {
    switch (Number(errNo)) {
      case 0:
        response.data = isProd ? openCry(response.data) : response.data;
        return response;
      case 3:
      case 13:
        console.log('未登录'); //  eslint-disable-line
        return Promise.reject(response); //  eslint-disable-line
      default:
        return Promise.reject(response); //  eslint-disable-line
    }
  }
}

async function request(
  type: unknown,
  url: string,
  params: { [index: string]: string | number | Blob | null },
  options?: { [index: string]: string | number | boolean | { [key: string]: unknown } }
) {
  // const base: RequestOptions = { method: type, url: !isProd ? '/api' + url : url };
  const base: RequestOptions = { method: type, url: 'http://yapi.zuoyebang.cc/mock/3055' + url };
  // 添加 params 参数
  params.aes = +isProd;
  // params.cuid = getCuid();
  params = {
    ...params,
    ...new Generate(params)
  };
  type === 'get' && (base.params = params);
  type === 'post' && (base.data = qs.stringify(params));
  if (type === 'form') {
    const formData = new FormData();
    Object.keys(params).forEach(el => {
      formData.append(el, params[el] + '');
    });
    base.method = 'post';
    base.data = formData;
    base.headers = { 'content-type': 'multipart/form-data' };
  }
  try {
    const response = await axios(Object.assign(base, options));
    return responseHandler(response.data);
  } catch (error) {
    console.log('未知错误', error); //  eslint-disable-line
    return Promise.reject(new Error('请求失败'));
  }
}

/**
 * http 封装（目前仅支持get/post/form）
 */
function http(
  type: string
): (
  url: string,
  params?: { [index: string]: string | number | Blob },
  options?: { [index: string]: string | number | boolean | { [key: string]: unknown } }
) => Promise<ResponseOptions | undefined> {
  return async function(
    url: string,
    params?: { [index: string]: string | number | Blob },
    options?: { [index: string]: string | number | boolean | { [key: string]: unknown } }
  ) {
    return request(type, url, params || {}, options);
  };
}

export const $ajax = axios;

export const $get = http('get');

export const $post = http('post');

export const $form = http('form');
