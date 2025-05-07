import { useWaku } from '~/core';
import { unmountComponent } from '~/actions/unmountComponent';
import { MODULE_NAME } from '~/constants';
import type {
	DefaultProps,
	MountedComponentInstance,
	Options,
 } from '~/types';
import { prepareData } from '~/actions/prepareData';

export function mountComponent<C>(input: Options<C>): MountedComponentInstance {
	const waku = useWaku();

	if (!waku.instance) {
		throw new Error(`[${MODULE_NAME}]: No Vue Instance for Waku was provided!`);
	}

	const defaultOptions = {
		inheritAttrs: false,
		immediate: true,
	} as const;

	const defaultProps = (id: string) => ({
		'waku-mounted-id': id,
		'waku-is-programmatic': true,
		onDestroy: () => unmountComponent(id)
	}) as const satisfies DefaultProps;

	const { id, vNode } = prepareData(input, defaultProps, defaultOptions, waku);

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