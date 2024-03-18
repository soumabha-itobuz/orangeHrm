import { Page } from "@playwright/test";
import { testConfig } from "./test-config";
import { deleteAuthFile } from "./deleteAuthFile";

const locators = {
  username: '[name="username"]',
  password: '[name="password"]',
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
