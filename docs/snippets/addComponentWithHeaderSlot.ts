import Modal from '../components/modal.vue';
import DefaultSlotComponent from '../components/modal-slots/default.vue';
import HeaderSlotComponent from '../components/modal-slots/header.vue';
import { createSlot, mountComponent } from '@subwaytime/waku';

export function addComponentWithHeaderSlot() {
    const { id, vNode, el, visible, destroy } =
    // #region snippet
    mountComponent({
        component: Modal,
        slots: {
            header: createSlot({
                component: HeaderSlotComponent,
                props: {
                    title: 'This is a header Slot!'
                }
            })
        }
    });
    // #endregion snippet
}