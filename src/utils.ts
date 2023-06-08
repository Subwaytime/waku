import consola from 'consola';
import type { VNode, VNodeProps } from 'vue';
import { h, mergeProps } from 'vue';
import type { Options, Props } from '~/types';
import { MODULE_NAME } from '~/constants';

/**
 * Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
 * @param string
 */

export function slash(string: string): string {
	return string.replace(/\\/g, '/');
}

/**
 * Check if Value is a Plain Object
 * @param {*} v
 */

export function isPlainObject(v: any) {
	/* eslint no-proto: off */
	return !!v && typeof v === 'object' && (v.__proto__ === null || v.__proto__ === Object.prototype);
}

/**
 * Check if Value is a Vue Component
 * @param v
 */

export function isVueComponent(v: any) {
	return isPlainObject(v) && v.render && v.__file && v.__hmrId;
}

/**
 *
 * @param vnode
 * @param node
 * @param options
 */
export function wrapVNode(vnode: VNode, node: Parameters<typeof h>[0], options: any) {
	return h(h(node, options), vnode);
}

/**
 * Returns DOM Element from VNode
 * @param v
 */

export function getElement(v: VNode): any {
	if (v.el) {
		if (v.el.nodeName === '#text') {
			return v.el.nextSibling;
		}
		else if (v.el.nodeName === '#comment' && Array.isArray(v.children) && v.children.length === 1) {
			return getElement(v.children[0] as VNode);
		}
		else {
			return v.el;
		}
	}
}

/**
 * Removes HTML Element from DOM
 * @param element
 */

export function removeElement(element: HTMLElement) {
	if (typeof element.remove !== 'undefined') {
		element.remove();
	}
	else {
		element.parentNode && element.parentNode.removeChild(element);
	}
}

/**
 * Check if Value is a DOM Comment
 * @param v
 */

export function isComment(v: HTMLElement) {
	return (
		v.nodeType === Node.COMMENT_NODE
		|| v.nodeName === '#comment'
		|| v.nodeValue === 'teleport start'
		|| v.nodeValue === 'teleport end'
	);
}

/**
 * Remove Teleportation DOM Comments
 * @param value
 */

export function removeComments(element: HTMLElement) {
	if (!element.hasChildNodes()) {
		return;
	}

	const children = [].slice.call(element.childNodes).filter(el => isComment(el));

	children.forEach((el: any, index: number) => {
		if (index <= 1 && el.nodeType === Node.COMMENT_NODE) {
			delete children[el];
			element.removeChild(el);
		}
	});
}

/**
 * Check if Value is Empty
 * supports: Array, Object, String
 * @param value
 */

export function empty(value: any) {
	if (value === null || value === undefined || value === '{}' || value === '') {
		return true;
	}

	if (Array.isArray(value) && Object.keys(value).length <= 0) {
		return true;
	}

	return false;
}

/**
 * Turns a Value into Array
 * @param string
 * @param seperator
 */

export function toArray<T>(value: T | T[]): T[] {
	if (Array.isArray(value)) {
		return value;
	}
	else {
		return [value];
	}
}

/**
 * Simple Info/Warn/Error Consola Instance
 */

export const logger = consola.create({ defaults: { message: `[${MODULE_NAME}] -` } });
export function abort(message: any) {
	throw logger.error(new Error(message));
}

/**
 * Returns basename from component file
 * @param string
 */

export function basename(string: string) {
	return slash(string).substring(string.lastIndexOf('/') + 1).split('.')[0];
}

/**
 *
 * @param slottedComponents
 */

export function slotify<T>(slottedComponents: Options<T> | Options<T>[]) {
	return toArray(slottedComponents).reduce((result: any, item: Options<T>) => {
		if (typeof item === 'string') {
			throw logger.error(new Error('String Elements are not supported as properties.'));
		}

		if (isVueComponent(item)) {
			item.component = {} as any;
			for (const key of Object.keys(item)) {
				item.component[key] = item[key];
				if (key !== 'component') {
					delete item[key];
				}
			}
		}

		if (!item.slot) {
			item.slot = 'default';
		}

		const data = mergeProps(item.props as VNodeProps, item.emits) as Props<T>;

		if (result[item.slot]) {
			return {
				...result,
				[item.slot]: () => [result[item.slot as string](), h(item.component, data, item.children ? slotify(item.children) : null)]
			};
		}
		else {
			return {
				...result,
				[item.slot]: () => h(item.component, data, item.children ? slotify(item.children) : null)
			};
		}
	}, {});
}
