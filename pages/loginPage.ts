import { Page, Locator, expect } from '@playwright/test';
import { ENV } from '../conf/env';

export class LoginPage {
  private page: Page;
  private userNameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async goto() {
    await this.page.goto(ENV.BASE_URL);
  }

  async login(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithEnvCredentials() {
    await this.login(ENV.USER_NAME, ENV.PASSWORD);
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory.html/);
  }
}