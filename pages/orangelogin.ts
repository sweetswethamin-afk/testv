import { expect, Locator, Page } from '@playwright/test';

export class Login {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly dashboardHeader: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
    this.errorMessage = page.locator('.oxd-alert-content-text');
  }

  async goto() {
    await this.page.goto('/auth/login');
  }

  async loginToApp(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginPageLoaded() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async verifyDashboardLoaded() {
    await expect(this.page).toHaveURL(/dashboard\/index/);
    await expect(this.dashboardHeader).toBeVisible();
  }

  async verifyInvalidLogin() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText('Invalid credentials');
  }
}