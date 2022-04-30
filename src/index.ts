import { App } from 'vue';
import { MountableServiceSymbol } from './constants';
import { Service, setActiveService } from './service';

export { destroy, destroyAll } from './destroy';
export { mount } from './mount';
export { useMountable } from './service';

export function VueMountable() {
	const service = new Service();
	service.install = (app: App) => {
		service.instance = app;
		app.config.globalProperties.$useMountable = service;
		setActiveService(service);
		app.provide(MountableServiceSymbol, service);
	};

	return service;
}
