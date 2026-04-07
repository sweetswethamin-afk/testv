import { test, expect } from '@playwright/test';
import { ENV } from '../../conf/env';
import { addProductList, removeProductList } from '../../test-data/product';
import { PageEndpoints, sorting } from '../../constants/constant';
import { Inventory } from '../../pages/inventory';

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
    await page.goto(PageEndpoints.INVENTORY);
    for (const product of addProductList) {
      await page.getByText(product).click();
      await page.getByRole("button", { name: "Add to cart" }).click();
      await page.getByRole("button", { name: "Go back Back to products" }).click();
    }
    await page.locator("[data-test='shopping-cart-badge']").click();
    let allProductNames = await page.locator("[data-test='inventory-item-name']").allInnerTexts();
    expect(allProductNames, "Count of products in cart is not correct").toHaveLength(addProductList.length);
    expect(allProductNames, "Products in cart are not correct").toEqual(addProductList);
  });

  test("Remove a product from the cart", async ({ page }) => {
    await page.goto(PageEndpoints.INVENTORY);
    for (const product of addProductList) {
      await page.getByText(product).click();
      await page.getByRole("button", { name: "Add to cart" }).click();
      await page.getByRole("button", { name: "Go back Back to products" }).click();
    }
    for (const product of removeProductList) {
      let removeButton = product.replaceAll(" ", "-").toLowerCase();
      console.log(removeButton);
      await page.locator(`[data-test='remove-${removeButton}']`).click();
    }
    await page.locator("[data-test='shopping-cart-badge']").click();
    let allProductNames = await page.locator("[data-test='inventory-item-name']").allInnerTexts();
    expect(allProductNames, "Count of products in cart is not correct").toHaveLength(addProductList.length - removeProductList.length);
    expect(allProductNames, "Products in cart are not correct").not.toEqual(removeProductList);
    expect(allProductNames, "Products in cart are not correct").not.toEqual(addProductList);
  });

  test("Checkout the products", async ({ page }) => {
    await page.goto(PageEndpoints.INVENTORY);
    for (const product of addProductList) {
      await page.getByText(product).click();
      await page.getByRole("button", { name: "Add to cart" }).click();
      await page.getByRole("button", { name: "Go back Back to products" }).click();
    }
    await page.locator("[data-test='shopping-cart-badge']").click();
    await page.getByRole("button", { name: "Checkout" }).click();
    await page.getByRole("textbox", { name: "First Name" }).fill("Test");
    await page.getByRole("textbox", { name: "Last Name" }).fill("User");
    await page.getByRole("textbox", { name: "Zip/Postal Code" }).fill("12345");
    await page.getByRole("button", { name: "Continue" }).click();
    let allProductNames = await page.locator("[data-test='inventory-item-name']").allInnerTexts();
    expect(allProductNames, "Count of products in cart is not correct").toHaveLength(addProductList.length);
    expect(allProductNames, "Products in cart are not correct").toEqual(addProductList);
    await page.getByRole("button", { name: "Finish" }).click();
    await expect(page.getByText("Thank you for your order!")).toBeVisible();
    await page.getByRole("button", { name: "Back Home" }).click();
  });

  test("Logout", async ({ page }) => {
    await page.goto(PageEndpoints.INVENTORY);
    for (const product of addProductList) {
      await page.getByText(product).click();
      await page.getByRole("button", { name: "Add to cart" }).click();
      await page.getByRole("button", { name: "Go back Back to products" }).click();
    }
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.getByText("Logout").click();
    await expect(page.getByText("Swag Labs")).toBeVisible();
  });
});