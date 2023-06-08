import type { ServiceItem } from '~/service';
import { useMountableService } from '~/service';
import type { ID } from '~/types';

/**
 * Remove an Element from DOM
 * @param element
 */

export function toggle(item_id: ID, state?: Boolean) {
	const service = useMountableService();
	const item = service.getItem(item_id) as ServiceItem;

	// item.state.visible ? mount(item.vnode)
}

/**
 * Remove all added Elements from DOM
 */

export function hide(item_id: ID) {
	const service = useMountableService();
	const item = service.getItem(item_id) as ServiceItem;

	if (item.state.mounted) {
		item.state.visible = false;
		item.element.style.display = 'none';
	}
}

export function show(item_id: ID) {
	const service = useMountableService();
	const item = service.getItem(item_id) as ServiceItem;

	if (item.state.mounted) {
		item.state.visible = true;
		item.element.style.display = 'unset';
	}
}
