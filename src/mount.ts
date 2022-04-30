import {
    defineComponent,
    h,
    mergeProps,
    render,
    RendererElement,
    Teleport,
    VNode
} from 'vue';
import { useMountable } from './service';
import {
    Component,
    MountOptions,
    RawSlots
} from './types';
import {
    basename,
    empty,
    getElement,
    isVueComponent,
    logger,
    toArray
} from './utils';

export function mount(element: Component | String, options: MountOptions = { props: {}, children: [], target: '' }) {
	let { props, children, target } = options;

	const service = useMountable();

	let component: Component;

	if (typeof element === 'string') {
		component = defineComponent({
			name: `mounted-${element}`,
			render() {
				return h(element, null, this.$slots.default?.());
			},
		});
	} else {
		component = element as Component;
	}

	if (!component.name) {
		const name = basename(component.__file);

		if (!name) {
			throw logger.error(new Error(`Component name could not be defined from: ${component.__file}`));
		}
	}

	const container: RendererElement = document.createDocumentFragment();

	if (component.props && component.props.target) {
		target = component.props.target instanceof String ? component.props.target : component.props.target.default;
	}

	const defaultProps = {
		programmatic: {
			type: Boolean,
			default: true,
		},
	};

	let vnode: VNode;
	const data = mergeProps(defaultProps, props);
	component.inheritAttrs = false;

	if (!empty(children)) {
		const childComponents: RawSlots = toArray(children).reduce((result: any, child: any) => {
			if (typeof child === 'string') {
				throw logger.error(new Error('String Elements are not supported as properties.'));
			}

			if (isVueComponent(child)) {
				child.component = {};
				for (const key of Object.keys(child)) {
					child.component[key] = child[key];
					if (key != 'component') {
						delete child[key];
					}
				}
			}

			if (!child.slot) {
				child.slot = 'default';
			}

			if (result[child.slot]) {
				return {
					...result,
					[child['slot']]: () => [result[child.slot](), h(child.component, child.props)],
				};
			} else {
				return {
					...result,
					[child['slot']]: () => h(child.component, child.props),
				};
			}
		}, {});

		vnode = h(component, data, childComponents);
	} else {
		vnode = h(component, data);
	}

	// set current instance
	vnode.appContext = service.instance._context;

	if (!empty(target)) {
		const teleporter = h(Teleport as any, { to: target });
		vnode = h(teleporter, vnode);
	}

	render(vnode, container as Element);
	service.instance._container.appendChild(container);

	// cache node element for destroy process
	const nodeElement = getElement(vnode);
	service.elements.value.push(nodeElement);

	return nodeElement;
}
