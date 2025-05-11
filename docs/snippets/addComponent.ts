import Modal from '../components/modal.vue';
import { mountComponent } from '@subwaytime/waku';

export function addComponent() {
    // #region snippet
    const { id, vNode, el, destroy } = mountComponent(Modal);
    // #endregion snippet
}
