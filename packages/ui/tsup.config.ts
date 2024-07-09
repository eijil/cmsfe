import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  sourcemap: false,
  dts: true,
  external: ['react'],
  banner: { js: '"use client";' },
  ...options,
}))
