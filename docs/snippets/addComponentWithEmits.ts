import Modal from '../components/modal.vue';
import { mountComponent } from '@subwaytime/waku';

export function addComponentWithEmits() {
    // #region snippet
    const { id, vNode, el, destroy } = mountComponent({
        component: Modal,
        props: {
            testEmit: true // show the confetti emit button - not needed for emits just for this Example
        },
        emits: {
            onExample() {
                alert('This works nicely!');
            }
        }
    })
    // #endregion snippet
}