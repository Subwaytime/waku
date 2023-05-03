import notification from '~components/notification.vue';
import { destroy, mount } from '../../../dist/index.mjs';

let notifications = [];

export function useNotify() {
	function addNotification(components: any | any[] = []) {
		const { element } = mount(notification, {
			slots: components,
      emits: {
        onSubmit() {
          console.log('FUCK HELL YA');
        }
      }
		});
		notifications.push(element);
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
