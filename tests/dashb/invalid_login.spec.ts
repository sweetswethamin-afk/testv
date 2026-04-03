import { test, expect } from '@playwright/test';

test('OrangeHRM invalid login', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('swe');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid credentials')).toBeVisible();
});