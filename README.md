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

• Native Vue 3 Teleport
<br />
• Slotting, Events & Props
<br />
• use `inject` and `provide`
<br />
• Mount multiple Children Components
<br />
• Mount HTML Tag's
<br />
• Support for `defineComponent` and `defineAsyncComponent`
<br />
• Support for multiple Vue Instances
<br />
• Hot-Module Reloading for `vite`
<br />
• can be used outside of `setup` lifecycle

## Usage

Install

```bash
npm i vue-mountable
```

Add it to `main.js`

```ts
import { VueMountable } from 'vue-mountable';

// created vue instance
app.use(VueMountable());
```

## Getting Started

```html
// main.vue

<script setup>
	import { mount, destroy } from 'vue-mountable';
	import test from 'components/test.vue';

	function addTest() {
		mount(test, {
			props: {
				message: 'This is a Test Component!'	
			}
		});
	}
</script>
```

```html
// test.vue
<template>
	<div ref="test">
		{{ message }}

		<button @click.prevent="close">Remove Test Component</button>
	</div>
</template>

<script setup>
	import { destroy } from 'vue-mountable';

	defineProps({
		message: {
			type: String
		}
	});
	
	const test = ref(null);
	
	function close() {
		destroy(test.value);
	}
</script>
```

## Examples

Tiny List of what you can easily add with Mountable:

-   [Notifications](https://github.com/Subwaytime/vue-mountable/blob/main/example/src/utils/useNotify.js)
-   [Modal](https://github.com/Subwaytime/vue-mountable/blob/main/example/src/components/modal.vue)
-   [Tag](https://github.com/Subwaytime/vue-mountable/blob/main/example/src/components/tagBody.vue)
-   [Snackbar](https://github.com/Subwaytime/vue-mountable/blob/main/example/src/components/snackbar.vue)

Also, checkout the [App Component](https://github.com/Subwaytime/vue-mountable/blob/main/example/src/app.vue) for more Ideas!

## Configuration

Current available Function Parameters:

```ts
import {
	mount, // mount function
	destroy, // destroy function
	destroyAll, // destroy all mounted elements
	useMountable // contains vue instance and elements
} from 'vue-mountable';

mount(
	/**
	* Vue Component File
	*/
	component,
	{
		/**
		 * Native Vue Props
		 */

		props: {},

		/**
		 * Vue Children Components
		 * Array with Vue Components or Object array with Mount Options: component, children, props, target, slot
		 * @props {}
		 * @children []
		 * @target string
		 * @slot string
		 */
		children: [],

		/**
		 * Teleportation Target
		 * Can be defined in the loaded component or here
		 * Note: If the component has a target prop, it will override this option
		 * String referencing an DOM Target
		 */
		target: '',
	},
);

destroy(
	/**
	 * DOM Element
	 */

	element,
);

destroyAll();
```

## Limitations
Devtool support is currently in testing! That means added Components wont be visible in Devtools for now..

## License

MIT License © 2020-PRESENT [Leon Langer](https://github.com/subwaytime)
