import mitt from 'mitt';
import { type App, type DefineComponent, reactive } from 'vue';
import { type Waku, type WakuPlugin, type WakuItem, type WakuEvents, WakuEventsEnum, setActiveWaku } from './core';
import { MODULE_NAME, WakuSymbol } from './constants';
import { injectMountPoint } from '~/utils';

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

			const rootComponent = app._component as DefineComponent;

			if ('render' in rootComponent && typeof rootComponent.render === 'function') {
				const original = rootComponent.render;
				rootComponent.render = function (...args: any[]) {
					const root = original.apply(this, args);
					return injectMountPoint(root);
				};
			} else {
				const original = rootComponent.setup!;
				rootComponent.setup = function (...args) {
					const root = original.apply(this, args);
					return () => injectMountPoint(root);
				};
			}
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
