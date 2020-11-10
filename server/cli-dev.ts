// import path from 'path';
// import axios from 'axios';
// import webpack from 'webpack';
// import MemoryFS from 'memory-fs';
// import { BundleRenderer } from 'vue-server-renderer';
// // @ts-ignore next-line
// import webpackConfig from '@vue/cli-service/webpack.config';
// const resolve = file => path.resolve(__dirname, file);

// export function devServer(server: { use: (arg0: any) => void }, callback: (arg0: any, arg1: any, arg2: any) => void) {
//   let ready: (value?: unknown) => void;
//   const onReady = new Promise(r => (ready = r));

//   // eslint-disable-next-line @typescript-eslint/ban-types
//   let template: string, serverBundle: BundleRenderer, clientManifest: object;
//   const update = () => {
//     if (template && serverBundle && clientManifest) {
//       ready();
//       callback(template, serverBundle, clientManifest);
//     }
//   };

//   // 监听 serverBundle -> 调用 update -> 更新 Renderer
//   const serverCompiler = webpack(webpackConfig);
//   const mfs = new MemoryFS();
//   serverCompiler.outputFileSystem = mfs;

//   // ServerBundle
//   let bundle;
//   serverCompiler.watch({}, async (err, stats) => {
//     if (err) {
//       throw err;
//     }
//     stats = stats.toJson();
//     stats.errors.forEach(error => console.log(error));
//     stats.hasWarnings.forEach(warning => console.warn(warning));
//     const bundlePath = path.join(webpackConfig.output.path, 'vue-ssr-server-bundle.json');
//     bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
//     const clientManifestResponse = await axios.get('http://localhost:8080/vue-ssr-client-manifest.json');
//     const clientManifest = clientManifestResponse.data;
//     update();
//   });
// }
