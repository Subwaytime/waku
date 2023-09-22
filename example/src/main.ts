import { createApp } from 'vue';
import { VueMountable } from '../../dist/index';
import App from './app.vue';
import { createPinia } from 'pinia';

const instance = createApp(App);
instance.use(createPinia());
instance.use(VueMountable());
instance.mount('#app');
