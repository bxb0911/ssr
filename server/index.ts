import fs from 'fs';
import path from 'path';
import Koa, { Context } from 'koa';
import serve from 'koa-static';
import LRU from 'lru-cache';
import compress from 'koa-compress';
import { BundleRenderer, createBundleRenderer } from 'vue-server-renderer';
const template = fs.readFileSync('../public/index.template.html', 'utf-8');
import serverBundle from '../dist/vue-ssr-server-bundle.json';
import clientManifest from '../dist/vue-ssr-client-manifest.json';
// import { devServer } from './dev';
const resolve = (file: string) => path.resolve(__dirname, file);
const isProd = process.env.NODE_ENV === 'production';
const app = new Koa();
// eslint-disable-next-line @typescript-eslint/ban-types
const getRenderer = (template: string, serverBundle: string | object, clientManifest: object) => {
  return createBundleRenderer(serverBundle, {
    cache: new LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    runInNewContext: false,
    basedir: resolve('../dist'),
    template,
    clientManifest
  });
};

let renderer: BundleRenderer;
// let onReady: Promise<unknown>;

if (isProd) {
  renderer = getRenderer(template, serverBundle, clientManifest);
} else {
  // onReady = devServer(app, (template, serverBundle, clientManifest) => {
  renderer = getRenderer(template, serverBundle, clientManifest);
  // });
}

const render = async (ctx: Context) => {
  try {
    const html = await renderer.renderToString({
      title: '哈哈哈',
      meta: `<meta name="description" content="茂茂">`,
      url: ctx.request.url
    });
    console.log(ctx.request.url);
    ctx.set('Content-Type', 'text/html; charset=utf8');
    ctx.body = html;
  } catch (err) {
    console.log(err);
  }
};

app.use(compress({ threshold: 0 }));

app.use(serve(resolve('../dist/'), { index: false }));

app.use(
  // isProd ?
  render
  // : async ctx => {
  //     await onReady;
  //     render(ctx);
  //   }
);

app.listen(7000, () => {
  console.log(`[${process.pid}] running on 7000`);
});
