import { createApp } from 'vue';
import { VueMountable } from '/home/subway/work/vue-mountable/src/index';
import App from './app.vue';
import { createPinia } from 'pinia';

const instance = createApp(App);
instance.use(createPinia());
instance.use(VueMountable());
instance.mount('#app');
