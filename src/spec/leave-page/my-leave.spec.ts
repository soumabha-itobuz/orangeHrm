import { expect, test } from "@playwright/test";
import { login } from "../../lib/login";

const locators = {
  pageHeading: ".oxd-topbar div div span h6",
  leaveOption: "ul  li:nth-child(3)  a  span",
  myLeaveHeading: "nav > ul > li:nth-child(2) > a",
  fromDate:
    ".oxd-form-row .oxd-grid-4 > div:nth-child(1) > div div:nth-child(2) > div > div > input",
  toDate:
    ".oxd-form-row .oxd-grid-4 > div:nth-child(2) > div div:nth-child(2) > div > div > input",
  leaveType:
    ".oxd-form-row .oxd-grid-4 > div:nth-child(4) > div > div:nth-child(2) > div > div > div:nth-child(1)",
  searchButton: '[type="submit"]',
  recordHeading: ".orangehrm-paper-container > div:nth-child(2) > div > span",
};

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
    await expect(page.locator(locators.pageHeading)).toHaveText("Dashboard");
  });

  test("Go to My Leave page", async () => {
    await page.click(locators.leaveOption);
    await page.click(locators.myLeaveHeading);
    await page.locator(locators.fromDate).fill("2024-01-01");
    await page.locator(locators.toDate).fill("2024-31-12");
    await page.type(locators.leaveType, "US - Bereavement");
    await page.click(locators.searchButton);
    await page.waitForLoadState();
    await expect(page.locator(locators.recordHeading)).toHaveText(
      "No Records Found"
    );
  });
});
