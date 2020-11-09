import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';
import VueMeta from 'vue-meta';

Vue.use(VueMeta);
Vue.mixin({
  metaInfo: {
    titleTemplate: '%s - 快对作业'
  }
});

export function createApp(): { [k: string]: any } {
  const router = createRouter();
  const store = createStore();
  sync(store, router);
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return { app, router, store };
}
