import { Locator, Page } from "@playwright/test";
import { DDL_SORTING, LBL_ITEM_PRICE } from "../Objects/inventoryObjects";


export class Inventory {
    readonly page: Page;
    readonly ddlSorting: Locator;
    readonly lblItemPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ddlSorting = page.locator(DDL_SORTING)
        this.lblItemPrice = page.locator(LBL_ITEM_PRICE)
    }
    async selectSortingType(sortType: string) {
        await this.page.selectOption(DDL_SORTING, sortType)
        return this
    }
    async getProductsPrice(): Promise<string[]> {
        let prices = await this.lblItemPrice.allInnerTexts()
        for (let i = 0; i < prices.length - 1; i++) {
            prices[i] = prices[i].replace("$", "")
        }
        return prices
    }
    async performSorting(sortType: string, actualPrices: string[]): Promise<string[]>{
        let sortedPrices = [];
        switch (sortType) {
            case "Price (low to high)":
                sortedPrices = [...actualPrices].sort((a, b) => parseFloat(a) - parseFloat(b))
                break;
            case "Price (high to low)":
                sortedPrices = [...actualPrices].sort((a, b) => parseFloat(b) - parseFloat(a))
                break;
            case "Name (Z to A)":
                sortedPrices = [...actualPrices].sort((a, b) => b.localeCompare(a))
                break;
            case "Name (A to Z)":
                sortedPrices = [...actualPrices].sort((a, b) => a.localeCompare(b))
                break;
            default:
                throw new Error("Invalid sort type")
        }
        return sortedPrices
    }
    async selectProduct(productName: string) {
        await this.page.getByText(productName).click()
        return this
    }
    async goShoppingCart(){
        await this.page.locator("[data-test='shopping-cart-badge']").click()
        return this
    }
}
