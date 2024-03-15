import { expect, test } from "@playwright/test";
import { login } from "../../lib/login";

const locators = {
  pageHeading: ".oxd-topbar div div span h6",
  leaveOption: "ul  li:nth-child(3)  a  span",
  entitlementOption: "nav > ul > li:nth-child(3) > span",
  employeeEntitlement: ".oxd-dropdown-menu > li:nth-child(2)",
  employeeName:
    ".oxd-form-row > div > div:nth-child(1) > div >  div:nth-child(2) > div > div > input",
  leaveType:
    ".oxd-form-row > div > div:nth-child(2) > div >  div:nth-child(2) > div > div > div:nth-child(1)",
  searchButton: '[type="submit"]',
};

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
    await expect(page.locator(locators.pageHeading)).toHaveText("Dashboard");
  });

  test("Add Leave Entitlement", async () => {
    await page.click(locators.leaveOption);
    await page.click(locators.entitlementOption);
    await page.click(locators.employeeEntitlement);
    await page.locator(locators.employeeName).fill("Eric130421  cotiangco");
    await page.type(locators.leaveType, "CAN - Bereavement");
    await page.click(locators.searchButton);
    await page.waitForLoadState();
  });
});
