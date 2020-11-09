import { extend, type, isEmptyObject, isPlainObject } from '@/utils/common';

const urlExt = {
  queryToJson(url: string, shouldDecode?: boolean): { [key: string]: any } { // eslint-disable-line
    url = (url || window.location.href.replace(window.location.hash, '')) + '';
    shouldDecode = typeof shouldDecode === 'boolean' ? shouldDecode : true;
    const qJson: { [key: string]: any } = {}; // eslint-disable-line
    const qList = url.substr(url.lastIndexOf('?') + 1).split('&');
    function getQueryValue(val: string) {
      let _val = val;
      if (shouldDecode) {
        try {
          _val = decodeURIComponent(val);
        } catch (ex) {}  // eslint-disable-line
      }
      return _val;
    }
    for (let i = 0; i < qList.length; ++i) {
      if (qList[i]) {
        const _query = qList[i].split('=');
        if (_query.length > 1) {
          const _key = _query[0];
          const _val = _query[1];
          if (qJson[_key] === undefined) {
            qJson[_key] = getQueryValue(_val);
          } else {
            if (!Array.isArray(qJson[_key])) {
              qJson[_key] = [qJson[_key]];
            }
            qJson[_key].push(getQueryValue(_val));
          }
        }
      }
    }
    return qJson;
  },
  jsonToQuery(json: { [key: string]: unknown }, shouldEncode: boolean): unknown {
    shouldEncode = typeof shouldEncode === 'boolean' ? shouldEncode : true;
    function getQuery(key: string, val: any) { // eslint-disable-line
      let _query;
      switch (type(val)) {
        case 'boolean':
        case 'number':
        case 'string':
          _query = key + '=' + (shouldEncode ? encodeURIComponent(val) : val);
          break;
        case 'regexp':
          _query = key + '=' + (shouldEncode ? encodeURIComponent(val.source) : val.source);
          break;
        case 'date':
          _query = key + '=' + val.getTime();
          break;
        case 'array':
          _query = [];
          for (let i = 0; i < val.length; ++i) {
            if (/^boolean|number|string|regexp|date$/.test(type(val[i]))) {
              _query.push(arguments.callee(key, val[i]))  // eslint-disable-line
            }
          }
          break;
        default:
          _query = undefined;
      }
      return _query;
    }
    let queries: string[] = [];
    if (type(json) === 'object' && isPlainObject(json)) {
      Object.keys(json).forEach(key => {
        const query = getQuery(key, json[key]);
        query && (queries = queries.concat(query));
      });
    }
    return queries.join('&');
  },
  getQuery(qName: string, url?: string): string {
    qName = qName ? qName + '' : '';
    url = url || window.location.href.replace(window.location.hash, '');
    const curQueries = urlExt.queryToJson(url, false);
    return qName  // eslint-disable-line
      ? curQueries[qName] || ''
      : isEmptyObject(curQueries)
      ? ''
      : curQueries;
  },
  setQuery(qNameOrQueries: string, qValueOrUrl: string, url: string): string {
    let newQuery = '';
    if (qNameOrQueries) {
      let queries: any = {}; // eslint-disable-line
      let hash = '';
      switch (type(qNameOrQueries)) {
        case 'string':
        case 'number':
          url = (url || window.location.href) + '';
          (qNameOrQueries += '') && (queries[qNameOrQueries] = qValueOrUrl);
          break;
        case 'object':
          url = (qValueOrUrl || window.location.href) + '';
          queries = qNameOrQueries;
          break;
        default:
      }
      if (/(#.+)$/i.test(url)) {
        hash = RegExp.$1;
        url = url.replace(hash, '');
      }
      const curQueries = urlExt.queryToJson(url, false);
      extend(curQueries, queries);
      Object.keys(queries).forEach(key => {
        if (queries[key] === undefined) {
          delete curQueries[key];
        }
      });
      newQuery = urlExt.jsonToQuery(curQueries, false) + hash;
    }
    return newQuery;
  }
};

export default urlExt;
