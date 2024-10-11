import {
	hasInjectionContext,
	inject,
	type App,
	type VNode,
	type RendererElement,
} from 'vue';
import { WakuSymbol, MODULE_NAME } from './constants';

/**
 *
 */
export interface Waku {
	id: string;
	instance?: App;
	items?: WakuItem[];
	install: (app: App) => void;
	addItem: (item: WakuItem) => void;
	getItem: (id: string) => false | WakuItem;
	removeItem: (id: string) => void;
}

/**
 *
 */
interface SetActiveWaku {
	(waku: Waku): Waku;
	(waku: undefined): undefined;
	(waku: Waku | undefined): Waku | undefined;
}

/**
 *
 */
export interface WakuItem {
	id: string;
	label: string;
	el: Element | HTMLElement | RendererElement | null;
	vNode: VNode | null;
}

/**
 *
 */
let activeWaku: Waku | undefined;

/**
 *
 * @param waku
 * @returns
 */
export function setActiveWaku(waku: Waku | undefined): SetActiveWaku {
	// @ts-expect-error: cannot constrain the type of the return
	// biome-ignore lint/suspicious/noAssignInExpressions:
	return (activeWaku = waku);
}

/**
 *
 * @param waku
 */
export function getActiveWaku() {
	return (hasInjectionContext() && inject(WakuSymbol)) || activeWaku;
}

/**
 *
 */
export function useWaku(waku?: Waku | null): Waku {
	const hasContext = hasInjectionContext();
	// biome-ignore lint/style/noParameterAssign:
	waku = hasContext ? inject(WakuSymbol, null) : null;

	if (waku) {
		setActiveWaku(waku);
	}

	if (!activeWaku) {
		throw new Error(`[${MODULE_NAME}]: No Waku Instance provided!`);
	}

	// biome-ignore lint/style/noNonNullAssertion:
	// biome-ignore lint/style/noParameterAssign:
	waku = activeWaku!;

	return waku;
}
