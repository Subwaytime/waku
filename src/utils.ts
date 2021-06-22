/**
 *
 * @param {*} v
 */

export function isPlainObject(v) {
	return !!v && typeof v === 'object' && (v.__proto__ === null || v.__proto__ === Object.prototype);
}

/**
 *
 * @param value
 */

export function empty(value: any) {
	if (value === null || value === undefined || value === '{}') {
		return true;
	}

	if (Array.isArray(value) && Object.keys(value).length <= 0) {
		return true;
	}

	if (Reflect.ownKeys(value).length === 0 && value.constructor === Object) {
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
