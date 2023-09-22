# Getting Started

Vue Mountable is a flexible Vue.js plugin that simplifies the process of mounting components in your Vue.js applications. Whether you want to create popups, tooltips, or other dynamically mountable elements, Vue Mountable has you covered.


## Installation
:::code-group
```bun
bun add vue-mountable
```
```npm
npm add vue-mountable
```
```pnpm
pnpm add vue-mountable
```
:::

## Usage

Once you've installed Vue Mountable, you can start using it in your Vue.js application.
<br />
Here's a basic example of how to get started:
<br />
<br />

1. Import Vue Mountable
In your Vue component or main JavaScript file, import Vue Mountable:
```ts
import { createApp } from 'vue';
import { VueMountable } from 'vue-mountable';

const app = createApp();
app.use(VueMountable());
```
2. Create a mountable Component
```vue
<template>
  <div>
    <h1> MODAL </h1>
  </div>
</template>
```
3. Mount your component
```ts
import modal from './modal.vue';

const { id, vNode, el, destroy } = mountComponent(modal);
```
<br />
Check out the <a href="/features/mount">features</a> for detailed information on configuration options and advanced usage.
<br />
<br />
That's it! You've successfully integrated Vue Mountable into your Vue.js application. Feel free to explore the library's features and customize mountable components to suit your needs.
<br />
<br />
Happy mounting!
