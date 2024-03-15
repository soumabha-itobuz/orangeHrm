import { expect, test } from "@playwright/test";
import { login } from "../../lib/login";

const locators = {
  pageHeading: ".oxd-topbar div div span h6",
  leaveOption: "ul  li:nth-child(3)  a  span",
  applyLeaveOption: "nav > ul > li:nth-child(1) > a",
  leaveType: ".oxd-select-text",
};

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
    await expect(page.locator(locators.pageHeading)).toHaveText("Dashboard");
  });

  test("Go to Leave page and apply a leave ", async () => {
    await page.click(locators.leaveOption);
    await page.click(locators.applyLeaveOption);
    await page.click(locators.leaveType);
    await page.type(locators.leaveType, "CAN - Bereavement");
  });
});
