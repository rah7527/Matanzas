import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { registerSW } from 'virtual:pwa-register';
import App from './App.vue';
import router from './router';

// Register PWA service worker with automatic updates
registerSW({ immediate: true });

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
