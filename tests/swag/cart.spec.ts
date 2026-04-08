import { test, expect } from '@playwright/test';
import { ENV } from '../../conf/env';
import { addProductList, removeProductList } from '../../test-data/product';
import { PageEndpoints, sorting } from '../../constants/constant';
import { Inventory } from '../../pages/inventory';
import { Cart } from '../../pages/cartPage';
import { CheckoutPage } from '../../pages/checkout';
import { Logout } from '../../pages/logout';

test.describe("Inventory Feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ENV.BASE_URL);
    const inventory = new Inventory(page);
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory.html/);
  });

  test("Sort products by price (high to low)", async ({ page }) => {
    const inventory = new Inventory(page);
    let actualPrices = await (await inventory.selectSortingType(sorting.HIGH_TO_LOW)).getProductsPrice();
    let prices = await inventory.performSorting(sorting.HIGH_TO_LOW, actualPrices);
    expect(prices).toEqual(actualPrices);
  });

  test("Add a product to the cart", async ({ page }) => {
    const inventory = new Inventory(page);
    const cart = new Cart(page);
    const checkout = new CheckoutPage(page);

    for (const product of addProductList) {
      await inventory.selectProduct(product)
      await cart.AddToCart()
      await cart.GoBackToProducts()
    }

    await inventory.goShoppingCart()
    let allProductNames = await cart.getProducts();
    expect(allProductNames, "Count of products in cart is not correct").toHaveLength(addProductList.length)
    expect(allProductNames, "Products in cart are not correct").toEqual(addProductList)
  })
  test("Remove a product to the cart", async ({ page }) => {

    const inventory = new Inventory(page);
    const cart = new Cart(page);
    for (const product of addProductList) {
  await inventory.selectProduct(product);
  await cart.AddToCart();
  await cart.GoBackToProducts();
}
    await inventory.removeProducts(removeProductList)
    await inventory.goShoppingCart()


    await inventory.goShoppingCart();
    await cart.clickCheckout();
const checkout = new CheckoutPage(page);

await checkout.fillCheckoutInfo("Test", "User", "12345");

const products = await checkout.getCheckoutProducts();
expect(products).toHaveLength(
  addProductList.length - removeProductList.length
);

await checkout.finishOrder();
await checkout.verifyOrderPlaced();
await checkout.backHome();
console.log("INSTANCE METHOD CALLED");
  });


  test("Logout", async ({ page }) => {
    const menu = new Logout(page);

    await menu.logout();

    await expect(page).toHaveURL(/saucedemo/);
    await expect(page.locator('#login-button')).toBeVisible();
  });


});