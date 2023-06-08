import { DefaultProps } from "./types";

export const MODULE_NAME = 'vue-mountable';
export let MountableServiceSymbol: Symbol = Symbol();

export const defaultProps = {
  programmatic: false,
  visible: false,
} satisfies DefaultProps;
