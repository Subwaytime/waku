import {
	createVNode,
	readonly,
	mergeProps,
	h,
	type DefineComponent,
	Teleport,
} from 'vue';
import { defu } from 'defu';

import { useWaku } from '~/core';
import { unmountComponent } from '~/actions/unmountComponent';
import { MODULE_NAME } from '~/constants';
import type {
	DefaultProps,
	WakuData,
	Options,
} from '~/types';
import { generateID } from '~/utils';
import { handleSlots } from '~/actions/handleSlots';

export function mountComponent<C>(input: Options<C>): WakuData {
	const waku = useWaku();

	if (!waku.instance) {
		throw new Error(`[${MODULE_NAME}]: No Vue Instance for Waku was provided!`);
	}

	const defaultOptions = {
		inheritAttrs: false,
		immediate: true,
	} as const;

	const defaultProps = (id: string) => ({
		wakuMountedId: id,
		wakuIsProgrammatic: true,
		onDestroy: () => unmountComponent(id)
	}) as const satisfies DefaultProps;

	const wrappedOptions = 'component' in input
		? input
		: { component: input };

	const opt = defu({}, { ...defaultOptions, ...wrappedOptions }) as any;

	const id: string = generateID();
	const component = opt.component as DefineComponent;

	const data = readonly(
		mergeProps(defaultProps(id), {
			...opt.props ?? {},
			...opt?.emits ?? {}
		})
	);

	component.inheritAttrs = opt.inheritAttrs;
	const slots = opt.slots ? handleSlots(opt.slots) : undefined;
	let vNode = createVNode(component, data, slots);

	if (opt.target) {
		const teleporter = h(Teleport as any, { to: opt.target });
		vNode = h(teleporter, vNode);
	}

	vNode.appContext = waku?.instance?._context;

	waku.addItem({
		id,
		label: vNode?.component?.__name as string,
		vNode,
	});

	return {
		id,
		vNode,
		destroy: () => unmountComponent(id),
	};
}