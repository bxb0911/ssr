import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import chokidar from 'chokidar';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
// @ts-ignore next-line
import webpackConfig from '../node_modules/@vue/cli-service/webpack.config';
import { BundleRenderer } from 'vue-server-renderer';
const resolve = (file: string) => path.resolve(__dirname, file);
const compiler = webpack(webpackConfig);

// eslint-disable-next-line
export function devServer(server: { use: (arg0: any) => void }, callback: (arg0: any, arg1: any, arg2: any) => void) {
  let ready: (value?: unknown) => void;
  const onReady = new Promise(r => (ready = r));

  // eslint-disable-next-line @typescript-eslint/ban-types
  let template: string, serverBundle: BundleRenderer, clientManifest: object;
  const update = () => {
    if (template && serverBundle && clientManifest) {
      ready();
      callback(template, serverBundle, clientManifest);
    }
  };

  // 监听构建 template -> 调用 update -> 更新 Renderer
  const templatePath = resolve('../public/index.template.html');
  update();
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8');
    console.log('Template updated');
    update();
  });

  // 监听 serverBundle -> 调用 update -> 更新 Renderer
  const serverDevMiddleware = devMiddleware(compiler, {
    logLevel: 'silent'
  });
  compiler.hooks.done.tap('server', () => {
    serverBundle = JSON.parse(
      serverDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
    );
    update();
  });

  // 监听 clientManifest -> 调用 update -> 更新 Renderer
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  webpackConfig.entry.app = ['webpack-hot-middleware/client?quiet=true&reload=true', webpackConfig.entry.app];
  webpackConfig.output.filename = '[name].js';
  const clientDevMiddleware = devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    logLevel: 'silent'
  });
  compiler.hooks.done.tap('client', () => {
    clientManifest = JSON.parse(
      clientDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-client-manifest.json'), 'utf-8')
    );
    update();
  });

  server.use(
    hotMiddleware(compiler, {
      log: false
    })
  );
  server.use(clientDevMiddleware);
  return onReady;
}
