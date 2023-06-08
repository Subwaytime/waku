import type {TeleportProps,
  VNode,
  VNodeArrayChildren,
  VNodeProps} from 'vue';

export type Data = Record<string, unknown>;

export interface Options<T> {
	children?: Component<T>[]
	props: Props<T>
	emits: any
	target: TeleportProps['to']
}

export interface RawSlots {
	[name: string]: unknown;
	$stable?: boolean;
	/* Excluded from this release type: _ctx */
	/* Excluded from this release type: _ */
}

export type RawProps = VNodeProps & {
	__v_isVNode?: never
	[Symbol.iterator]?: never
} & Record<string, any>;

export type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any);

export declare type RenderParameters<T> = Parameters<typeof h<T>>;
export declare type Component<T> = RenderParameters<T>[0];
export declare type Props<T> = RenderParameters<T>[1];

export interface MountReturn<T> {
	element: HTMLElement
	component: Component<T>
}

export interface DefaultProps {
	programmatic?: boolean
	visible?: boolean
}
