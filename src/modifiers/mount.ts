import type { h } from 'vue';
import { nanoid } from 'nanoid';
import { useMountableService } from '~/service';
import type { RenderOptions, RenderParameters } from '~/types';

export function mount<T extends typeof h>(element: RenderParameters<(T)>[0], options: RenderOptions<T>[]): ReturnType<typeof h> {
	const id = nanoid();
	const service = useMountableService();

	console.log(options);

	// const component = !isVueComponent(element)
	// 	? defineComponent({
	// 		name: `mounted-${element}`,
	// 		render() {
	// 			return h(element as unknown as string, null, this.$slots.default?.());
	// 		}
	// 	})
	// 	: element as Component<T>;

	// const container: RendererElement = document.createDocumentFragment();
	// let vnode: VNode;

	// const defaultProps = {
	// 	mountedId: id,
	// 	programmatic: true,
	// 	onDismount: () => {
	// 		dismount(id);
	// 	}
	// } satisfies DefaultProps;

	// const data = mergeProps(defaultProps, { ...options?.props, ...options?.emits }) as Props<T>;
	// component.inheritAttrs = false;

	// vnode = h(component, data, options.children ? slotify(options?.children) : null);

	// // set current instance
	// vnode.appContext = service.instance.appContext;

	// if (!empty(options.transition)) {
	// 	vnode = wrapVNode(vnode, Transition as any, options.transition);
	// }

	// if (component.props && component.props.target) {
	// 	options.target = component.props.target instanceof String ? component.props.target : component.props.target.default;
	// }

	// if (!empty(options?.target)) {
	// 	vnode = wrapVNode(vnode, Teleport as any, { to: options.target });
	// }

	// render(vnode, container as Element);
	// service.instance._container.appendChild(container);

	// service.addItem(id, component, vnode);

	return {
		// id
		// element: getElement(vnode),
		// component,
		// toggle: () => toggle(id),
		// hide: () => hide(id),
		// show: () => show(id),
		// dismount: () => dismount(id)
	};
}
