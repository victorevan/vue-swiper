import fs from "fs-extra";
import path from "path";
import vue from "rollup-plugin-vue";
import babel from "rollup-plugin-babel";
import css from "rollup-plugin-css-only";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

fs.emptyDirSync(path.resolve(__dirname, "./dist"));

const INPUT = "src/components/index.js";

const EXTERNAL = ["lodash/kebabCase", "lodash/merge", "vue-runtime-helpers"];

const PLUGINS = [
  babel({
    presets: ["@vue/babel-preset-jsx"],
    exclude: "node_modules/**"
  }),
  resolve(),
  commonjs(),
  css(),
  vue({
    css: false,
    template: {
      isProduction: true
    }
  })
];

let generatedBuilds = [
  {
    input: INPUT,
    output: {
      file: "dist/vue-swiper.esm.js",
      format: "esm",
      exports: "named"
    },
    external: EXTERNAL,
    plugins: PLUGINS
  },
  {
    input: INPUT,
    output: {
      file: "dist/vue-swiper.cjs.js",
      format: "cjs",
      exports: "named"
    },
    external: EXTERNAL,
    plugins: PLUGINS
  }
];

export default generatedBuilds;
