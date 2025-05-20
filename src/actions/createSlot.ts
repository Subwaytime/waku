import {
    readonly,
    mergeProps,
    type DefineComponent,
} from 'vue';
import { defu } from 'defu';

import { generateID } from '~/utils';
import { handleSlots } from '~/actions/handleSlots';
import { useWaku } from '~/core';
import { MODULE_NAME } from '~/constants';
import type { DefaultSlotProps, Options, WakuSlot } from '~/types';
import { __isWakuSlot } from '~/constants';

export function createSlot<C>(input: Options<C>): WakuSlot {
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
        wakuSlotId: id,
    } as const satisfies DefaultSlotProps;

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
        slots,
        [__isWakuSlot]: true
    }
}