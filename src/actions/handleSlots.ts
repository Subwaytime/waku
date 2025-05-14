import { type VNode, h, mergeProps, readonly } from 'vue';
import { toArray } from '~/utils';

export function handleSlots(input: any): Record<string, (ctx: any) => VNode> | undefined {
    // TODO: Check if input is a handledSlot or an array
    const slotMap: Record<string, (ctx: any) => VNode> = {};

    const nodes = Object.entries(input);

    function processItem(item: any): void {
        const slotName = item[0] ?? 'default';

        const {
            component,
            data
        } = item[1];

        const slots = item.slots ? handleSlots(item.slots) : undefined;

        slotMap[slotName] = (ctx) => {
            const slotData = readonly(
                mergeProps({ ...data }, { ...ctx }),
            );
            return h(component, slotData, slots);
        };
    }

    toArray(nodes).forEach(processItem);
    return slotMap;
}