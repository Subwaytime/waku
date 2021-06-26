import type { Component } from './types';

/**
 *
 * @param {*} v
 */

export function isPlainObject(v: any) {
	return !!v && typeof v === 'object' && (v.__proto__ === null || v.__proto__ === Object.prototype);
}

/**
 *
 * @param v
 */

export function isVueComponent(v: Component) {
	return isPlainObject(v) && v.render && v.__file && v.__hmrId;
}

/**
 *
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
