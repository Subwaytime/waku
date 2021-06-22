import { defineComponent, VNodeProps } from 'vue';

export interface MountOptions {
	props: VNodeProps;
	children?: Component | Component[];
	target?: string;
};

export type Component = ReturnType<typeof defineComponent>;