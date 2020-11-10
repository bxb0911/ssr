import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import chokidar from 'chokidar';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
// @ts-ignore next-line
import clientConfig from '../.config/client.config.js';
// @ts-ignore next-line
import serverConfig from '../.config/server.config.js';
import { BundleRenderer } from 'vue-server-renderer';
const resolve = (file: string) => path.resolve(__dirname, file);

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
  // eslint-disable-next-line
  const serverCompiler = webpack(serverConfig as any);
  const serverDevMiddleware = devMiddleware(serverCompiler, {
    logLevel: 'silent'
  });
  serverCompiler.hooks.done.tap('server', () => {
    serverBundle = JSON.parse(
      serverDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
    );
    update();
  });

  // 监听 clientManifest -> 调用 update -> 更新 Renderer
  // eslint-disable-next-line
  const clientCompiler = webpack(clientConfig as any);
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  clientConfig.entry.app = ['webpack-hot-middleware/client?quiet=true&reload=true', clientConfig.entry.app] as any;
  clientConfig.output.filename = '[name].js';
  const clientDevMiddleware = devMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    logLevel: 'silent'
  });
  clientCompiler.hooks.done.tap('client', () => {
    clientManifest = JSON.parse(
      clientDevMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-client-manifest.json'), 'utf-8')
    );
    update();
  });

  server.use(
    hotMiddleware(clientCompiler, {
      log: false
    })
  );
  server.use(clientDevMiddleware);
  return onReady;
}
