import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'lan-dist', emptyOutDir: true, target: 'es2022',
    rollupOptions: { input: resolve('lan/index.html'), output: { entryFileNames: 'client.js', chunkFileNames: '[name]-[hash].js', assetFileNames: '[name][extname]' } },
  },
})
