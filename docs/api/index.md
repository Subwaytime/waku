# API Reference

## mountComponent
Mount a component, pass over props, slots and teleport it.

```ts
mountComponent(component);

mountComponent({
  component: null,
  props: {},
  emits: {},
  slots: [],
  target: '',
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
All available options to be passed over to `mountComponent`.
```ts
export type MountOptions<C extends Component> = Component<C> | Options<C>;
export type Options<C extends Component> = {
  component: C
  props?: ComponentProps<C>
  emits?: {
    [key: `on${Capitalize<string>}`]: (...args: any[]) => void
  }
  slots?: SlottedComponent | SlottedComponent[]
  target?: TeleportProps['to']
}
```

## MountedComponentInstance
Return value of `mountComponent`.
```ts
export interface MountedComponentInstance {
  id: string
  vNode: VNode
  el: RendererElement | Element | null
  destroy: () => void
}
```

## SlottedComponent
Type for components that are passed over as slots to `mountComponent`.
```ts
export interface SlottedComponent {
  slotName: string
  component: Component,
  props?: Record<any, any>
  slots?: SlottedComponent | SlottedComponent[]
}
```

## DefaultProps
These Props are automatically generated and passed over to each component that is mounted via `mountComponent`!
```ts
export interface DefaultProps {
  mountedId?: string
  isProgrammatic?: boolean
  onDestroy: () => void
}
```
