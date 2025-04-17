import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    include: ['src/__tests__/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    deps: {
      optimizer: {
        web: {
          include: ['@testing-library/react']
        }
      }
    }
  }
}); 