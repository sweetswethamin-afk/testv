// global-setup.ts
import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage();
  console.log('CI:', process.env.CI);
console.log('PWDEBUG:', process.env.PWDEBUG);

  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(process.env.USERNAME!);
  await page.locator('[data-test="password"]').fill(process.env.PASSWORD!);
  await page.locator('[data-test="login-button"]').click();

  await page.context().storageState({ path: 'state.json' });
  await browser.close();
}

export default globalSetup;