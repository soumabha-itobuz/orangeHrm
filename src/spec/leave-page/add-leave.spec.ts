import { expect, test } from "@playwright/test";
import { login } from "../../lib/login";

test.describe("Add Leave", () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(() => {
    page = null;
  });

  test("Log in to the application", async () => {
    await login(page, process.env.userName, process.env.password);
    await expect(page.locator(".oxd-topbar div div span h6")).toHaveText(
      "Dashboard"
    );
  });

  test("Go to Leave page and apply a leave ", async () => {
    await page.click("ul  li:nth-child(3)  a  span");
    await page.click("nav > ul > li:nth-child(1) > a");
    await page.click(".oxd-select-text");
    await page.type(".oxd-select-text", "CAN - Bereavement");
  });
});
