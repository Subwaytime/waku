import Theme from 'vitepress/theme';
import './style.css';
import './custom.css';
import { createWaku } from '@subwaytime/waku';
import Default from './default.vue';
import { createPinia } from 'pinia';

export default {
	extends: Theme,
	Layout: Default,
	enhanceApp({ app }) {
		app.use(createPinia());
		app.use(createWaku());
	},
};
