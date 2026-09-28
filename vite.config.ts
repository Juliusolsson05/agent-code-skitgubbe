import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { extensionViteConfig } from 'agent-code-extension-api'

// Build config for the extension, copied from Mini Games on purpose so both repos
// fail and get fixed the same way.
//
// extensionViteConfig() supplies the load-bearing parts for independent v2 runtime
// and view modules, process.env.NODE_ENV (the frames have no `process`) and
// browser-safe shared chunks. The view inlines its CSS so the modal has one
// deterministic stylesheet lifecycle owned by mount/cleanup.
//
// IMPORTANT: always `NODE_ENV=production npm run build`. A dev-mode build makes
// @vitejs/plugin-react emit the jsxDEV transform, which is undefined in the
// sandboxed frame ("jsxDEV is not a function"). Install with NODE_ENV=development
// (to keep vite), build with NODE_ENV=production.
const preset = extensionViteConfig({ entries: {
  runtime: 'src/runtime.ts',
  view: 'src/view.ts',
  lanView: 'src/lanView.tsx',
} }) as UserConfig

export default defineConfig({
  plugins: [react()],
  define: preset.define,
  build: {
    ...preset.build,
    minify: 'esbuild',
    target: 'es2022',
    emptyOutDir: true,
    outDir: 'dist',
  },
})
