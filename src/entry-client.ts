import { createApp } from './main'

const { app, router, store } = createApp();
if (window.__INITIAL_STATE__) {
    // init the store state with the data injected from the server
    // eslint-disable-next-line no-underscore-dangle
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    app.$mount('#app')
});
