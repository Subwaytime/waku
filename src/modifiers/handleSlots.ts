import { VNode, h, mergeProps } from "vue";
import { isVueComponent, toArray, smarfUnref } from "../utils";
import { ExtractComponentProps, SlottedComponent } from "../types";

export function handleSlots(slottedComponents: SlottedComponent | SlottedComponent[]): Record<string, (ctx: any) => VNode> {
  let slotMap: Record<string, (ctx: any) => VNode> = {};

  function processItem(item: SlottedComponent): void {
    const {
      slotName = 'default',
      props = {} as ExtractComponentProps<SlottedComponent['component']>
    } = item;

    if (typeof item === 'string') {
      throw new Error('String elements are not supported as properties.');
    }

    if (isVueComponent(item)) {
      item.component = {} as any;
      for (const key of Object.keys(item) as any) {
        item.component[key] = item[key];
        if (key !== 'component') {
          delete item[key];
        }
      }
    }

    const slots: any = item.slots ? handleSlots(item.slots) : null;

    slotMap[slotName] = (ctx: any) => {
      const data = mergeProps({...smarfUnref(props)}, { ...ctx });
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
