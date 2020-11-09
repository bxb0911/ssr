import { createApp } from './main';

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  // 这里假定 App.vue 模板中根元素具有 `id="app"`
  app.$mount('#app');
});
