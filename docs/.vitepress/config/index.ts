import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Waku',
	description: 'Waku Documentation',
	appearance: 'dark',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Guide', link: '/guide/getting-started' },
			{ text: 'Features', link: '/features/mount' },
			{ text: 'API', link: '/api/' },
		],

		sidebar: [
			{
				text: 'Introduction',
				collapsed: false,
				items: [
					{ text: 'Getting started', link: '/guide/getting-started' },
					{
						text: 'Roadmap',
						link: 'https://github.com/subwaytime/waku/issues/10',
					},
				],
			},
			{
				text: 'Features',
				collapsed: false,
				items: [
					{
						text: 'Mount',
						link: '/features/mount',
					},
					{
						text: 'Unmount',
						link: '/features/unmount',
					},
				],
			},
			{
				text: 'API',
				link: '/api/',
			},
		],

		search: {
			provider: 'local',
		},

		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/subwaytime/waku',
			},
		],

		footer: {
			copyright: 'Copyright © 2021-PRESENT Leon Langer',
			message: 'Released under the MIT License.',
		},
	},
	markdown: {
		theme: {
			dark: 'vitesse-dark',
			light: 'vitesse-light',
		},
	},
	vue: {
		script: {
			propsDestructure: true,
		},
	},
});
