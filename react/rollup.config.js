import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
export default {
  input: "index.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },

  external: ["react", "react-proptypes"],
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**",
    }),
  ],
};
