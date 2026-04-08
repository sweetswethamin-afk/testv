import { Page, Locator } from '@playwright/test';

export class Cart {
  readonly page: Page;
  readonly checkoutBtn: Locator;
  readonly cartItems: Locator;
  readonly addToCartBtn: Locator;
  readonly backBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
    this.cartItems = page.locator('[data-test="inventory-item-name"]');
    this.addToCartBtn = page.getByRole('button', { name: 'Add to cart' });
    this.backBtn = page.getByRole('button', { name: 'Go back Back to products' });
  }

  async AddToCart() {
    await this.addToCartBtn.click();
  }

  async GoBackToProducts() {
    await this.backBtn.click();
  }

  async clickCheckout() {
    await this.checkoutBtn.click();
  }

  async getProducts() {
    return await this.cartItems.allInnerTexts();
  }
}