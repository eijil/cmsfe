import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  minify: true,
  dts: true,
  sourcemap: true,
  external: ['react'],
  exclude: ['./eslintrc.cjs'],
  ...options,
}))
