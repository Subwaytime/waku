import type {
	Component,
	RendererElement,
	TeleportProps,
	TransitionGroupProps,
	TransitionProps,
	VNode,
} from 'vue';

import type { ComponentProps, ComponentSlots } from 'vue-component-type-helpers';
import type { SimplifyDeep } from 'type-fest';
import type { CreatedSlot } from '~/actions/createSlot';

type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
};

type ReadonlyKeys<T> = {
	[K in keyof T]-?: IfEquals<
		{ [Q in K]: T[K] },
		{ -readonly [Q in K]: T[K] },
		never,
		K
	>
}[keyof T];

type IfEquals<X, Y, A = X, B = never> = (
	(<T>() => T extends X ? 1 : 2) extends
	(<T>() => T extends Y ? 1 : 2) ? A : B
);

type OnlyReadonlyNonOnProps<T> = {
	[K in keyof T as K extends ReadonlyKeys<T>
	? K extends `on${string}`
	? never
	: K
	: never]: T[K];
};

type OnlyReadonlyOnProps<T> = {
	[K in keyof T as K extends ReadonlyKeys<T>
	? K extends `on${string}`
	? K
	: never
	: never]: T[K];
};


type BaseProps<T> = OnlyReadonlyNonOnProps<ComponentProps<T>>;
type BaseEmits<T> = OnlyReadonlyOnProps<ComponentProps<T>>;

type SlotNames<C> = keyof RemoveIndexSignature<ComponentSlots<C>>;
type BaseSlots<T> = {
	[K in SlotNames<T>]?: CreatedSlot;
};

export interface BaseOptions<C> {
	component?: C;
	props?: BaseProps<C>;
	emits?: BaseEmits<C>;
	slots?: BaseSlots<C>;
	inheritAttrs?: boolean;
	immediate?: boolean;
	target?: TeleportProps['to'];
	transition?: TransitionProps | TransitionGroupProps
};

export interface DefaultProps {
	wakuMountedId: string;
	wakuIsProgrammatic: boolean;
	onDestroy: () => void;
};

export interface MountedComponentInstance {
	id: string;
	vNode: VNode;
	el?: RendererElement | Element | null;
	destroy: () => void;
}

export type Options<C> = Component & { component?: never } | SimplifyDeep<BaseOptions<C>>;