import { defineConfig } from 'tsdown';
import vue from 'unplugin-vue/rolldown';

export default defineConfig({
    clean: true,
    entry: ['./src/index.ts'],
    external: ['vue'],
    format: ['es'],
    minify: false,
    outDir: 'dist',
    target: 'esnext',
    dts: true,
    plugins: [
        vue(),
    ],
    onSuccess() {
        console.log('Build successful! ✅');
    }
});