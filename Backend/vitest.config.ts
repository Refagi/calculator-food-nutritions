/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,  // Untuk menggunakan global seperti atob
    setupFiles: './mocks.ts',
    environment: 'node',
    env: {NODE_ENV: 'test'},
    testTimeout: 30000,
    hookTimeout: 30000
  },
});
