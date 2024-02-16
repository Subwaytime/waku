import Theme from 'vitepress/theme'
import './style.css'
import './custom.css'
import { VueMountable } from '../../../dist/index';
import Default from './default.vue';
import { createPinia } from 'pinia';

export default {
  extends: Theme,
  Layout: Default,
  enhanceApp({ app }) {
    app.use(createPinia());
    app.use(VueMountable());
  }
}
