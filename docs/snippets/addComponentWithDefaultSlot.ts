import Modal from '../components/modal.vue';
import DefaultSlotComponent from '../components/modal-slots/default.vue';
import { createSlot, mountComponent } from '@subwaytime/waku';

export function addComponentWithDefaultSlot() {
    const { id, vNode, el, visible, destroy } =
    // #region snippet
    mountComponent({
        component: Modal,
        slots: {
            default: createSlot(DefaultSlotComponent)
        }
    });
    // #endregion snippet
}