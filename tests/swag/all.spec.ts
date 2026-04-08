import { test, expect } from '@playwright/test';
import { ENV } from '../../config/env';
import { addProductList, removeProductList} from '../../test-data/product';
import { PageEndpoints, sorting } from '../../constants/constants';
import { Inventory } from '../../pages/inventoryPages';
import { Cart } from '../../pages/cartPages';
test.describe("Inventory Feature", async () => {
    test.beforeEach("Sort products by price (low to high)", async ({ page }) => {
        const inventory = new Inventory(page);
        await page.goto(ENV.BASE_URL);

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

       await expect(page).toHaveURL(/inventory.html/);
        await page.selectOption(".product_sort_container", "Price (high to low)")
        let prices = await page.locator("div.inventory_item_price").allInnerTexts()
        for (let i = 0; i < prices.length - 1; i++) {
            prices[i] = prices[i].replace("$", "")
        }
        let sortedPrices = [...prices].sort((a, b) => parseFloat(b) - parseFloat(a))
        expect(prices).toEqual(sortedPrices)
    })
    test("Add a product to the cart", async ({ page }) => {
       const inventory = new Inventory(page);
         const cart = new Cart(page);
         for (const product of addProductList) {
      await inventory.selectProduct(product)
      await (await cart.AddToCart())
                 .GoBackToProducts()
    }
        await inventory.goSoppingCart()
        let allProductNames = await cart.getproducts();
        expect(allProductNames, "Count of products in cart is not correct").toHaveLength(addProductList.length)
        expect(allProductNames, "Products in cart are not correct").toEqual(addProductList)
    })
    test("Remove a product to the cart", async ({ page }) => {
       
        const inventory = new Inventory(page);
         const cart = new Cart(page);
         for (const product of addProductList) {
      await inventory.selectProduct(product)
      await (await cart.AddToCart())
                 .GoBackToProducts()
        }
        await inventory.removeProducts(removeProductList)
        await inventory .goSoppingCart()
   
        let allProductNames = await cart.getproducts();
        expect(allProductNames, "Count of products in cart is not correct").toHaveLength(addProductList.length - removeProductList.length)
        expect(allProductNames, "Products in cart are not correct").not.toEqual(removeProductList)
        expect(allProductNames, "Products in cart are not correct").not.toEqual(addProductList)
    })
    test("Checkout the products", async ({ page }) => {
        
        await page.goto("https://www.saucedemo.com/inventory.html")
        for (const product of addProductList) {
            await page.getByText(product).click()
            await page.getByRole("button", { name: "Add to cart" }).click()
            await page.getByRole("button", { name: "Go back Back to products" }).click()
        }
        await page.locator("[data-test='shopping-cart-badge']").click()
        await page.getByRole("button", { name: "Checkout" }).click()
        await page.getByRole("textbox", { name: "First Name" }).fill("Test")
        await page.getByRole("textbox", { name: "Last Name" }).fill("User")
        await page.getByRole("textbox", { name: "Zip/Postal Code" }).fill("12345")
        await page.getByRole("button", { name: "Continue" }).click()
        let allProductNames = await page.locator("[data-test='inventory-item-name']").allInnerTexts()
        expect(allProductNames, "Count of products in cart is not correct").toHaveLength(addProductList.length)
        expect(allProductNames, "Products in cart are not correct").toEqual(addProductList)
        await page.getByRole("button", { name: "Finish" }).click()
        await expect(page.getByText("Thank you for your order!")).toBeVisible()
        await page.getByRole("button", { name: "Back Home" }).click()
    })
    test("Logout", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/")
        
        await page.goto("https://www.saucedemo.com/inventory.html")
        for (const product of addProductList) {
            await page.getByText(product).click()
            await page.getByRole("button", { name: "Add to cart" }).click()
            await page.getByRole("button", { name: "Go back Back to products" }).click()
        }