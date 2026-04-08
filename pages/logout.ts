import { Page, Locator } from '@playwright/test';

export class Logout {
    readonly page: Page;
    readonly menuBtn: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuBtn = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    async logout() {
        await this.menuBtn.click();
        await this.logoutLink.click();
    }
}