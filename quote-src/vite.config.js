import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Hosted at https://yukselono.github.io/sunx-sense/quote/
  base: '/sunx-sense/quote/',
  build: {
    // Output one level up into the sunx-sense root, in /quote/
    outDir: '../quote',
    emptyOutDir: true,
  },
})
