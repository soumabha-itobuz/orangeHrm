import { expect, test } from "@playwright/test";
import { login } from "../../lib/login";

test.describe("Leave / Employee Entitlement", () => {
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
    await page.click(".oxd-dropdown-menu > li:nth-child(2)");
    await page
      .locator(
        ".oxd-form-row > div > div:nth-child(1) > div >  div:nth-child(2) > div > div > input"
      )
      .fill("Eric130421  cotiangco");
    await page.type(
      ".oxd-form-row > div > div:nth-child(2) > div >  div:nth-child(2) > div > div > div:nth-child(1)",
      "CAN - Bereavement"
    );
    await page.click('[type="submit"]');
    await page.waitForLoadState();
  });
});
