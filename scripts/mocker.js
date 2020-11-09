const fs = require('fs');
const glob = require('glob');
const apiFile = require(`../src/api/api.json`);
const mockData = glob.sync('src/test/*.json');

const proxy = {};
mockData.forEach(curDataFile => {
  const apiNameMatched = /src\/test\/([^.]+)/.exec(curDataFile);
  const apiName = apiNameMatched !== null ? apiNameMatched[1] : '';
  const apiCnt = JSON.parse(fs.readFileSync(curDataFile));
  const data = apiCnt.data;
  const method = apiCnt.method;
  const path = apiFile[apiName];
  path &&
    (proxy[`${method.toUpperCase()} /api${path}`] = (req, res) => {
      const json = { errNo: 0, errstr: 'success', data };
      return res.json(json);
    });
});

module.exports = proxy;
