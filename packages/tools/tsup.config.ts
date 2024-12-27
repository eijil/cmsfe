import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm', 'iife'],
  globalName: 'CmsfeTools',
  minify: true,
  dts: true,
  sourcemap: true,
  external: ['react'],
  exclude: ['./eslintrc.cjs'],
  platform: 'browser',
  ...options,
}))
