const path = require('path');
const chalk = require('chalk');
const apiMocker = require('mocker-api');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');
const isServer = process.env.VUE_ENV === 'server';
const isProd = process.env.NODE_ENV === 'production';
const proxyEnv = process.env.VUE_APP_PROXY_ENV;
const resolve = file => path.resolve(__dirname, file);
const output = (title, cnt) => {
  console.log(chalk.bgBlue.black(` ${title} `), chalk.blue(cnt), '\n');
};

const getDevServer = () => {
  let result = {};
  if (isProd) return {};
  if (proxyEnv) {
    const host = 'http://' + proxyEnv;
    result = {
      proxy: {
        '/api': {
          target: host,
          secure: false,
          changeOrigin: true,
          pathRewrite: { '^/api': '/' }
        }
      }
    };
    output('本地代理模式', host);
  } else {
    result = {
      before(app) {
        apiMocker(app, resolve('./scripts/mocker.js'));
      }
    };
    output('本地mock模式', '数据源来自 src/test 文件夹');
  }
  return result;
};

module.exports = {
  css: {
    extract: !isServer
  },
  devServer: getDevServer(),
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('./src'));

    config.resolve.extensions
      .add('.ts')
      .add('.tsx')
      .add('.vue')
      .add('.json');

    if (isServer) {
      config.optimization.delete('splitChunks');
    } else {
      config.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              commons: {
                test: module => /node_modules/.test(module.context) && !/\.css$/.test(module.request),
                name: 'vendors',
                chunks: 'all'
              }
            }
          },
          runtimeChunk: {
            name: 'manifest'
          }
        }
      });
    }
  },
  configureWebpack() {
    const clientConfig = {
      entry: {
        app: './src/entry-client.ts'
      },
      plugins: [new VueSSRClientPlugin()]
    };
    const serverConfig = {
      entry: './src/entry-server.ts',
      target: 'node',
      output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
      },
      externals: [
        nodeExternals({
          allowlist: [/\.(css|less)$/]
        })
      ],
      plugins: [new VueSSRServerPlugin()]
    };
    return {
      devtool: isProd ? false : 'cheap-module-eval-source-map',
      ...(isServer ? serverConfig : clientConfig)
    };
  }
};
