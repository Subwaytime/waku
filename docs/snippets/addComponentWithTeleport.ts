import Modal from '../components/modal.vue';
import { mountComponent } from '@subwaytime/waku';

export function addComponentAndTeleport() {
    // #region snippet
    const { id, vNode, el, destroy } = mountComponent({
        component: Modal,
        props: {
            message: 'I am teleported to `.notifications`!'
        },
        target: '.notifications'
    });
    // #endregion snippet
}