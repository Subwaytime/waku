import {
    mergeProps,
    readonly,
    createVNode,
    type DefineComponent
} from 'vue';
import { defu } from 'defu';
import type { Options, BaseOptions } from '~/types';
import { generateID } from '~/utils';
import { handleSlots } from '~/actions/handleSlots';

export interface Slot<C> {
    id: string;
    vNode: ReturnType<typeof createVNode>;
    __handled: boolean;
};

export function createSlot<C>(input: Options<C>): Slot<C> {
    const wrappedOptions = 'component' in input
        ? input
        : { component: input };

    const defaultOptions = {
        inheritAttrs: false,
        immediate: true,
    } as const;

    const opt = defu({}, { ...defaultOptions, ...wrappedOptions }) as BaseOptions<C>;

    const id: string = generateID();
    const component = opt.component as DefineComponent;

    const defaultProps = {
        'waku-slot-id': id,
    } as const;

    const data = readonly(
        mergeProps(defaultProps, {
            ...opt.props ?? {},
            ...opt?.emits ?? {}
        })
    );

    const slots = opt.slots ? handleSlots(opt.slots) : null;
    const vNode = createVNode(component, data, slots);

    return {
        id,
        vNode,
        __handled: true
    }
}