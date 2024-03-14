import { expect, test } from "@playwright/test";
import { login } from "../../lib/login";

test.describe("Leave / Entitlement", () => {
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

  test("Add Leave Entitlement", async () => {
    await page.click("ul  li:nth-child(3)  a  span");
    await page.click("nav > ul > li:nth-child(3) > span ");
    await page.click(".oxd-dropdown-menu > li:nth-child(1)");
    await page
      .locator(".oxd-autocomplete-wrapper > div > input")
      .fill("Tiffany  Donovan");
    await page.click(".oxd-grid-item:nth-child(1) .oxd-select-text-input");
    await page.click(".oxd-select-text--focus > .oxd-select-text-input");
    await page
      .locator(
        ".oxd-form > div:nth-child(3) > div > div:nth-child(3) > div > div:nth-child(2)  > input"
      )
      .fill("2");
    await page.click('[type="submit"]');
    await page.waitForLoadState();
    await page.click(
      "button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-button-margin"
    );
  });
});
