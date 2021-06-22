import notification from '@components/notification.vue';
import { ref } from 'vue';
import { useComponent } from '../../../src/index';

const notifications = ref([]);

export function useNotify() {
	const { mount, destroy } = useComponent();
	function addNotification(components = []) {
		const note = mount(notification, {
			children: components,
		});
		notifications.value.push(note);
	}

	function removeNotification(element = null) {
		if (notifications.value.length > 0) {
			if (element) {
				destroy(element);
			} else {
				const last = notifications.value.pop();
				destroy(last.el.nextSibling || last);
			}
		}
	}

	return {
		addNotification,
		removeNotification,
	};
}
