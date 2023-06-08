import type { App, Plugin } from 'vue';
import { MountableServiceSymbol } from '~/constants';
import { Service } from '~/service';

export {
	dismount, dismountAll
} from '~/modifiers/dismount';
export {
	mount
} from '~/modifiers/mount';
export {
	useMountableService
} from '~/service';

export function VueMountable(): Plugin<[]> {
	const service = new Service();
	service.install = (app: App) => {
		service.__init(app);
		app.config.globalProperties.$useMountable = service;
		app.provide(MountableServiceSymbol, service);
	};
	return service;
}
