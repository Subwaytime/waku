import { render } from 'vue';
import { empty, logger, removeComments, removeElement } from '~/utils';
import { type Service, useMountableService } from '~/service';
import type { ID, ServiceItem } from '~/types';

// TODO: Beautify this @Subwaytime

/**
 * Remove an Element from DOM
 * @param element
 */

export function dismount(item_id: ID): void {
	const service = useMountableService();
	const item = service.getItem(item_id) as ServiceItem;
	destroy(item, service);
}

/**
 * Remove all added Elements from DOM
 */

export function dismountAll(): void {
	const service = useMountableService();

	if (empty(service.items)) {
		logger.info('There are no components that can be dismounted!');
		return;
	}

	service.items.forEach((item: ServiceItem) => {
		destroy(item, service);
	});

	service.items.length = 0;
}

function destroy(item: ServiceItem, service: Service) {
	removeElement(item.element);
	service.removeItem(item.id);
	removeComments(service.instance._container);
	render(null, item.element);
}
