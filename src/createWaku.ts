import mitt from 'mitt';
import { type App, reactive } from 'vue';
import {
	type WakuOptions,
	type Waku,
	type WakuPlugin,
	type WakuItem,
	type WakuEvents,
	WakuEventsEnum,
	setActiveWaku,
} from './core';
import { MODULE_NAME, WakuSymbol } from './constants';
import { injectMountPoint } from './utils';
import WakuMountPoint from './mountPoint.vue';

/**
 * Injects the `WakuMountPoint` into the app after it has been mounted,
 * unless the user opted out via `autoMount: false`.
 *
 * @param app
 */
function installAutoMount(app: App): void {
	const originalMount = app.mount;

	app.mount = function (...args: Parameters<App['mount']>) {
		const result = originalMount.apply(app, args);
		const container = (app._container ?? undefined) as HTMLElement | undefined;
		const dispose = injectMountPoint(app, container);

		if (typeof app.onUnmount === 'function') {
			app.onUnmount(dispose);
		} else {
			const originalUnmount = app.unmount;
			app.unmount = function () {
				dispose();
				return originalUnmount.apply(app);
			};
		}

		return result;
	};
}

export function createWaku(options: WakuOptions = {}): WakuPlugin {
	const { autoMount = true } = options;

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

			if (autoMount && typeof document !== 'undefined') {
				installAutoMount(app);
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
