import { expect, test } from '@playwright/test';
import { login, everShopLogin } from '../lib/login';

// import * as fs from 'fs';
// import * as path from 'path';

test.describe("Login page", () => {
  // test("Log in to the application", async ({ page }) => {
  //   await page.goto(process.env.uiURl);
  //   await login(page, process.env.userName, process.env.password);
  //   await page.locator(".oxd-text.oxd-text--h6").waitFor();

  //   // const response = await page.waitForResponse(response => response.status() === 200);
  //   // const responseBody = await response.text();
  //   // //const filePath = 'src/spec/';
  //   // path.resolve ('src/spec/');
  //   // fs.writeFileSync(path.resolve ('src/spec/'), responseBody);
  // });

  test("Log in to EverShop ", async ({page}) => {
    await page.goto(process.env.evershopUrl);
    await everShopLogin(page, process.env.everUser, process.env.everPassword);
    await page.goto('/account');
    await expect(page.url()).toMatch('/account');
  })
});
