import Theme from 'vitepress/theme'
import './style.css'
import './custom.css'
import { VueMountable } from 'vue-mountable';
import Default from './default.vue';
import { createPinia } from 'pinia';

export default {
  extends: Theme,
  Layout: Default,
  enhanceApp({ app, router, siteData }) {
    app.use(createPinia());
    app.use(VueMountable());
  }
}
