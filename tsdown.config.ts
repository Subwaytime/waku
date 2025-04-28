import { defineConfig } from 'tsdown';
import dts from 'vite-plugin-dts';
import vue from 'unplugin-vue/rolldown';

export default defineConfig({
    clean: true,
    entry: ['./src/index.ts'],
    external: ['vue'],
    format: ['es'],
    minify: true,
    outDir: 'dist',
    target: 'esnext',
    plugins: [
        vue(),
        // FIX: Move this to `dts: true` once the output is similiar to the vite-plugin-dts
        // Note: tsdown+dts builds take around ~60ms, tsdown+vite-plugin-dts ~1060ms and vite+vite-plugin-dts ~1120ms
        dts({
            outDir: './dist',
            entryRoot: './src',
            strictOutput: false,
            copyDtsFiles: true,
        }) as any
    ],
    onSuccess() {
        console.log('Build successful! ✅');
    }
});