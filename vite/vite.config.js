import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: '/onboarding.html' },
  build: {
    rollupOptions: {
      input: {
        onboarding: resolve(__dirname, 'onboarding.html'),
        gamification: resolve(__dirname, 'gamification.html'),
        tiers: resolve(__dirname, 'tiers.html'),
        consent: resolve(__dirname, 'consent.html'),
        signup: resolve(__dirname, 'signup.html'),
      },
    },
  },
});
