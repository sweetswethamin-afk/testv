import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  static fillCheckoutInfo(firstName: any, string: any, lastName: any, string1: any, zipCode: any, string2: any) {
    throw new Error('Method not implemented.');
  }
  static getCheckoutProducts() {
    throw new Error('Method not implemented.');
  }
  static finishOrder() {
    throw new Error('Method not implemented.');
  }
  static verifyOrderPlaced() {
    throw new Error('Method not implemented.');
  }
  static backHome() {
    throw new Error('Method not implemented.');
  }
  readonly page: Page;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly zipCode: Locator;
  readonly continueBtn: Locator;
  readonly finishBtn: Locator;
  readonly successMsg: Locator;
  readonly productNames: Locator;
  readonly backHomeBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.getByRole('textbox', { name: 'First Name' });
    this.lastName = page.getByRole('textbox', { name: 'Last Name' });
    this.zipCode = page.getByRole('textbox', { name: 'Zip/Postal Code' });

    this.continueBtn = page.getByRole('button', { name: 'Continue' });
    this.finishBtn = page.getByRole('button', { name: 'Finish' });

    this.successMsg = page.getByText('Thank you for your order!');
    this.productNames = page.locator("[data-test='inventory-item-name']");
    this.backHomeBtn = page.getByRole('button', { name: 'Back Home' });
  }

  async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zipCode.fill(zipCode);
    await this.continueBtn.click();

    await expect(this.finishBtn).toBeVisible();
  }

  async getCheckoutProducts() {
    return await this.productNames.allInnerTexts();
  }

  async finishOrder() {
    await this.finishBtn.click();
  }

  async verifyOrderPlaced() {
    await expect(this.successMsg).toBeVisible();
  }

  async backHome() {
    await this.backHomeBtn.click();
  }
  async clickCheckout() {
  await this.page.getByRole('button', { name: 'Checkout' }).click();
}
}