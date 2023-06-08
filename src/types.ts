import type { ComponentPropsOptions,
	TeleportProps,
	TransitionGroupProps,
	TransitionProps,
	VNode,
	VNodeArrayChildren,
	VNodeProps,
	Component as VueComponent,
	h } from 'vue';

import type { dismount } from '~/modifiers/dismount';

export type Data = Record<string, unknown>;
export type ID = string;

export interface Options<T> {
	component: string
	props?: ComponentPropsOptions<T>
	emits?: {
		[key: `on${Capitalize<string>}`]: (...args: any[]) => void
	}
	events?: {
		[key: `on${Capitalize<string>}`]: (...args: any[]) => void
	}
	children?: Options<T> | Options<T>[]
	slot?: string
}

export interface RawSlots {
	[name: string]: unknown
	$stable?: boolean
	/* Excluded from this release type: _ctx */
	/* Excluded from this release type: _ */
}

export type RawProps = VNodeProps & {
	__v_isVNode?: never
	[Symbol.iterator]?: never
} & Record<string, any>;

export type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any);

export type RenderParameters<T> = Parameters<typeof h<T>>;
export type Component<T> = RenderParameters<T>[0];
export interface RenderOptions<T> extends RenderParameters<T> {
	target?: TeleportProps['to']
	transition?: TransitionProps | TransitionGroupProps
}

export interface Mount<T> {
	id: ID
	element: HTMLElement
	component: Component<T>
	dismount: typeof dismount
	toggle: () => void
	hide: () => void
	show: () => void
}

export interface DefaultProps {
	mountedId: ID
	programmatic?: boolean
	onDismount: () => void
}

export interface ServiceItem {
	id: ID
	element: HTMLElement
	component: VueComponent
	vnode: VNode
	state: {
		mounted: Boolean
		visible: Boolean
	}
}
