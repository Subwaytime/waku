import { ref } from 'vue';
import Modal from '../components/modal.vue';
import { mountComponent } from '@subwaytime/waku';

export function addComponentWithReactiveProps() {
    // #region snippet
    const message = ref('Test') as any;

    const { id, vNode, el, visible, destroy } = mountComponent({
        component: Modal,
        props: {
            message
        }
    });
    // #endregion snippet
}