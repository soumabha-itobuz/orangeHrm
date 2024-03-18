import { expect, test } from "@playwright/test";
import { login } from "../../../lib/login";

const locators = {
  pageHeading: ".oxd-topbar div div span h6",
  leaveOption: "ul  li:nth-child(3)  a  span",
  entitlementOption: "nav > ul > li:nth-child(3) > span",
  myEntitlementOption: ".oxd-dropdown-menu > li:nth-child(3)",
  employeeNameInput: ".oxd-autocomplete-wrapper > div > input",
  leaveType: ".oxd-grid-item:nth-child(1) .oxd-select-text-input",
  leaveTypeOptions: ".oxd-select-text--focus > .oxd-select-text-input",
  entitlementField:
    ".oxd-form > div:nth-child(3) > div > div:nth-child(3) > div > div:nth-child(2)  > input",
  saveButton: '[type="submit"]',
  confirmButton:
    "button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-button-margin",
};

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
    await expect(page.locator(locators.pageHeading)).toHaveText("Dashboard");
  });

  test("Add Leave Entitlement", async () => {
    await page.click(locators.leaveOption);
    await page.click(locators.entitlementOption);
    await page.click(locators.myEntitlementOption);
  });
});
