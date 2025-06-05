import {
	hasInjectionContext,
	inject,
	type App,
} from 'vue';
import type { Emitter } from 'mitt';
import type { ValueOf } from 'type-fest';
import { WakuSymbol, MODULE_NAME } from '~/constants';
import { WakuData } from '~/types';

export const WakuEventsEnum = {
	ITEM_ADDED: 'item:added',
	ITEM_REMOVED: 'item:removed'
} as const;

export type WakuEvents = Record<ValueOf<typeof WakuEventsEnum>, string>;

export declare interface WakuPlugin {
	install: (app: App) => void;
}

export interface Waku extends WakuPlugin {
	id: string;
	instance?: App;
	items?: WakuItem[];
	addItem: (item: WakuItem) => void;
	getItem: (id: string) => false | WakuItem;
	removeItem: (id: string) => void;
	internal: Emitter<WakuEvents>;
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
export interface WakuItem extends Omit<WakuData, 'destroy'> {
	label?: string;
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
export function getActiveWaku(): Waku | undefined {
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
