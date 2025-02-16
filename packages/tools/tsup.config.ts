import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
   entry: [
    'src/index.ts',
    'src/env.ts',
    'src/service/index.ts'
  ],
  format: ['cjs', 'esm', 'iife'],
  globalName: 'CmsfeTools',
  minify: !options.watch,
  dts: true,
  sourcemap: !!options.watch,
  clean:true,
  external: ['react'],
  exclude: ['./eslintrc.cjs'],
  platform: 'browser',
  ...options,
}))
