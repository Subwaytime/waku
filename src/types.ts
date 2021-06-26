import { defineComponent, VNodeProps } from 'vue';

export interface MountOptions {
	component: Component;
	children?: ChildComponent[]
	props: VNodeProps;
	target?: string;
};

export interface ChildComponent {
	component: Component;
	props: VNodeProps;
	target?: string;
	slot?: string;
}

/* Imported from vue runtime-core */

export type RawSlots = {
	[name: string]: unknown;
	$stable?: boolean;
	/* Excluded from this release type: _ctx */
	/* Excluded from this release type: _ */
};

export type Component = ReturnType<typeof defineComponent>;