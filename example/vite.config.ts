import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
import Components from 'unplugin-vue-components/vite';

/* eslint import/no-default-export: 'off' */
export default defineConfig({
	server: {
		port: 8080
	},
	plugins: [
		Vue({
			include: [/\.vue$/, /\.md$/]
		}),
		AutoImport({
			include: [/\.vue$/],
			imports: ['vue']
		}),
		Components({
			dirs: [
				'src/components',
				'src/partials'
			],
			dts: true,
			directoryAsNamespace: true,
			globalNamespaces: ['global']
		}),
		ViteAliases({
			useConfig: true,
			prefix: '~'
		})
	]
});
