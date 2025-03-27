import type {
	AppContext,
	DefineComponent,
	RendererElement,
	VNode,
} from 'vue';
import {
	Teleport,
	h,
	mergeProps,
	render,
	readonly,
} from 'vue';
import { defu } from 'defu';
import { useWaku, type Waku } from '~/core';
import { generateID } from '~/utils';
import type {
	DefaultProps,
	MountedComponentInstance,
	MountOptions,
	Options,
} from '~/types';
import { unmountComponent } from '~/actions/unmountComponent';
import { handleSlots } from '~/actions/handleSlots';
import { defaultOptions } from '~/constants';

export function mountComponent<C extends DefineComponent>(
	options: MountOptions<C>,
): MountedComponentInstance {
	const waku = useWaku();
	const wrappedOptions = (options as Options<C>).component
		? options
		: { component: options };

	const opt = defu(
		{},
		{ ...defaultOptions, ...wrappedOptions },
	) as unknown as Options<C>;
	const id: string = generateID();

	const container: RendererElement | Element | null =
		document.createDocumentFragment();
	const component = opt.component;

	const defaultProps = {
		'data-mounted-id': id,
		'data-is-programmatic': true,
		onDestroy: () => unmountComponent(id),
	} satisfies DefaultProps;

	const data = readonly(
		mergeProps(defaultProps, { ...opt.props, ...opt?.emits }),
	);

	component.inheritAttrs = opt.inheritAttrs;

	let vNode: VNode = h(component, data, handleSlots(opt.slots));
	vNode.appContext = waku?.instance?._context as AppContext;

	if (opt.target) {
		const teleporter = h(Teleport as any, { to: opt.target });
		vNode = h(teleporter, vNode);
	}

	render(vNode, container as Element);
	waku.addItem({
		id,
		label: component.__name as string,
		el: container,
		vNode,
	});

	return {
		id,
		el: container,
		vNode,
		destroy: () => unmountComponent(id),
	};
}
