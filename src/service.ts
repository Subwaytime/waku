import { App, Ref, RendererElement, Teleport, VNode, defineComponent, h, inject, mergeProps, ref, render } from 'vue';
import type { Component, MountOptions, RawSlots } from './types';
import { empty, getElement, isVueComponent, logger, removeComments, toArray } from './utils';

import { MODULE_NAME } from './constants';

let MountableServiceSymbol: Symbol = Symbol();

/**
 *	Will inject Mount and Destroy into `setup`
 * @returns Symbol
 */

export function useComponent() {
	const service = inject(MountableServiceSymbol);

	if (!service) {
		throw logger.error(new Error(`[${MODULE_NAME}]: No Mountable Service provided!`));
	}

	return service;
}

export function VueMountable() {
	let instance: App;
	let elements: Ref<RendererElement[]> = ref([]);

	/**
	 * Mount a Component to the current Vue or Component Instance
	 * Can hold Props, Children Components and a teleportation Target
	 * @param component
	 * @param props
	 * @param children
	 * @param target
	 */

	function mount(element: Component | String, options: MountOptions = { props: {}, children: [], target: '' }) {
		let { props, children, target } = options;

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
			throw logger.error(new Error('Component Name is not defined.'));
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

		if (!empty(childComponents)) {
			vnode = h(component, data, childComponents);
		} else {
			vnode = h(component, data);
		}

		// set current instance
		vnode.appContext = instance._context;

		if (!empty(target)) {
			const teleporter = h(Teleport as any, { to: target });
			vnode = h(teleporter, vnode);
		}

		render(vnode, container as Element);
		instance._container.appendChild(container);

		// cache node element for destroy process
		const nodeElement = getElement(vnode);
		elements.value.push(nodeElement);

		return nodeElement;
	}

	/**
	 * Remove an Element from DOM
	 * @param element
	 */

	function destroy(element: HTMLElement) {
		if (typeof element.remove !== 'undefined') {
			element.remove();
		} else {
			element.parentNode && element.parentNode.removeChild(element);
		}

		if(elements.value.includes(element)) {
			elements.value = elements.value.filter((el) => el != element);
		}

		removeComments(instance._container);
		render(null, element);
	}

	/**
	 * Remove all added Elements from DOM
	 */

	function destroyAll() {
		elements.value.forEach((element: any) => {
			if (typeof element.remove !== 'undefined') {
				element.remove();
			} else {
				element.parentNode && element.parentNode.removeChild(element);
			}

			removeComments(instance._container);
			render(null, element);
		});

		elements.value.length = 0;
	}

	return {
		install(app: App) {
			instance = app;
			const mountable = { mount, destroy, destroyAll, id: app._uid };
			app.config.globalProperties.$useComponent = mountable;
			app.provide(MountableServiceSymbol, mountable);
		},
	};
}
