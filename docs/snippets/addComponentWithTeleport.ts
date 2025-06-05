import Modal from '../components/modal.vue';
import { mountComponent } from '@subwaytime/waku';

export function addComponentWithTeleport() {
    const { id, vNode, el, visible, destroy } =
    // #region snippet
    mountComponent({
        component: Modal,
        props: {
            message: 'I am teleported to `.notifications`!'
        },
        target: '.notifications'
    });
    // #endregion snippet
}