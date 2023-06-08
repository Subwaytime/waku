import {
    defineComponent,
    h,
    mergeProps,
    render,
    RendererElement,
    Teleport,
    VNode,
    createVNode,
    ExtractPropTypes
} from 'vue';
import { useMountable } from './service';
import { defaultProps } from './constants';
import {
    MountReturn,
    Component,
    Options,
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

export function mount<T>(component: Component<T>[0], options?: Options<T>): MountReturn<T> {
  options = { props: {}, target: '', children: [], ...options);

	const service = useMountable();

  if (component instanceof String) {
    component = defineComponent({
      name: `mounted-${component}`,
      render() {
        return h(component, { ...options?.props, ...options?.emits }, this.$slots.default?.());
      },
    });
  }

	if (!component.name) {
		const name = basename(component.__file as string);

		if (!name) {
			throw logger.error(new Error(`Component name could not be defined from: ${component.__file}`));
		}
	}

	const container: RendererElement = document.createDocumentFragment();

	if (component.props && component.props.target) {
		options.target = component.props.target instanceof String ? component.props.target : component.props.target.default;
	}

	let vnode: VNode;
	const data = mergeProps(defaultProps, { ...options?.props, ...options?.emits });
	component.inheritAttrs = false;

	if (!empty(options?.children)) {
		const childComponents: RawSlots = toArray(options?.children).reduce((result: any, child: any) => {
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

	if (!empty(options?.target)) {
		const teleporter = h(Teleport as any, { to: options?.target });
		vnode = h(teleporter, vnode);
	}

	render(vnode, container as Element);
	service.instance._container.appendChild(container);

	// cache node element for destroy process
	const element = getElement(vnode);
	service.elements.value.push(element);

	return {
    element,
    component
  }
}
