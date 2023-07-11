import ts from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
	input: 'src/index.ts',
	external: ['@sentry/node'],
	output: {
		file: './dist/index.js',
		name: 'error',
		format: 'cjs',
		exports: 'named',
		compact: true
	},
	plugins: [
		ts(),
		nodeResolve(),
		commonjs()
	]
};
