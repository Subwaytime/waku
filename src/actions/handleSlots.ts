import { type VNode, h, mergeProps, readonly } from 'vue';
import { isVueComponent, toArray } from '../utils';
import type { ExtractComponentProps, SlottedComponent } from '../types';

export function handleSlots(
	slottedComponents: SlottedComponent | SlottedComponent[],
): Record<string, (ctx: any) => VNode> {
	const slotMap: Record<string, (ctx: any) => VNode> = {};

	function processItem(item: SlottedComponent): void {
		const {
			slotName = 'default',
			props = {} as ExtractComponentProps<SlottedComponent['component']>,
			emits,
		} = item;

		if (typeof item === 'string') {
			throw new Error('String elements are not supported as properties.');
		}

		if (isVueComponent(item)) {
			(item as any).component = {} as any;
			for (const key of Object.keys(item as any)) {
				(item as any).component[key] = (item as any)[key];
				if (key !== 'component') {
					delete (item as any)[key];
				}
			}
		}

		const slots = item.slots ? handleSlots(item.slots) : undefined;

		slotMap[slotName] = (ctx: any) => {
			const data = readonly(
				mergeProps({ ...(props as any), ...emits }, { ...ctx }),
			);
			return h(item.component, data, slots);
		};
	}

	try {
		toArray(slottedComponents).forEach(processItem);
	} catch (error) {
		throw error;
	}

	return slotMap;
}
