export const isISBN = function(str) {
  // 是否满足13位数字
  const reg1 = /\d{13}/g;

  // 978 中国大陆
  // 978962 中国香港
  // 97899937, 97899965 中国澳门
  // 97857, 978986 中国台湾
  const reg2 = /^(9787|978962|97899937|97899965|978957|978086)\d*/g;

  if (!reg1.test(str)) {
    return false;
  }
  if (!reg2.test(str)) {
    return false;
  }

  if (!checkISBN(str)) {
    return false;
  }

  return true;
};

function checkISBN(str) {
  let total = 0;
  const arr = str.split('');
  for (let i = 0; i < 12; i++) {
    const num = +arr[i];
    if (i % 2 === 0) {
      total += num;
    } else {
      total += num * 3;
    }
  }
  const lastNum = +arr[arr.length - 1];
  return (total + lastNum) % 10 === 0;
}
