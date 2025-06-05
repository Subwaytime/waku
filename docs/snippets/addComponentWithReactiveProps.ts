import Modal from '../components/modal.vue';
import { mountComponent } from '@subwaytime/waku';

export function addComponentWithReactiveProps() {
    // #region snippet
    const message = ref('Test');

    const { id, vNode, el, visible, destroy } = mountComponent({
        component: Modal,
        props: {
            message
        }
    });
    // #endregion snippet
}