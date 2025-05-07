import { type VNode, h, mergeProps, readonly } from 'vue';
import { isVueComponent, toArray } from '~/utils';

export function handleSlots(input: any): Record<string, () => VNode> | undefined {
    // TODO: Check if input is a handledSlot or an array
    const slotMap: Record<string, (ctx: any) => VNode> = {};

    const nodes = Object.entries(input);

    function processItem(item: any): void {
        const { slotName = 'default'} = item[0];

        const {
            vNode,
            props,
            emits,
        } = item[1];

        const slots = item.slots ? handleSlots(item.slots) : undefined;

        slotMap[slotName] = (ctx) => {
            const data = readonly(
                mergeProps({ ...props, ...emits }, { ...ctx }),
            );
            return h(vNode, data, slots);
        };
    }

    toArray(nodes).forEach(processItem);
    return slotMap;
}