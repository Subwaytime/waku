<h2 align="left">Vue Mountable</h2>

<p align="left">
Vue Mountable is a tiny DOM Library for Vue 3.
</p>

<p align="left">
<a href="https://www.npmjs.com/package/vue-mountable">
<img src="https://img.shields.io/npm/v/vue-mountable?color=222&style=flat-square"></img>
</a>
</p>

## Features

• 🤏 Tiny - Only 2.85KB min
<br />
• 💚 Native Vue 3
<br />
• ⚡ Fast & Simple - no config required!
<br />
• 🔥 Hot-Module Reloading for `vite`
<br />
• 🫒 Usable outside of `setup` lifecycle
<br />
• 🌊 Support for `defineComponent`, `defineAsyncComponent`, `h` and more!

## Usage

Install

```bash
bun i vue-mountable

#npm
npm i vue-mountable

# pnpm
pnpm i vue-mountable
```

Add it to `main.js`

```ts
import { VueMountable } from 'vue-mountable';

// created vue instance
app.use(VueMountable());
```

## Getting Started

```ts
import { mountComponent } from 'vue-mountable';
import component from 'component.vue';

const { id, vNode, el, destroy } = mountComponent(component);
```

<a href="https://github.com/Subwaytime/vue-mountable/tree/main/example">Checkout Examples</a>

## Configuration

Current available Function Parameters:

```ts
import {
	mountComponent, // mount function
	unmountComponent, // unmount function
	unmountAllComponents, // unmount all mounted items
	useMountable // contains vue instance and items
} from 'vue-mountable';

mountComponent({
  /**
  * Vue Component File
  */
  component,

  /**
   * Native Vue Props
   */

  props: {},

  /**
   * Vue Slot Components
   * Array with Vue Components or Object array with Mount Options: component, slots, props, target, slot
   * @props {}
   * @slots []
   * @target string
   * @slot string
   */
  slots: [],

  /**
   * Teleportation Target
   * Can be defined in the loaded component or here
   * Note: If the component has a target prop, it will override this option
   * String referencing an DOM Target
   */
  target: '',
});

unmountComponent(
  /**
   * Mounted Component ID
   */

  id
);

unmountAllComponents();
```

## License

MIT License © 2021-PRESENT [Leon Langer](https://github.com/subwaytime)
