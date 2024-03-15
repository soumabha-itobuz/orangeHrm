import { test } from '@playwright/test';
import { login } from '../lib/login';
// import * as fs from 'fs';
// import * as path from 'path';

test.describe("Login page", () => {
  test("Log in to the application", async ({ page }) => {
    await page.goto(process.env.uiURl);
    await login(page, process.env.userName, process.env.password);
    await page.locator(".oxd-text.oxd-text--h6").waitFor();

    // const response = await page.waitForResponse(response => response.status() === 200);
    // const responseBody = await response.text();
    // //const filePath = 'src/spec/';
    // path.resolve ('src/spec/');
    // fs.writeFileSync(path.resolve ('src/spec/'), responseBody);
  });
});
