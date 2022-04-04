import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';

export default defineConfig({
	server: {
		port: 8080,
	},
	plugins: [
		Vue({
			include: [/\.vue$/, /\.md$/],
		}),
		AutoImport({
			include: [/\.vue$/],
			imports: ['vue'],
		}),
		ViteAliases({
			useConfig: true,
		}),
	],
});
