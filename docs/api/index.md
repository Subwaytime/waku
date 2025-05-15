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
  inheritAttrs: true
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

## MountOptions
All available options to be passed over to `mountComponent` and `createSlot`.
```ts
export interface BaseOptions<C> {
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

## MountedComponentInstance
Return value of `mountComponent`.
```ts
export interface MountedComponentInstance {
  id: string
  vNode: VNode
  el?: RendererElement | Element | null
  destroy: () => void
}
```

## DefaultProps
These Props are automatically generated and passed over to each component that is mounted via `mountComponent`!
```ts
export interface InternalProps {
  wakuMountedId?: string
  isProgrammatic?: boolean
  onDestroy: () => void
}
```
