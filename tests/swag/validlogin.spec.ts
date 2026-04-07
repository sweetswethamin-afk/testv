import { test, expect } from '@playwright/test';
import { ENV } from '../../conf/env';
import { LoginPage } from '../../pages/loginPage';

test('saucedemo login success', async ({ page }) => {
  await page.goto(ENV.BASE_URL);

  await page.locator('#user-name').fill(ENV.USER_NAME);
  await page.locator('#password').fill(ENV.PASSWORD);
  await page.locator('#login-button').click();

    
});