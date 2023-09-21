
import { type App,
	getCurrentInstance, inject, reactive } from 'vue';
import { MODULE_NAME, MountableServiceSymbol } from './constants';
import type { ID, ServiceItem } from './types';

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

	if(!vm) {
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

	if(service) {
		setActiveService(service);
	}

	service = getActiveService();

	if (service === null || service === undefined) {
		throw new Error(`[${MODULE_NAME}]: No Mountable Service provided!`);
	}

	return service;
}

/**
 * Mountable service class
 * contains current vue instance and mounted elements
 */
export class Service {
	public id: any;
	public install: (app: App) => void = () => undefined;
	public instance: any;
	public items: any = reactive([]);

	/**
   * Initialize the Service
   * @param app
   */
	public __init(app: App) {
		this.id = `${MODULE_NAME}-plugin-id`;
		this.instance = app;
		setActiveService(this);
	}

	/**
   * Add Item to Service
   * @param id
   * @param component
   * @param vnode
   */
	public addItem(id: ID, label: any, el: any, vNode: any): void {
		this.items.push({
			id,
			label,
			el,
			vNode
		});

		this.instance._container.appendChild(el);
	}

	/**
   * Remove Item from Service
   * @param id
   */
	public removeItem(id: ID) {
		this.items = this.items.filter((item: ServiceItem) => item.id !== id);
	}

	/**
   * Retrieve an existing Item from Service
   * @param id
   */
	public getItem(id: ID): ServiceItem | void {
		const item = this.items.find((i: ServiceItem) => i.id === id);

		if (!item) {
			throw `Component with ${id} cannot be found.`;
		}

		return item;
	}
}
