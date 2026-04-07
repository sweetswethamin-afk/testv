import { chromium, FullConfig } from '@playwright/test';
import { ENV } from './../conf/env';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(ENV.BASE_URL);

  await page.locator('#user-name').fill(ENV.USER_NAME);
  await page.locator('#password').fill(ENV.PASSWORD);
  await page.locator('#login-button').click();

  // Optionally wait for login success
  await page.waitForURL('**/inventory.html');

  await page.context().storageState({ path: 'state.json' });
  await browser.close();
}

export default globalSetup;