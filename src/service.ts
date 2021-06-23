import { h, inject, mergeProps, render, Teleport } from 'vue';
import { isPlainObject, toArray } from './utils';
import { MODULE_NAME } from './constant';

import type { App, RendererElement, VNode } from 'vue';
import type { Component, MountOptions, } from './types';

let MountableServiceSymbol: Symbol = Symbol(),
	container: RendererElement,
	node: VNode,
	instance: any;

/**
 * Will inject Mount and Destroy into `setup`
 * const { mount, destroy } = useComponent()
 * @returns
 */

export function useComponent() {
	const service = inject(MountableServiceSymbol);

	if(!service) {
		throw new Error(`[${MODULE_NAME}]: No Mountable Service provided!`);
	}

	return service;
}

/**
 * Mount a Component to the current Vue or Component Instance
 * Can hold Props, Children Components and a teleportation Target
 * @param component
 * @param param1
 */

function mount(component: Component, { props, children, target }: MountOptions) {
	if (!component.name) {
		throw new Error('Component Name is not defined.');
	}

	container = document.createDocumentFragment();

	if (component.props && component.props.target) {
		target = (component.props.target instanceof String ? component.props.target : component.props.target.default);
	}

	const defaultProps = {
		programmatic: {
			type: Boolean,
			default: true,
		},
		teleported: {
			target,
			state: !!target,
		},
	};

	let vnode = null;
	const data = mergeProps(defaultProps, props);
	component.inheritAttrs = false;

	const childComponents = toArray(children).reduce((a: any, b: any) => {
		if (isPlainObject(b)) {
			if(!b.slot) {
				b.slot = 'default';
			}

			return {
				...a,
				[b['slot']]: () => h(b.component, b.props),
			};
		} else {
			return {
				...a,
				default: () => {
					return h(b);
				},
			};
		}
	}, {});

	vnode = h(component, data, childComponents);

	// set current instance
	vnode.appContext = instance._context;

	// save the vnode before teleportation
	node = vnode;

	if (target != null) {
		const teleporter = h(Teleport as any, { to: target });
		vnode = h(teleporter, vnode);
	}

	render(vnode, container as Element);
	instance._container.appendChild(container);
	return node;
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
	render(null, element);
}

export const VueMountable = {
	mount,
	destroy,
	install(app: App) {
		instance = app;
		const mountable = this;
		app.config.globalProperties.$useComponent = mountable;
		app.provide(MountableServiceSymbol, mountable);
	}
};