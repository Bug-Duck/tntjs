import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  treeshake: true,
  output: {
    name: "TNT",
    file: "dist/tnt.min.js",
    format: "iife",
    sourcemap: true,
    exports: "named",
    minifyInternalExports: true,
  },
  plugins: [
    alias({
      entries: [
        { find: "runtime", replacement: "src/runtime" },
        { find: "plugins", replacement: "src/plugins" },
        { find: "utils", replacement: "src/utils" },
      ],
    }),
    resolve(),
    typescript(),
    babel({
      babelHelpers: "bundled",
      exclude: ["node_modules/**"]
    }),
    terser(),
  ],
};
