// test-with-auth-state.ts

const { chromium } = require('@playwright/test');
import { ENV } from './conf/env';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(ENV.BASE_URL);

  await page.locator('#user-name').fill(ENV.USER_NAME);
  await page.locator('#password').fill(ENV.PASSWORD);
  await page.locator('#login-button').click();

  // Wait for navigation / login success (optional but recommended)
  await page.waitForURL('**/inventory.html'); // or your expected post-login URL

  // Save storage state
  await context.storageState({ path: 'state.json' });
  console.log('state.json created!');

  await browser.close();
})();