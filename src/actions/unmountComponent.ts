import { render } from 'vue';
import { useWaku } from '../core';
import { empty, removeElement } from '../utils';

export function unmountComponent(id: string): void {
	const waku = useWaku();
	const item = waku.getItem(id);

	if (!item) {
		return;
	}

	render(null, item.el);
	removeElement(item.el as HTMLElement);
	item.el = null as any;
	item.vNode = null as any;
	waku.removeItem(id);
}

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
