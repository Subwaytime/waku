import dts from 'bun-plugin-dts';

export default await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  external: ['vue'],
  format: 'esm',
  plugins: [
    dts()
  ]
});

console.log('Build successful! ✅')
