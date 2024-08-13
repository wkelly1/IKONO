import pkg from './package.json';
import svgr from '@svgr/rollup';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  plugins: [
    external(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts', '.tsx', '.jsx'],
      presets: ['@babel/preset-typescript']
      // plugins: [ '@babel/external-helpers' ]
    }),
    resolve(),
    commonjs(),
    typescript({
      declaration: true /* Generates corresponding '.d.ts' file. */,
      declarationDir: `dist/types`
    })
  ]
};
