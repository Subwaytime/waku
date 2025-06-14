import Modal from '../components/modal.vue';
import { mountComponent } from '@subwaytime/waku';

export function addComponentWithProps() {
    const { id, vNode, el, visible, destroy } =
    // #region snippet
    mountComponent({
        component: Modal,
        props: {
            message: 'Test'
        }
    });
    // #endregion snippet
}