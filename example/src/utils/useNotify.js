import notification from '@components/notification.vue';
import { useComponent } from '../../../dist/index.mjs';

let notifications = [];

export function useNotify() {
	const { mount, destroy } = useComponent();
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
