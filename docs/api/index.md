# API

Lorem ipsum....

## mountComponent
```ts
mountComponent({
  component: null,
  props: {},
  slots: [],
  target: '',
});
```

## MountOptions
```Ts
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

## unmountComponent
```ts
/**
 * Unmount a single mounted Component
 * Clears the DOM and triggers Lifecycle hooks
 * @param Mounted ID
 */
unmountComponent(id);
```

## unmountAllComponents
```ts
/**
 * Unmount all mounted components
 * Clears the DOM and triggers Lifecycle hooks
 */
unmountAllComponents();
```

## MountedComponentInstance
```ts
export interface MountedComponentInstance {
  id: string
  vNode: VNode
  el: RendererElement | Element | null
  destroy: () => void
}
```
