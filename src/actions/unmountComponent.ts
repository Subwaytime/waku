import { useWaku } from '~/core';
import { empty } from '~/utils';

/**
 *
 * @param id
 * @returns
 */
export function unmountComponent(id: string): void {
	const waku = useWaku();
	const item = waku.getItem(id);

	if (!item) {
		return;
	}

	item.el = null;
	item.vNode = null;
	waku.removeItem(id);
}

/**
 *
 * @returns
 */
export function unmountAllComponents(): void {
	const waku = useWaku();

	if (!waku.items || empty(waku.items)) {
		console.info('There are no components that can be dismounted!');
		return;
	}

	for (let index = 0; index < waku.items.length; index++) {
		const item = waku.items[index];
		unmountComponent(item.id);
	}

	waku.items.length = 0;
}
