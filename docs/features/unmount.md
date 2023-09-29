# Unmount
<br />
<div class="cleaner-text">
Vue Mountable allows you to gracefully remove a dynamically mounted Vue component from your application's DOM.
<br />
<br />
It simplifies the process of cleaning up and removing components that are no longer needed, helping you manage your application's resources efficiently.
<br />
<br />
When unmounting any components, they will also trigger their Lifecycle hooks like <code class="highlight">onUnmounted</code> etc and clean up the DOM.
</div>

## Basic
```ts
import modal from './components/modal.vue';

const { destroy } = mountComponent(modal);

destroy();
```

## Advanced
```ts
import { unmountComponent } from 'vue-mountable';
import modal from './components/modal.vue';

const currentComponent = ref(null);

function addModal() {
  currentComponent.value = mountComponent(modal);
}

function removeModal() {
  // OPTION 1
  currentComponent.value.destroy();

  // OPTION 2
  unmountComponent(currentComponent.value.id);
}
```

## via unmountComponent
<div class="cleaner-text">Unmounting a component is achieved by passing over its <code class="highlight">mountedId</code>, this will then clear the DOM and triggers the component's lifecycle hooks.</div>

```ts
import { unmountComponent } from 'vue-mountable';
import modal from './components/modal.vue';

const { id } = mountComponent(modal);

unmountComponent(id);
```

## via Emit
:::code-group
```ts [setup]
import modal from './components/modal.vue';

mountComponent(modal);
```

```vue [modal.vue]
<template>
  <button @click.prevent="$emit('destroy')">
    Close Modal
  </button>
</template>

<script setup>
const emit = defineEmits(['destroy']);
</script>
```
:::

## Cleanup everything
<div class="cleaner-text">
<code class="highlight">unmountAllComponents</code> removes all dynamically mounted Vue components from the DOM, providing a quick way to clean up and clear the application's interface.
<br />
<br />
This also kill any cached Components inside the Vue Mountable service.
</div>

```ts
import { unmountAllComponents } from 'vue-mountable';
unmountAllComponents();
```
