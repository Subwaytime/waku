# API Reference

## mountComponent
Mount a component, pass over props, slots and teleport it.

```ts
mountComponent(component);

mountComponent({
  component: null,
  props: {},
  emits: {},
  slots: {},
  target: '',
  inheritAttrs: true,
  immediate: true,
  transition: ''
});
```

## unmountComponent
Unmount a component via its `mountedId`.
```ts
unmountComponent(id);
```

## unmountAllComponents
Unmount all currently mounted components.
```ts
unmountAllComponents();
```

## BaseOptions
All available options to be passed over to `mountComponent` and `createSlot`.
```ts
interface BaseOptions<C> {
	component?: C;
	props?: ResolvedProps<C>;
	emits?: BaseEmits<C>;
	slots?: BaseSlots<C>;
	inheritAttrs?: boolean;
	immediate?: boolean;
	target?: TeleportProps['to'];
	transition?: TransitionProps | TransitionGroupProps
};
```

## WakuData
Return value of `mountComponent`.
```ts
interface WakuData {
  id: string
  vNode: VNode
  el?: RendererElement | Element | null
  visible: ShallowRef<boolean>
  destroy: () => void
}
```

## WakuSlot
```ts
interface WakuSlot {
	id: string;
	component: Component;
	data: any;
	slots: any;
	[__isWakuSlot]: boolean;
};
```

## DefaultProps
These Props are automatically generated and passed over to each component that is mounted via `mountComponent`!
```ts
interface WakuInternalProps {
	readonly wakuMountedId: string;
	readonly wakuSlotId: string;
	readonly wakuIsProgrammatic: boolean;
	onDestroy: () => void;
}
```
