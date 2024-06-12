import {defineConfig} from "tsup";

export default defineConfig({
  format: "esm",
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
  entry: ["src/index.ts"],
  outDir: "dist",
});
