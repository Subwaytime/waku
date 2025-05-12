import { defineStore } from 'pinia';
import Modal from '../components/modal.vue';
import { mountComponent } from '@subwaytime/waku';

// #region snippet
export const useExampleStore = defineStore('example', () => {
	function addComponentViaStore() {
		return mountComponent({
			component: Modal,
			props: { message: 'I am called from the Store!' },
		});
	}

	return {
		addComponentViaStore,
	};
});

// #endregion snippet