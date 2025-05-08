import {
    createVNode,
    readonly,
    mergeProps,
    h,
    type DefineComponent,
    type Component,
    type VNode,
    Teleport,
} from 'vue';
import { defu } from 'defu';

import { generateID } from '~/utils';
import { handleSlots } from '~/actions/handleSlots';
import { useWaku } from '~/core';
import { MODULE_NAME } from '~/constants';

// declare const _createSlotHandled: unique symbol;

export interface CreatedSlot {
    id: string;
    component: Component;
    data: any;
    slots: any;
    // [_createSlotHandled]: boolean;
};

export function createSlot<C>(input: any): CreatedSlot {
    const waku = useWaku();

    if (!waku.instance) {
        throw new Error(`[${MODULE_NAME}]: No Vue Instance for Waku was provided!`);
    }

    const wrappedOptions = 'component' in input
        ? input
        : { component: input };

    const id: string = generateID();

    const defaultOptions = {
        inheritAttrs: false,
        immediate: true,
    } as const;

    const defaultProps = {
        'waku-slot-id': id,
    } as const;

    const opt = defu({}, { ...defaultOptions, ...wrappedOptions }) as any;
    const component = opt.component as DefineComponent;

    const data = readonly(
        mergeProps(defaultProps, {
            ...opt.props ?? {},
            ...opt?.emits ?? {}
        })
    );

    component.inheritAttrs = opt.inheritAttrs;
    const slots = opt.slots ? handleSlots(opt.slots) : undefined;

    return {
        id,
        component,
        data,
        slots
        // [_createSlotHandled]: true
    }
}