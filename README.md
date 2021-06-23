<h2 align="left">Vue Mountable</h2>

<p align="left">Vue 3 Component DOM Mounting</p>

<p align="left">
<a href="https://www.npmjs.com/package/vue-mountable">
<img src="https://img.shields.io/npm/v/vue-mountable?color=222&style=flat-square">
</a>
</p>

## Usage

Install

```bash
npm i vue-mountable -D
```

Add it to `main.js`

```ts
import { VueMountable } from 'vue-mountable'

// created vue instance
app.use(VueMountable);
```
## Getting Started

Vue Mountable is a tiny DOM Library for Vue 3.
It utilises internal Vue 3 features, such as `inject/provide` and `teleport` to mount Vue Components to the Dom.
`Slotting`, `Teleport`, `Props`, `Events` and multiple `children Components` are supported. HMR on `vite` is also working fine!

```html
// main.vue

<script>
import { useComponent } from 'vue-mountable';
import test from 'components/test.vue';

export default {
	setup() {
		const { mount, destroy } = useComponent();

		function addTest() {
			mount(test, {
				props: {
					message: 'This is a Test Component'
				}
			});
		}

		return {
			addTest
		}
	}
}
</script>
```
```html
// test.vue
<template>
	<div ref="test">
		{{ message }}

		<button @click.prevent="close">
			Remove Test Component
		</button>
	</div>
</template>

<script>
import { useComponent } from 'vue-mountable';

export default {
	name: 'test', // this needs to be defined
	props: {
		message: String
	},
	setup() {
		const test = ref(null); // template ref
		const { destroy } = useComponent();

		function close() {
			destroy(test.value);
		}

		return {
			close
		}
	}
}
</script>
```

## Examples
Tiny List of what you can do with Mountable:

- [Notifications](https://github.com/Subwaytime/vue-mountable/blob/main/example/src/utils/useNotify.js)
- [Modal](https://github.com/Subwaytime/vue-mountable/blob/main/example/src/app.vue)

## Configuration

Current available Function Parameters:

```ts
mount(
	/**
	 * Vue Component File
	 * needs to have the "name" attribute
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
		target : ''
	}
);

destroy(
	/**
	 * DOM Element
	 */

	element
);
```

## Limitations

At the Moment the `useComponent` Function is only available in the `setup` Lifecycle. This is due to the usage of `inject/provide` from Vue 3.
Also there is no Devtools Support, but its in the works! That means added Components wont be visible in Devtools for now..

## Roadmap
- Devtools Support
- Allow usage of `resolveComponent` and `resolveDynamicComponent` as well as `defineComponent` and `defineAsyncComponent`
- Remove teleported DOM Message after destroying an Element (it just gets messy after multiple mounting usages)

Let me know if there are other Features that would work well with this Library!

## License

MIT License © 2020-2021 [Leon Langer](https://github.com/subwaytime)
