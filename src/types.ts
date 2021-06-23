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

export type Component = ReturnType<typeof defineComponent>;