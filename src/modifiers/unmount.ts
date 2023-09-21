import { render } from 'vue';
import { useMountableService } from '../service';
import { ServiceItem } from '../types';
import { empty, logger, removeElement } from '../utils';

export function unmountComponent(id: string): void {
	const service = useMountableService();
	const item: any = service.getItem(id);

	if (!item) {
		return;
	}

	render(null, item.el);
	removeElement(item.el as HTMLElement);
	item.el = null;
	item.vNode = null;
	service.removeItem(id);
}

export function unmountAllComponents(): void {
  const service = useMountableService();

	if (empty(service.items)) {
		console.info('There are no components that can be dismounted!');
		return;
	}

	service.items.forEach((item: ServiceItem) => {
		unmountComponent(item.id);
	});

	service.items.length = 0;
}
