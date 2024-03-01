import { Page } from '@playwright/test';

export const locators = {
    locator: {
        username: '[name="username"]',
        password: '[name="password"]'
    }
};

export async function login(page:Page, userName, password) {
    await page.fill('[name="username"]',userName);
      await page.fill('[name="password"]',password);
      await page.click('[type="submit"]');
      await page.waitForLoadState();
}