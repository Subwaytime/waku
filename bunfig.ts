export default await Bun.build({
	entrypoints: ['./src/index.ts'],
	outdir: './dist',
	minify: true,
	external: ['vue'],
	format: 'esm',
});

console.log('Build successful! ✅');
