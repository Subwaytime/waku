import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';

const iconResolver = IconsResolver({
	componentPrefix: 'icon',
	enabledCollections: ['ph']
});

/* eslint import/no-default-export: 'off' */
export default defineConfig({
	server: {
		port: 8080
	},
	plugins: [
		Vue({
			include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
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
			globalNamespaces: ['global'],
      resolvers: [
				iconResolver
			]
		}),
		ViteAliases({
			prefix: '~',
      ovrConfig: true
		}),
    Icons({
			scale: 1,
			compiler: 'vue3'
		}),
	]
});
