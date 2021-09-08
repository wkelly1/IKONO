import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";

import resolve from "rollup-plugin-node-resolve";

import svgr from "@svgr/rollup";

export default {
  input: "index.js",
  output: {
    file: "dist/bundle.js",
    format: "es",
  },
  plugins: [
    external(),
    svgr(),
    babel({
      exclude: "node_modules/**",
      // plugins: [ '@babel/external-helpers' ]
    }),
    resolve(),
    commonjs(),
  ],
};
