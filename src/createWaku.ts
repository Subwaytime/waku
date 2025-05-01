import { type App, DefineComponent, Fragment, h, reactive } from 'vue';
import { type Waku, type WakuItem, type WakuEvents, WakuEventsEnum, setActiveWaku } from './core';
import { MODULE_NAME, WakuSymbol } from './constants';
import WakuMount from './mount.vue';
import mitt from 'mitt';

export function createWaku(): Waku {
	// biome-ignore lint/suspicious/noImplicitAnyLet:
	let instance;

	const waku: Waku = {
		id: `${MODULE_NAME}-plugin`,
		instance,
		items: reactive([]),
		internal: mitt<WakuEvents>(),
		install: (app: App) => {
			setActiveWaku(waku);
			app.provide(WakuSymbol, waku);
			app.config.globalProperties.$waku = waku;
			waku.instance = app;

			const rootComponent = app._component as DefineComponent;
			const originalRender = rootComponent.render;
			rootComponent.render = function (...args: any) {
				const root = originalRender?.apply(this, args);
				return h(Fragment, null, [
					h(root),
					h(WakuMount)
				]);
			};
		},
		addItem(item: WakuItem) {
			if (waku.getItem(item.id)) {
				return;
			}

			waku.items?.push(item);
			waku.internal.emit(WakuEventsEnum.ITEM_ADDED, item.id);
		},
		removeItem(id: string) {
			waku.items = waku.items?.filter((i) => i.id !== id);
			waku.internal.emit(WakuEventsEnum.ITEM_REMOVED, id);
		},
		getItem(id: string) {
			const item = waku.items?.find((i) => i.id === id);

			if (!item) {
				return false;
			}
			return item;
		}
	};

	return waku;
}
