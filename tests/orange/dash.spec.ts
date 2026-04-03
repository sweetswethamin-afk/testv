import { test, expect } from '@playwright/test';

test('Search existing user by username in OrangeHRM Admin', async ({ page }) => {


   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
  await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');

    await expect(page.getByRole('heading', { name: 'System Users' }))
        .toBeVisible();
    const usernameField = page.locator('form input').nth(1);
    await usernameField.fill('Admin');

    await page.getByRole('button', { name: /^Search$/i }).click();

    const resultsTable = page.locator('.oxd-table-body');
    await expect(resultsTable).toBeVisible();
    await expect(resultsTable).toContainText('Admin');
});