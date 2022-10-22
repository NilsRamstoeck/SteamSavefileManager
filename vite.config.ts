import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: 'src/public',
  build: {
    outDir: '../../dist/compiled/src',
    emptyOutDir: true,
  },
  esbuild: 
  {
    keepNames: true
  }
})
