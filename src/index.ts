import type { App, Plugin } from 'vue';
import { Service } from './service';
import { MountableServiceSymbol } from './constants';

export {
	mountComponent,
} from './modifiers/mount';

export {
	unmountComponent,
  unmountAllComponents
} from './modifiers/unmount';

export type {
    MountedComponentInstance
} from './types';

export function VueMountable(): Plugin {
	const service = new Service();
	service.install = (app: App) => {
		service.__init(app);
		app.config.globalProperties.$useMountable = service;
		app.provide(MountableServiceSymbol, service);
	};

	return service;
}
