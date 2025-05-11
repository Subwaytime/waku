import Modal from '../components/modal.vue';
import DefaultSlotComponent from '../components/modal-slots/default.vue';
import HeaderSlotComponent from '../components/modal-slots/header.vue';
import { createSlot, mountComponent } from '@subwaytime/waku';

export function addComponentWithSlots() {
    // #region snippet
    const { id, vNode, el, destroy } = mountComponent({
        component: Modal,
        slots: {
            default: createSlot(DefaultSlotComponent),
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