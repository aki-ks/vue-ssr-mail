import { sync } from 'vuex-router-sync'
import Vue from 'vue'
import { createRouter } from './router'
import { createStore } from './store'

Vue.config.productionTip = false;

export interface SSRContext {
  url: string,
  data: object
}

export function createApp(context?: SSRContext) {
  const router = createRouter();
  const store = createStore();

  // sync so route state is available as part of the store.
  sync(store, router);

  const app = new Vue({
    data: { url: context ? context.url : '' },
    router,
    store,
    provide: function () {
      return {
        data: context ? context.data : {}
      }
    },
    render: h => h('RouterView')
  });

  return { app, router, store }
}
