import type { Component } from './types';

/**
 * Check if Value is a Plain Object
 * @param {*} v
 */

export function isPlainObject(v: any) {
	return !!v && typeof v === 'object' && (v.__proto__ === null || v.__proto__ === Object.prototype);
}

/**
 * Check if Value is a Vue Component
 * @param v
 */

export function isVueComponent(v: Component) {
	return isPlainObject(v) && v.render && v.__file && v.__hmrId;
}

/**
 * Check if Value is a DOM Comment
 * @param v
 * @returns
 */

export function isComment(v: HTMLElement) {
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
 * @returns
 */

export function removeComments(element: HTMLElement) {
	if(!element.hasChildNodes()) { return; }

	const children = [].slice.call(element.childNodes).filter(el => isComment(el));

	children.forEach((el: any, index: number) => {
		if(index <= 1 && el.nodeType === Node.COMMENT_NODE) {
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
	if(Array.isArray(value)) {
		return value;
	} else {
		return [value];
	}
}
