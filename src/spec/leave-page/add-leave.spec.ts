import { expect, test } from "@playwright/test";
import { login } from "../../lib/login";

let page;

test.describe("Add Leave", () => {
  test("Log in to the application", async ({ browser }) => {
    const token = "";
    page = await browser.newPage();
    await login(page, process.env.userName, process.env.password);
    await expect(page.locator(".oxd-topbar div div span h6")).toHaveText(
      "Dashboard"
    );

    await page.evaluate(
      (token) => localStorage.setItem("Identity.States.token", token),
      token
    );
  });

  test("Go to Leave page and apply a leave ", async ({ page }) => {
    await page.click("ul  li:nth-child(3)  a  span");
    await page.click("nav > ul > li:nth-child(1) > a");
    await page.click(".oxd-select-text");
    await page.type(".oxd-select-text", "CAN - Bereavement");
  });
});
