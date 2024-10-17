import { type VNode, h, mergeProps, readonly } from 'vue';
import type { StringKeyOf } from 'type-fest';
import { isVueComponent, toArray } from '../utils';
import type { SlottedComponent } from '../types';

export function handleSlots(
	slottedComponents: SlottedComponent | SlottedComponent[] | undefined,
): Record<string, (ctx: any) => VNode> | undefined {
	const slotMap: Record<string, (ctx: any) => VNode> = {};

	if(!slottedComponents) {
		return undefined;
	}

	function processItem(item: SlottedComponent): void {
		const {
			slotName = 'default',
			props,
			emits,
		} = item;

		if (typeof item === 'string') {
			throw new Error('String elements are not supported as properties.');
		}

		if (isVueComponent(item)) {
			item.component = {};
			type SlotKey = keyof SlottedComponent
			for (const index of Object.keys(item)) {
				item.component[index] = item[index as SlotKey];
				if (index !== "component") {
					delete item[index as SlotKey];
				}
			}
		}

		const slots = item.slots ? handleSlots(item.slots) : undefined;

		slotMap[slotName] = (ctx) => {
			const data = readonly(
				mergeProps({ ...props, ...emits }, { ...ctx }),
			);
			return h(item.component, data, slots);
		};
	}

	toArray(slottedComponents).forEach(processItem);

	return slotMap;
}
