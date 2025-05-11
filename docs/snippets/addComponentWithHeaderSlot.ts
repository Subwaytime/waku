import Modal from '../components/modal.vue';
import DefaultSlotComponent from '../components/modal-slots/default.vue';
import HeaderSlotComponent from '../components/modal-slots/header.vue';
import { createSlot, mountComponent } from '@subwaytime/waku';

export function addComponentWithSlots() {
    const { id, vNode, el, destroy } =
    // #region snippet
    mountComponent({
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