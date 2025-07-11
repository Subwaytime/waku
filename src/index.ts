export { mountComponent } from '~/actions/mountComponent';

export {
	unmountComponent,
	unmountAllComponents,
} from '~/actions/unmountComponent';

export {
	createSlot
} from '~/actions/createSlot';

export type { WakuData, WakuSlot } from '~/types';
export { default as WakuMointPoint } from './mountPoint.vue';
export { createWaku } from '~/createWaku';
