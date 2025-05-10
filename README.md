<h2 align="left">Waku</h2>

<p align="left">
Waku is a tiny DOM Library for Vue 3.
</p>

<p align="left">
<a href="https://www.npmjs.com/package/vue-mountable">
<img src="https://img.shields.io/npm/v/vue-mountable?color=222&style=flat-square"></img>
</a>
</p>

## Features

• 🤏 Tiny - Only 3.8KB min
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
# bun
bun i @subwaytime/waku

# npm
npm i @subwaytime/waku

# pnpm
pnpm i @subwaytime/waku
```

Add it to `main.js`

```ts
import { createWaku } from '@subwaytime/waku';

// created vue instance
app.use(createWaku());
```

## Getting Started

```ts
import { mountComponent } from '@subwaytime/waku';
import component from 'component.vue';

const { id, vNode, el, destroy } = mountComponent(component);
```

## Documentation
For the full documentation, visit <a href="https://vue-mountable.netlify.app" target="_blank" rel="noreferrer">vue-mountable.netlify.app</a>
<br />
For NPM, visit <a href="https://www.npmjs.com/package/vue-mountable" target="_blank" ref="noreferrer"> npmjs.com/package/vue-mountable </a>

## License

MIT License © 2021-PRESENT [Leon Langer](https://github.com/subwaytime)
