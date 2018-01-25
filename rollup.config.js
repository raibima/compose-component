import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

const ugly = process.env.NODE_ENV === 'production' ? uglify : () => [];

export default [
  // UMD
  {
    input: 'src/compose.js',
    output: {
      name: 'compose',
      file: pkg.browser,
      format: 'umd'
    },
    external: ['react'],
    globals: {
      react: 'React'
    },
    plugins: [
      babel({
        exclude: ['node_modules/**']
      }),
      resolve(),
      commonjs(),
      uglify()
    ].concat(ugly())
  },
  // CJS / ESM
  {
    input: 'src/compose.js',
    external: ['react'],
    globals: {
      react: 'React'
    },
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**']
      })
    ].concat(ugly())
  }
];
