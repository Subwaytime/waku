import type { App, Component } from 'vue';
import { getCurrentInstance,
	inject, reactive } from 'vue';
import { setupDevtoolsPlugin } from '@vue/devtools-api';
import { MODULE_NAME, MountableServiceSymbol } from './constants';
import { getElement, logger } from './utils';
import type { ID, ServiceItem } from '~/types';

/**
 * Active mountable service instance
 */

let activeService: Service | undefined;

/**
 * Set or unset mountable service
 * @param service - mountable instance
 */

export const setActiveService = (service: Service | undefined) => (activeService = service);

/**
 * Get active mountable service if it's installed
 */

export const getActiveService = () => {
	const vm = getCurrentInstance() as any;

	if (!vm) {
		return activeService;
	}

	return vm?.provides?.[MountableServiceSymbol as any] || inject(MountableServiceSymbol, activeService);
};

/**
 * Returns current mountable service instance symbol
 * works outside of setup and inside setup it will use inject/provide
 */

export function useMountableService(): Service {
	const vm = getCurrentInstance() as any;

	let service = vm && inject(MountableServiceSymbol, vm?.provides?.[MountableServiceSymbol as any]);

	if (service) {
		setActiveService(service);
	}

	service = getActiveService();

	if (service === null || service === undefined) {
		throw logger.error(new Error(`[${MODULE_NAME}]: No Mountable Service provided!`));
	}

	return service;
}

/**
 * Mountable service class
 * contains current vue instance and mounted items
 */

export class Service {
	public install: (app: App) => void = () => undefined;
	public instance: any;
	public items: ServiceItem[] = reactive([]);

	/**
	 *
	 * @param app
	 */
	public __init(app: App) {
		this.instance = app;
		this.setupDevTools();
		setActiveService(this);
	}

	/**
	 *
	 * @param id
	 * @param component
	 * @param vnode
	 */
	public addItem(id: ID, component: Component, vnode: any): void {
		this.items.push({
			id,
			element: getElement(vnode),
			component,
			vnode,
			state: {
				mounted: true,
				visible: true
			}
		});
	}

	/**
	 *
	 * @param id
	 */
	public removeItem(id: ID) {
		this.items = this.items.filter((item: ServiceItem) => item.id !== id);
	}

	/**
	 *
	 * @param id
	 */
	public getItem(id: ID): ServiceItem | void {
		const item = this.items.find((i: ServiceItem) => i.id === id);

		if (!item) {
			return logger.error(`${id} cannot be found.`);
		}

		return item;
	}

	public setupDevTools() {
		const id = `${MODULE_NAME}-plugin-id`;

		return setupDevtoolsPlugin({
			id,
			label: `${MODULE_NAME} Plugin`,
			packageName: MODULE_NAME,
			homepage: 'https://github.com/Subwaytime/vue-mountable/',
			app: this.instance
		},
		(api) => {
			api.addInspector({
				id,
				label: 'Test inspector',
				icon: 'tab_unselected',
				treeFilterPlaceholder: 'Search for test...'
			});
		});
	}
}
