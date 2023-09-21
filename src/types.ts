/// <reference lib="dom" />

import type { AllowedComponentProps, Component,
	RendererElement,
  TeleportProps,
  VNode,
  VNodeProps,
 } from 'vue';

export type ID = string;

type InternalProps = keyof VNodeProps | keyof AllowedComponentProps | keyof DefaultProps;
export type ExtractComponentProps<TComponent> = TComponent extends new () => { $props: infer P } ? P : never;
type ComponentProps<C extends Component> = C extends new (...args: any) => any
	? { [K in keyof InstanceType<C> as K extends InternalProps ? never : K]: InstanceType<C>; }
: never;

export type Options<C extends Component> = {
  component: C
	props?: ComponentProps<C>
	emits?: {
		[key: `on${Capitalize<string>}`]: (...args: any[]) => void
	}
	slots?: SlottedComponent | SlottedComponent[]
	target?: TeleportProps['to']
	// transition?: TransitionProps | TransitionGroupProps
	// immediate?: boolean
}

export interface SlottedComponent {
  slotName: string
  component: Component,
  props?: Record<any, any>
  slots?: SlottedComponent | SlottedComponent[]
}

export interface DefaultProps {
	mountedId?: ID
	isProgrammatic?: boolean
	onDestroy: () => void
}

export type MountOptions<C extends Component> = Component<C> | Options<C>;
export interface MountedComponentInstance {
  id: string
	vNode: VNode
  el: RendererElement | Element | null
  destroy: () => void
}

export interface ServiceItem {
	id: ID
	container: RendererElement
	element: HTMLElement | Element
}
