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
instance.use(VueMountable);
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
- [Modal](https://github.com/Subwaytime/vue-mountable/blob/main/example/src/utils/useModal.js)

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
		 * Vue Props
		 */

		props: {
			/**
			 * Teleportation Target
			 * Can be defined in the loaded component or here
			 * Note: As a component prop it will override the option here
			 */
			target : ''
		},

		/**
		 * Vue Children Components
		 * can be defined the same as another mount call would
		 */
		children: [],

		/**
		 * Vue Slot Mechanic
		 */
		slot: 'default'
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
- Remove Teleported Vue 3 Message from DOM (can get messy after multiple usage)

Let me know if there are other Features that would work well with this Library!

## License

MIT License © 2020-2021 [Leon Langer](https://github.com/subwaytime)
