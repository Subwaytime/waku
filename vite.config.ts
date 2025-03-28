import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

/*
|--------------------------------------------------------------------------
| Vite Configuration
|--------------------------------------------------------------------------
*/

const externals = [
    'vue',
];

export default defineConfig({
    build: {
        target: 'esnext',
        lib: {
            entry: resolve(__dirname, './src/index.ts'),
            name: 'waku',
            formats: ["es"],
            fileName: (format, name) => {
                return `${name}.${format === 'es' ? 'js' : 'umd.cjs'}`;
            },
        },
        minify: true,
        emptyOutDir: false,
        outDir: 'dist',
        rollupOptions: {
            external: externals,
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    resolve: {
        alias: [
            {
                find: '~/',
                replacement: `${resolve(__dirname, 'src')}/`,
            },
        ],
        dedupe: ['vue'],
    },
    plugins: [
        dts({
            outDir: './dist',
            entryRoot: './src',
            strictOutput: false,
            copyDtsFiles: true,
        }),
    ],
    // logLevel: 'error',
    optimizeDeps: {
        include: [...externals],
    },
});
