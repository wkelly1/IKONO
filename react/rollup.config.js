import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript";
import resolve from "rollup-plugin-node-resolve";

import svgr from "@svgr/rollup";

export default {
  input: "index.ts",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  plugins: [
    external(),
    svgr(),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".ts", ".tsx", ".jsx"],
      // plugins: [ '@babel/external-helpers' ]
    }),
    resolve(),
    commonjs(),
    typescript({
      declaration: true /* Generates corresponding '.d.ts' file. */,
      declarationDir: `dist/types`,
    }),
  ],
};
