import { Page } from "@playwright/test";
import { testConfig } from "./test-config";
import { deleteAuthFile } from "./deleteAuthFile";

const locators = {
  username: '[name="username"]',
  password: '[name="password"]',
    evershopUser: '[name="email"]',
    everPassword: '[name="password"]',
  submitButton: '[type="submit"]',
};

export async function login(page: Page, userName, password) {
  await deleteAuthFile(testConfig.authFile);
  await page.goto("/web/index.php/auth/login");
  console.log(locators);
  await page.fill(locators.username, userName);
  await page.fill(locators.password, password);
  await page.click(locators.submitButton);
  await page.waitForLoadState();
  await page.context().storageState({ path: testConfig.authFile });
}

export async function everShopLogin(page: Page, userName, password) {
  await page.click('div:nth-child(3) > a > svg > path')
  await page.fill(locators.locator.evershopUser, userName);
  await page.fill(locators.locator.everPassword, password);
  await page.click('[type="submit"]');
  await page.waitForLoadState();
  
}