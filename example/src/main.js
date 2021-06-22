import App from './app.vue';
import { createApp } from 'vue';

import { VueMountable } from '../../src/index';

const instance = createApp(App);
instance.use(VueMountable);
instance.mount('#app');
