import mitt from 'mitt';
import { type App, reactive } from 'vue';
import { type Waku, type WakuPlugin, type WakuItem, type WakuEvents, WakuEventsEnum, setActiveWaku } from './core';
import { MODULE_NAME, WakuSymbol } from './constants';
import WakuMountPoint from './mountPoint.vue';

export function createWaku(): WakuPlugin {
	// biome-ignore lint/suspicious/noImplicitAnyLet:
	let instance;

	const waku: Waku = {
		id: `${MODULE_NAME}-plugin`,
		instance,
		items: reactive([]),
		internal: mitt<WakuEvents>(),
		install(app: App) {
			setActiveWaku(waku);
			app.provide(WakuSymbol, waku);
			app.config.globalProperties.$waku = waku;
			waku.instance = app;
			app.component('WakuMountPoint', WakuMountPoint);
		},
		addItem(item: WakuItem) {
			if (waku.getItem(item.id)) {
				return;
			}

			waku.items?.push(item);
			waku.internal.emit(WakuEventsEnum.ITEM_ADDED, item.id);
		},
		removeItem(id: string) {
			const index = waku.items?.findIndex((i) => i.id === id);

			if (index === undefined || index <= -1) {
				return;
			}

			waku.items?.splice(index, 1);
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
