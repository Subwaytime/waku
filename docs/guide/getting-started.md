# Getting Started

Waku is a flexible plugin that simplifies the process of mounting components in your Vue applications. Whether you want to create popups, tooltips, or other dynamically mountable elements, Waku has you covered.


## Installation
:::code-group
```txt [bun]
bun add @subwaytime/waku
```
```txt [npm]
npm add @subwaytime/waku
```
```txt [pnpm]
pnpm add @subwaytime/waku
```
:::

## Usage

Once you've installed Waku, you can start using it in your Vue application.
<br />
Here's a basic example of how to get started:
<br />
<br />

1. Import Waku Plugin
In your Vue component or main JavaScript file, import `createWaku`:
```ts
import { createApp } from 'vue';
import { createWaku } from '@subwaytime/waku';
import App from './app.vue';

const instance = createApp();
instance.use(createWaku());
instance.mount(App);
```
2. Add WakuMointPoint to your vue mount component
```vue
> app.vue
<template>
  <WakuMointPoint />
</template>
```
3. Create a mountable Component
```vue
<template>
  <div>
    <h1> MODAL </h1>
  </div>
</template>
```
4. Mount your component

<<< @/snippets/addComponent.ts#snippet

<br />
Check out the <a href="/features/mount">features</a> for detailed information on configuration options and advanced usage.
<br />
<br />
That's it! You've successfully integrated Waku into your Vue application. Feel free to explore the library's features and customize mountable components to suit your needs.
<br />
<br />
Happy mounting!
