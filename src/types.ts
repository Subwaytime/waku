import type {
	AllowedComponentProps,
	Component,
	RendererElement,
	TeleportProps,
	VNode,
	VNodeProps,
} from 'vue';

import type { ComponentProps, ComponentSlots } from 'vue-component-type-helpers';
import type { SimplifyDeep } from 'type-fest';

// DISABLED FOR NOW
// type InternalProps =
// 	| keyof VNodeProps
// 	| keyof AllowedComponentProps
// 	| keyof DefaultProps;
// export type ExtractComponentProps<TComponent> = TComponent extends new () => {
// 	$props: infer P;
// }
// 	? P
// 	: never;
// type ComponentProps<C extends Component> = C extends new (
// 	...args: any
// ) => any
// 	? {
// 			[K in keyof InstanceType<C> as K extends InternalProps
// 				? never
// 				: K]: InstanceType<C>;
// 		}
// 	: never;

type Emits = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: `on${Capitalize<string>}`]: (...args: any[]) => void;
};

export type Options<C> = {
	component: C;
	props?: ComponentProps<C>
	emits?: Emits;
	slots?: SlottedComponent<C, any>[];
	target?: TeleportProps['to'];
	// transition?: TransitionProps | TransitionGroupProps
	immediate?: boolean;
	inheritAttrs: boolean;
};

type RemoveIndexSignature<T> = {
	[K in keyof T as K extends `${infer _}` ? K : never]: T[K]
};
export type SlotNames<C> = keyof RemoveIndexSignature<SimplifyDeep<ComponentSlots<C>>>;
export type SlottedComponent<P, SC extends Component> = {
	slotName: SlotNames<P>;
	component: SC;
	props?: ComponentProps<SC>;
	emits?: Emits;
	slots?: SlottedComponent<SC, any>[];
};

export interface DefaultProps {
	'data-mounted-id'?: string;
	'data-is-programmatic'?: boolean;
	onDestroy: () => void;
}

export type MountOptions<C> = { component: C } | Options<C>;
export interface MountedComponentInstance {
	id: string;
	vNode: VNode;
	el: RendererElement | Element | null;
	destroy: () => void;
}
