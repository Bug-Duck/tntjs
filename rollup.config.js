import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";

export default {
  input: "src/index.ts",
  preserveModules: true,
  treeshake: false,
  output: {
    format: "esm",
    sourcemap: true,
    dir: "./dist",
    name: "TNT"
  },
  plugins: [
    alias({
      entries: [
        { find: "runtime", replacement: "src/runtime" },
        { find: "plugins", replacement: "src/plugins" },
      ],
    }),
    resolve(),
    typescript(),
    serve(),
  ],
};
