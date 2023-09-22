# Mount
<br />
<div style="text-align: justify">
<code class="highlight">mountComponent</code> enables you to dynamically insert and control Vue components within your application.
<br />
<br />
It's ideal for creating interactive elements like popups, tooltips, modals, and more.
<br />
This function offers fine-grained configuration options and seamlessly integrates with Vue.js constructs, making it a versatile tool for enhancing your Vue applications.
</div>

## Use Cases:
- Create interactive popups and modals that appear on user interactions.
- Implement tooltips and context menus that dynamically display content.
- Build extensible and reusable UI elements that can be easily integrated into different parts of your Vue.js application.

Extending the functionality of their applications, like the old `Vue.extend`, is its main purpose by offering a versatile and intuitive way to manage dynamic components and enhance user interactions.

## Basic
```ts
import modal from './modal.vue';

const { id, vNode, el, destroy } = mountComponent(modal);
```

## Props

:::code-group
```ts [setup]
import modal from './modal.vue';

const { id, vNode, el, destroy } = mountComponent({
  component: modal,
  props: {
    title: 'Test'
  }
});
```
```vue [modal.vue]
<template>
  <div>
    {{ title }}
  </div>
</template>

<script setup>
  const props = defineProps({
    title: string
  });
</script>
```
:::

:::info
You can also simply pass over `ref/reactive` properties!
:::
```ts
import modal from './modal.vue';

const title = ref('Test');

const { id, vNode, el, destroy } = mountComponent({
  component: modal,
  props: {
    title
  }
});
```

## Emits
:::code-group
```ts [setup]
import modal from './modal.vue';

const { id, vNode, el, destroy } = mountComponent({
  component: modal,
  emits: {
    onExample() {
      alert('This works nicely!');
    }
  }
});
```
```vue [modal.vue]
<template>
  <button @click.prevent="$emit('example')">
    Party time!
  </button>
</template>

<script setup>
  const emit = defineEmits(['example']);
</script>
```
:::

## Slots
Slots allow you to chain multiple Components together, passing over props, emits or simply add more slots!

:::code-group
```ts [setup]
import modal from './modal.vue';

const { id, vNode, el, destroy } = mountComponent({
  component: modal,
  slots: [
    DefaultSlotComponent // Added to DEFAULT Slot
  ]
});
```
```vue [modal.vue]
<template>
  <slot />
</template>
```
:::

:::warning
Predefined props like this `<slot name="header" title="ok"></slot>`
will get overwritten by the props defined in the slots array.
:::
:::code-group
```ts [setup]
import modal from './modal.vue';

const { id, vNode, el, destroy } = mountComponent({
  component: modal,
  slots: [
    {
      slotName: 'header',
      component: HeaderSlotComponent,
      props: {
        title: 'I am the header slot!'
      }
    }
  ]
});
```
```vue [modal.vue]
<template>
  <slot name="header" v-bind="props" />
</template>

<script setup>
const props = defineProps({
  title: string
});
</script>
```
:::

## Teleport
With Teleport you can easily move components around your DOM!
<br />
More info can be found here <a href="https://vuejs.org/guide/built-ins/teleport.html"> Vue Docs Teleport </a>
```ts
import modal from './modal.vue';

const { id, vNode, el, destroy } = mountComponent({
  component: modal,
  target: '.notifications'
});
```

## via Store/Pinia
Vue Mountable supports mounting components outside of the Lifecycle `setup`.
<br />
So you can mount them from anywhere you'd like!
:::code-group
```ts [setup]
import { useExampleStore } from './store';
const { addModal } = useExampleStore();
```
```ts [store.ts]
import { defineStore } from 'pinia';
import { mountComponent } from 'vue-mountable';

import modal from '~components/modal.vue';

export const useExampleStore = defineStore('example', () => {
  function addModal() {
    return mountComponent(modal);
  }

  return {
    addModal
  }
});

```
:::

## Typescript
```ts
import type { MountedComponentInstance } from 'vue-mountable';
import modal from './modal.vue';

const currentComponent = ref<MountedComponentInstance | null>(null);
currentComponent.value = mountComponent(modal);
```
