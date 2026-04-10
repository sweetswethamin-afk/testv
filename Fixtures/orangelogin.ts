import { test as base } from '@playwright/test';
import {Login} from '../pages/orangelogin.ts';

type MyFixtures = {
  loginPage: Login;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new Login(page);
    await use(loginPage);
  },

 
});

export { expect } from '@playwright/test';