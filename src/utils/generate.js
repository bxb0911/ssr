import md5 from './md5';

class GenerateCls {
  constructor(config) {
    this.ftime = null;
    this.fkey = null;
    this._init(config || {});
  }

  _init(...args) {
    const timestamp = args.timestamp || parseInt(new Date().getTime() / 1000);
    const rn = parseInt(Math.random() * 100);
    const ftime = timestamp + rn;
    // 把时间转成字符串放到参数数组里，对键key进行升序排序，
    args[0].ftime = JSON.stringify(ftime);
    const array = Object.keys(args[0]);
    array.sort(function(a, b) {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });
    // 根据排好的键，把其值进行连接
    let key = '';
    array.forEach(function(value) {
      key = key + args[0][value];
    });
    key += 'fvcGpPMBk2eu032a';
    // 进行加密转
    this.ftime = ftime;
    const key1 = md5(key);
    this.fkey = key1;
  }
}
export default GenerateCls;
