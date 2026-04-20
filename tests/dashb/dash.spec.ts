import { test, expect } from '@playwright/test';

test('Search existing user by username in OrangeHRM Admin', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  const username = page.locator('input[name="username"]');
  const password = page.locator('input[name="password"]');
  const loginButton = page.getByRole('button', { name: /login/i });

  await expect(username).toBeVisible();
  await expect(password).toBeVisible();

  await username.fill('Admin');
  await password.fill('admin123');
  await loginButton.click();

  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page).toHaveURL(/admin\/viewSystemUsers/);

  await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();

  // Fixed locator - matches OrangeHRM System Users page structure
  await page.locator('.oxd-input.oxd-input--active').first().fill('Admin');
  await page.getByRole('button', { name: /^Search$/i }).click();

  const resultsTable = page.locator('.oxd-table-body');
  await expect(resultsTable).toBeVisible();
  await expect(resultsTable).toContainText('Admin');
});