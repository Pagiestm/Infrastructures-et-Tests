// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests/E2E',
  timeout: 60000,
  use: {
    browserName: 'chromium',
    headless: true,
    baseURL: 'http://localhost:5173',
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    timeout: 120000, 
    reuseExistingServer: !process.env.CI,
  },
});

