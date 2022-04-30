import notification from '@components/notification.vue';
import { destroy, mount } from '../../../dist/index.mjs';

let notifications = [];

export function useNotify() {
	function addNotification(components = []) {
		const note = mount(notification, {
			children: components,
		});
		notifications.push(note);
	}

	function removeNotification(element = null) {
		if (notifications.length > 0) {
			if (element) {
				notifications = notifications.filter((note) => note != element);
				destroy(element);
			}
		}
	}

	return {
		addNotification,
		removeNotification,
	};
}
