import { type App, type DefineComponent, Fragment, h, type VNode } from 'vue';
import WakuMount from './mountPoint.vue';
import { customAlphabet } from 'nanoid';
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
export function isPlainObject(v: any): boolean {
	return (
		!!v &&
		typeof v === 'object' &&
		(v.__proto__ === null || v.__proto__ === Object.prototype)
	);
}

/**
 * Check if Value is a Vue Component
 * @param v
 */
export function isVueComponent(v: any): boolean {
	return isPlainObject(v) && v.render && v.__file && v.__hmrId;
}

/**
 * Returns DOM Element from VNode
 * @param v
 */

export function getElement(v: VNode | null): any {
	if (v?.el) {
		if (v.el.nodeName === '#text') {
			return v.el.nextSibling;
		}

		if (
			v.el.nodeName === '#comment' &&
			Array.isArray(v.children) &&
			v.children.length === 1
		) {
			return getElement(v.children[0] as VNode);
		}

		return v.el;
	}
}

/**
 * Removes HTML Element from DOM
 * @param element
 */
export function removeElement(element: HTMLElement): void {
	if (typeof element.remove !== 'undefined') {
		element.remove();
	} else {
		element.parentNode?.removeChild(element);
	}
}

/**
 * Check if Value is a DOM Comment
 * @param v
 */
export function isComment(v: HTMLElement): boolean {
	return (
		v.nodeType === Node.COMMENT_NODE ||
		v.nodeName === '#comment' ||
		v.nodeValue === 'teleport start' ||
		v.nodeValue === 'teleport end'
	);
}

/**
 * Remove Teleportation DOM Comments
 * @param value
 */
export function removeComments(element: HTMLElement): void {
	if (!element.hasChildNodes()) {
		return;
	}

	const children: Node[] = [].slice
		.call(element.childNodes)
		.filter((el) => isComment(el));

	for (let index = 0; index < children.length; index++) {
		const el = children[index];
		if (index <= 1 && el.nodeType === Node.COMMENT_NODE) {
			delete children[el as any];
			element.removeChild(el);
		}
	}
}

/**
 * Check if Value is Empty
 * supports: Array, Object, String
 * @param value
 */
export function empty(value: any): boolean {
	if (
		value === null ||
		value === undefined ||
		value === '{}' ||
		value === ''
	) {
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

	return [value];
}

/**
 * Returns basename from component file
 * @param string
 */
export function basename(string: string): string {
	return slash(string)
		.substring(string.lastIndexOf('/') + 1)
		.split('.')[0];
}

/**
 * Generate custom component ID
 * @param integer
 * @return string
 */
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const allowedValues = `1234567890${alphabet}${alphabet.toUpperCase()}`;

export function generateID(length = 10): string {
	const nanoid = customAlphabet(allowedValues, length);
	return nanoid();
}

/**
 *
 * @disabled
 */
export function injectMountPoint<R>(root: R): VNode {
	return h(Fragment, null, [
		h(root as VNode),
		h(WakuMount)
	]);
}

/**
 *
 * @disabled
 */

export function patchAppComponent(app: App): void {
	const rootComponent = app._component as DefineComponent;
	if ('render' in rootComponent && typeof rootComponent.render === 'function') {
		const original = rootComponent.render;
		rootComponent.render = function (...args: any[]) {
			const root = original.apply(this, args);
			return injectMountPoint(root);
		};
	}

	const original = rootComponent.setup!;
	rootComponent.setup = function (...args: any[]) {
		const root = original.apply(this, args as any);
		return () => injectMountPoint(root);
	};
}