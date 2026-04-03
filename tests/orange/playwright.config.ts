import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    storageState: 'state.json',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Login',
      testMatch: 'login.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },

    },
    {
      name: 'Dashboard',
      testMatch: 'dash.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        storageState: 'state.json',
      },
      dependencies: ['Login']
    },
  ],
});