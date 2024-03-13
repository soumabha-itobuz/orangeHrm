import { test } from '@playwright/test';
import { login } from '../lib/login';


test.describe("Login page", () => {
  test("Log in to the application", async ({ page }) => {
    await page.goto(process.env.uiURl);
    await login(page, process.env.userName, process.env.password);
    await page.locator(".oxd-text.oxd-text--h6").waitFor();
  });
});
