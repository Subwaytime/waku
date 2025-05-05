import { useWaku, type Waku } from '~/core';
import { generateID } from '~/utils';
import { unmountComponent } from '~/actions/unmountComponent';
// import { handleSlots } from '~/actions/handleSlots';
import { MODULE_NAME } from '~/constants';

import {
	type Component,
	type DefineComponent,
	Slots,
	type TeleportProps,
	type VNode,
	h,
} from 'vue';
import {
	mergeProps,
	readonly,
	createVNode,
	Teleport,
} from 'vue';
import { defu } from 'defu';

import type { ComponentSlots, ComponentProps } from 'vue-component-type-helpers';
import type { SimplifyDeep } from 'type-fest';

interface defaultProps {
	'waku-mounted-id': string;
	'waku-is-programmatic': boolean;
	onDestroy: () => void;
};

export interface MountedComponentInstance {
	id: string;
	vNode: VNode;
	// el: RendererElement | Element | null;
	destroy: () => void;
}


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
	[K in SlotNames<T>]?: () => BaseOptions<T>;
};

type InferResolvedProps<P> = P extends object
	? SimplifyDeep<BaseProps<P>>
	: never;

type InferResolvedEmits<E> = E extends object
	? SimplifyDeep<BaseEmits<E>>
	: never;

interface BaseOptions<C> {
	component?: C;
	props?: InferResolvedProps<C>;
	emits?: InferResolvedEmits<C>;
	target?: TeleportProps['to'];
	slots?: BaseSlots<C>;
	inheritAttrs?: boolean;
	immediate?: boolean;
};

type Options<C> = Component & { component?: never } | SimplifyDeep<BaseOptions<C>>;
export function mountComponent<C>(input: Options<C>): any {
	const wrappedOptions = 'component' in input
		? input
		: { component: input };

	const waku = useWaku();

	if (!waku.instance) {
		throw new Error(`[${MODULE_NAME}]: No Vue Instance for Waku was provided!`);
	}

	const defaultOptions = {
		inheritAttrs: false,
		immediate: true,
	} as const;

	const opt = defu({}, { ...defaultOptions, ...wrappedOptions }) as BaseOptions<C>;

	const id: string = generateID();
	const component = opt.component as DefineComponent;

	const defaultProps = {
		'waku-mounted-id': id,
		'waku-is-programmatic': true,
		onDestroy: () => unmountComponent(id)
	} as const satisfies defaultProps;

	const data = readonly(
		mergeProps(defaultProps, {
			...opt.props ?? {},
			...opt?.emits ?? {}
		})
	);

	component.inheritAttrs = opt.inheritAttrs;
	let vNode = createVNode(component, data);

	if (opt.target) {
		const teleporter = h(Teleport as any, { to: opt.target });
		vNode = h(teleporter, vNode);
	}

	vNode.appContext = waku.instance._context;

	waku.addItem({
		id,
		label: component.__name as string,
		vNode,
	});

	return {
		id,
		vNode,
		destroy: () => unmountComponent(id),
	};
}