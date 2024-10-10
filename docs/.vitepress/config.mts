import { defineConfig } from "vitepress";
import VueDevTools from "vite-plugin-vue-devtools";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Vue Mountable",
	description: "Vue Mountable Documentation",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "Guide", link: "/guide/getting-started" },
			{ text: "Features", link: "/features/mount" },
			{ text: "API", link: "/api/" },
			{ text: "Examples", link: "/examples/" },
		],

		sidebar: [
			{
				text: "Introduction",
				collapsed: false,
				items: [
					{ text: "Getting started", link: "/guide/getting-started" },
					{
						text: "Roadmap",
						link: "https://github.com/Subwaytime/vue-mountable/issues/10",
					},
				],
			},
			{
				text: "Features",
				collapsed: false,
				items: [
					{
						text: "Mount",
						link: "/features/mount",
					},
					{
						text: "Unmount",
						link: "/features/unmount",
					},
				],
			},
			{
				text: "API",
				link: "/api/",
			},
			{
				text: "Examples",
				link: "/examples/",
			},
		],

		search: {
			provider: "local",
		},

		socialLinks: [
			{ icon: "github", link: "https://github.com/Subwaytime/vue-mountable" },
		],
	},
	vite: {
		plugins: [VueDevTools()],
	},
	vue: {
		script: {
			propsDestructure: true,
		},
	},
});
