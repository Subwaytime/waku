import {
    App,
    getCurrentInstance,
    inject,
    Ref,
    ref,
    RendererElement
} from 'vue';
import {
    MODULE_NAME,
    MountableServiceSymbol
} from './constants';
import {
    logger
} from './utils';

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

export function useMountable() {
	const vm = getCurrentInstance() as any;

	let service = vm && inject(MountableServiceSymbol, vm?.provides?.[MountableServiceSymbol as any]);

	if(service) {
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
 * contains current vue instance and mounted elements
 */

export class Service {
	public install: (app: App) => void = () => undefined;
	public instance: any;
	public elements: Ref<RendererElement[]> = ref([]);
}
