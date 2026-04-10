import path from 'path';
import dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';

const envFile = path.resolve(__dirname, '.env.orangehrm');
console.log('Loading env from:', envFile);

const result = dotenv.config({ path: envFile, override: true });
console.log('dotenv result:', result);
console.log('BASE_URL:', process.env.BASE_URL);
console.log('USERNAME:', process.env.USERNAME);

if (result.error || !process.env.BASE_URL) {
  throw new Error(`Failed to load .env.orangehrm: ${result?.error?.message}`);
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} in ${envFile}`);
  }
  return value;
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: requireEnv('BASE_URL'),
    headless: process.env.HEADLESS === 'true',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'Login',
      testMatch: '**/login.spec.ts',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'Dashboard',
      testMatch: '**/dash.spec.ts',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', storageState: 'state.json' },
      dependencies: ['Login']
    },
  ],
});
/*import { defineConfig, devices } from '@playwright/test';
import {ENV} from './conf/env'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
/*import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
/*export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  //fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  /*use: {
    baseURL: ENV.BASE_URL,
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure'
  },*/

  /*projects: [
  {
    name: 'cart',
    testMatch: 
  /*  use: {
      ...devices['Desktop Chrome'],
      channel: 'chrome',
      storageState: undefined,
    },
  },
]*/
  /*use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
   /*baseURL: 'https://opensource-demo.orangehrmlive.com',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },*/

  /* Configure projects for major browsers */
  /*projects: [
    {
      name: 'Login',
      testMatch: 'login.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
         storageState: undefined,
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

    
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  //],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

//});
