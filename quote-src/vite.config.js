import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Hosted at https://yukselono.github.io/sunx-sense/quote/
  base: '/sunx-sense/quote/',
  build: {
    outDir: '../quote',
    emptyOutDir: true,
  },
})
