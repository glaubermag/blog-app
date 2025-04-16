import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/utils/setupTests.tsx'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    typecheck: {
      checker: 'tsc',
    },
    deps: {
      inline: ['@testing-library/user-event'],
    },
  },
}); 