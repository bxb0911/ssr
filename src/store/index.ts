import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export function createStore(): Store<Record<string, unknown>> {
  return new Vuex.Store({
    state: {
      list: {},
      detail: {},
      isSupport: true
    },
    actions,
    mutations,
    getters
  });
}
