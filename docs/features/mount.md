# Mount
<br />
<div class="cleaner-text">
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

Extending the functionality of their applications, like `Vue.extend`, is its main purpose by offering a versatile and intuitive way to manage dynamic components and enhance user interactions.

## Basic
<<< @/snippets/addComponent.ts#snippet

## Props

:::code-group
<<< @/snippets/addComponentWithProps.ts#snippet [setup]
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

<!-- :::info
You can also simply pass over `ref/reactive` properties!
:::
<<< @/snippets/addComponentWithReactiveProps.ts#snippet -->

## Emits
:::code-group
<<< @/snippets/addComponentWithEmits.ts#snippet [setup]
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
<div class="cleaner-text">Slots allow you to chain multiple Components together, passing over props, emits or simply add more slots!</div>

:::code-group
<<< @/snippets/addComponentWithDefaultSlot.ts#snippet [setup]
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
<<< @/snippets/addComponentWithHeaderSlot.ts#snippet [setup]
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
More info can be found here [Vue Docs Teleport](https://vuejs.org/guide/built-ins/teleport.html)

<<< @/snippets/addComponentWithTeleport.ts#snippet

## via Store (Pinia)
<div class="cleaner-text">
Vue Mountable offers the flexibility to mount components outside of the standard Lifecycle <code class="highlight">setup</code>, allowing you to mount them from anywhere you like.
</div>

:::code-group
<<< @/snippets/viaStore.ts#snippet [setup]
<<< @/snippets/viaStore.ts#store [setup]
:::

## Typescript
```ts
import type { MountedComponentInstance } from '@subwaytime/waku';
import modal from './modal.vue';

const currentComponent = ref<MountedComponentInstance | null>(null);
currentComponent.value = mountComponent(modal);
```
