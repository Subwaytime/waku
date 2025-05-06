import { useWaku, type Waku } from '~/core';
import { generateID } from '~/utils';
import { unmountComponent } from '~/actions/unmountComponent';
import { handleSlots } from '~/actions/handleSlots';
import { MODULE_NAME } from '~/constants';
import type {
	BaseOptions,
	MountedComponentInstance,
	DefaultProps
 } from '~/types';

import {
	type Component,
	type DefineComponent,
	h,
} from 'vue';
import {
	mergeProps,
	readonly,
	createVNode,
	Teleport,
} from 'vue';
import type { SimplifyDeep } from 'type-fest';
import { defu } from 'defu';


export type Options<C> = Component & { component?: never } | SimplifyDeep<BaseOptions<C>>;
export function mountComponent<C>(input: Options<C>): MountedComponentInstance {
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
	} as const satisfies DefaultProps;

	const data = readonly(
		mergeProps(defaultProps, {
			...opt.props ?? {},
			...opt?.emits ?? {}
		})
	);

	component.inheritAttrs = opt.inheritAttrs;
	const slots = opt.slots ? handleSlots(opt.slots) : null;
	let vNode = createVNode(component, data, slots);

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