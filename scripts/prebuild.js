const fs = require('fs');
const path = require('path');
const envList = require('../config/env.json');
const localEnvFile = path.join(process.cwd(), '.env.local');
const argv = process.argv.slice(2);

if (argv.length && argv[0]) {
  fs.writeFileSync(localEnvFile, `VUE_APP_PROXY_ENV=${envList[argv[0]]}`);
} else {
  fs.existsSync(localEnvFile) && fs.unlinkSync(localEnvFile);
}
