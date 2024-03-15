import { Page } from "@playwright/test";
import { testConfig } from "./test-config";
import { deleteAuthFile } from "./deleteAuthFile";

export const locators = {
  locator: {
    username: '[name="username"]',
    password: '[name="password"]',
    evershopUser: '[name="email"]',
    everPassword: '[name="password"]',
  },
};

export async function login(page: Page, userName, password) {
  await deleteAuthFile(testConfig.authFile);
  await page.goto('/web/index.php/auth/login')
  await page.fill('[name="username"]', userName);
  await page.fill('[name="password"]', password);
  await page.click('[type="submit"]');
  await page.waitForLoadState();
  await page.context().storageState({ path: testConfig.authFile });
}

export async function everShopLogin(page: Page, ) {
  
  
}