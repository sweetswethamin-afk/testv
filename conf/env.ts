import path from 'path';
import dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';

const testEnv = process.env.TEST_ENV || 'saucedemo';
const envFile = path.resolve(__dirname, `.env.${testEnv}`);

export const ENV = {
  BASE_URL: 'https://www.saucedemo.com/',
  USERNAME: 'standard_user',
  PASSWORD: 'secret_sauce',
  HEADLESS: true,
};

console.log('Loading env from:', envFile);

dotenv.config({
  path: envFile,
  override: true
});

console.log('BASE_URL after dotenv:', process.env.BASE_URL);

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env variable ${name} in ${envFile}`);
  }
  return value;
}

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: requireEnv('BASE_URL'),
    headless: process.env.CI ? true : process.env.HEADLESS === 'true',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
  
});
