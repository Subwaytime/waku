import type { App } from "vue";
import { type Waku, type WakuItem, setActiveWaku } from "./core";
import { MODULE_NAME, WakuSymbol } from "./constants";

export function createWaku() {
	// biome-ignore lint/suspicious/noImplicitAnyLet:
	let instance;

	const waku: Waku = {
		id: `${MODULE_NAME}-plugin`,
		instance,
		items: [],
		install: (app: App) => {
			setActiveWaku(waku);
			app.provide(WakuSymbol, waku);
			app.config.globalProperties.$waku = waku;
			waku.instance = app;
		},
		addItem(item: WakuItem) {
			if (waku.getItem(item.id)) {
				return;
			}

			waku.items?.push(item);
			waku.instance?._container.appendChild(item.el);
		},
		getItem(id: string) {
			const item = waku.items?.find((i) => i.id === id);

			if (!item) {
				return false;
			}
			return item;
		},
		removeItem(id: string) {
			waku.items = waku.items?.filter((i) => i.id !== id);
		},
	};

	return waku;
}
