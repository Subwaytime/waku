import {
    AppContext,
    type DefineComponent,
    h,
    Teleport,
    VNode,
} from 'vue';

import {
    mergeProps,
    readonly,
    createVNode,
} from 'vue';

import { defu } from 'defu';

import { generateID } from '~/utils';
import { handleSlots } from '~/actions/handleSlots';
import { Waku } from '~/core';

export function prepareData(input: any, defaultProps: any, defaultOptions: any, waku?: Waku): { id: string, vNode: VNode, opt: any } {
    const wrappedOptions = 'component' in input
        ? input
        : { component: input };

    const opt = defu({}, { ...defaultOptions, ...wrappedOptions }) as any;

    const id: string = generateID();
    const component = opt.component as DefineComponent;

    const data = readonly(
        mergeProps(defaultProps(id), {
            ...opt.props ?? {},
            ...opt?.emits ?? {}
        })
    );

    component.inheritAttrs = opt.inheritAttrs;
    const slots = opt.slots ? handleSlots(opt.slots) : undefined;
    let vNode = createVNode(component, data, slots);

    if (opt.target) {
        const teleporter = h(Teleport as any, { to: opt.target });
        vNode = h(teleporter, vNode);
    }

    if(waku) {
        vNode.appContext = waku?.instance?._context as AppContext;
    }

    return {
        id,
        vNode,
        opt
    };
}