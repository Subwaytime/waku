import {
    type VNode,
} from 'vue';
import { prepareData } from '~/actions/prepareData';

declare const _createSlotHandled: unique symbol;

export interface CreatedSlot {
    id: string;
    vNode: VNode;
    [_createSlotHandled]: boolean;
};

export function createSlot<C>(input: any): CreatedSlot {
    const defaultOptions = {
        inheritAttrs: false,
        immediate: true,
    } as const;

    const defaultProps= (id: string) => ({
        'waku-slot-id': id,
    }) as const;

    const { id, vNode } = prepareData(input, defaultProps, defaultOptions);

    return {
        id,
        vNode,
        [_createSlotHandled]: true
    }
}