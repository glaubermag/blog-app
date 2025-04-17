import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/e2e/setup.ts'],
    testTimeout: 120000,
    hookTimeout: 120000,
    globals: true,
    include: ['src/__tests__/e2e/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    browser: {
      enabled: true,
      name: 'firefox',
      headless: true,
      provider: 'webdriver',
    },
  },
  server: {
    host: true,
    port: 5173,
  },
}); 