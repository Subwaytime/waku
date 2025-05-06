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
import { createSlot } from '~/actions/createSlot';

type RemoveIndexSignature<T> = {
	[K in keyof T as K extends `${infer _}` ? K : never]: T[K]
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

export type SlotNames<C> = keyof RemoveIndexSignature<SimplifyDeep<ComponentSlots<C>>>;

type BaseProps<T> = OnlyReadonlyNonOnProps<ComponentProps<T>>;
type BaseEmits<T> = OnlyReadonlyOnProps<ComponentProps<T>>;

type BaseSlots<T> = {
	[K in SlotNames<T>]?: typeof createSlot;
};

type InferResolvedProps<P> = P extends object
	? SimplifyDeep<BaseProps<P>>
	: never;

type InferResolvedEmits<E> = E extends object
	? SimplifyDeep<BaseEmits<E>>
	: never;

export interface BaseOptions<C> {
	component?: C;
	props?: InferResolvedProps<C>;
	emits?: InferResolvedEmits<C>;
	slots?: BaseSlots<C>;
	inheritAttrs?: boolean;
	immediate?: boolean;
	target?: TeleportProps['to'];
	transition?: TransitionProps | TransitionGroupProps
};

export interface DefaultProps {
	'waku-mounted-id': string;
	'waku-is-programmatic': boolean;
	onDestroy: () => void;
};

export interface MountedComponentInstance {
	id: string;
	vNode: VNode;
	el?: RendererElement | Element | null;
	destroy: () => void;
}

export type Options<C> = Component & { component?: never } | SimplifyDeep<BaseOptions<C>>;