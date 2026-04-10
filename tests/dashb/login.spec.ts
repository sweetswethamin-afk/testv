import { test, expect } from '@playwright/test';

test('OrangeHRM login', async ({ page }) => {
  await page.goto('/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill(process.env.USERNAME!);
  await page.getByPlaceholder('Password').fill(process.env.PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/dashboard\/index/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});