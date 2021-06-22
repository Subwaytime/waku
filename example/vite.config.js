import { ViteAliases } from 'vite-aliases';
import vue from '@vitejs/plugin-vue';

const config = {
	plugins: [
		vue(),
		ViteAliases({
			useConfig: true,
			useTypescript: true,
			allowLogging: true,
			adjustDuplicates: true
		}),
	],
	server: {
		port: 8080,
	},
	logLevel: 'silent',
};

export default config;