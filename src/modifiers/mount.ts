import type { Component, RendererElement, VNode } from 'vue';
import { Teleport, createVNode, h, mergeProps, render, readonly, defineComponent } from 'vue';
import { useMountableService } from '../service';
import { generateID } from '../utils';
import type { DefaultProps, MountedComponentInstance, MountOptions, Options } from '../types';
import { handleSlots } from './handleSlots';
import { unmountComponent } from './unmount';

export function mountComponent<C extends Component>(options: MountOptions<C>): MountedComponentInstance {
	const opt = Object.assign({}, (options as Options<C>).component ? options : { component: options }) as Options<C>;
	const id: string = generateID();

	const service = useMountableService();
	const container: RendererElement | Element | null = document.createDocumentFragment();

	const defaultProps = {
		mountedId: id,
		isProgrammatic: true,
		onDestroy: () => unmountComponent(id)
	} satisfies DefaultProps;

	const data = readonly(mergeProps(defaultProps, { ...opt.props, ...opt?.emits }));
	let vNode: VNode = createVNode(defineComponent(() => () => h(opt?.component as any, data, (opt.slots ? handleSlots(opt.slots) : null) as any)));

	if (opt.target) {
		const teleporter = h(Teleport as any, { to: opt.target });
		vNode = h(teleporter, vNode);
	}

	if (service && service.instance._context) {
		vNode.appContext = service.instance._context;
	}

	render(vNode, container as Element);
	service.addItem(id, (opt?.component as any).__name, container, vNode);

	return {
		id,
		vNode,
		el: container,
		destroy: () => unmountComponent(id)
	};
}
