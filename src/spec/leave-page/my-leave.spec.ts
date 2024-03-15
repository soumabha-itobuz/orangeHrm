import { expect, test } from "@playwright/test";
import { login } from "../../lib/login";

test.describe("My Leaves", () => {
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

  test("Go to My Leave page", async () => {
    await page.click("ul  li:nth-child(3)  a  span");
    await page.click("nav > ul > li:nth-child(2) > a");
    await page.click(".oxd-select-text");
    await page
      .locator(
        ".oxd-form-row .oxd-grid-4 > div:nth-child(1) > div div:nth-child(2) > div > div > input"
      )
      .fill("2024-01-01");
    await page
      .locator(
        ".oxd-form-row .oxd-grid-4 > div:nth-child(2) > div div:nth-child(2) > div > div > input"
      )
      .fill("2024-31-12");
    await page.type(
      ".oxd-form-row .oxd-grid-4 > div:nth-child(4) > div > div:nth-child(2) > div > div > div:nth-child(1)",
      "US - Bereavement"
    );
    await page.click('[type="submit"]');
    await page.waitForLoadState();
    await expect(
      page.locator(".orangehrm-paper-container > div:nth-child(2) > div > span")
    ).toHaveText("No Records Found");
  });
});
