import Modal from '../components/modal.vue';
import { mountComponent } from '@subwaytime/waku';

export function addComponentWithProps() {
    // #region snippet
    const { id, vNode, el, destroy } = mountComponent({
        component: Modal,
        props: {
            message: 'Test'
        }
    });
    // #endregion snippet
}