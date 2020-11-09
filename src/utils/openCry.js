import CryptoJS from './crypto-js';
import md5 from './md5';

function getNowFormatDate() {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  const currentdate = String(year) + String(month) + String(strDate);
  return currentdate;
}

function getAesKey() {
  const key = 'fvcGpPMBk2eu032a';
  const str = key + getNowFormatDate();
  return md5(str).slice(0, 16);
}

export const openCry = function(message) {
  const AesKey = getAesKey(); // 加密时用的key,跟php一样
  const ECBOptions = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  };
  const key = CryptoJS.enc.Utf8.parse(AesKey);
  const bytes = CryptoJS.AES.decrypt(message, key, ECBOptions);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(originalText);
};
