import { expect, test } from "@playwright/test";
import { login } from "../../lib/login";
import * as fs from "fs";
import * as path from "path";

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
  let logs = [];
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.beforeEach(async () => {
    page.on("pageerror", (error) => {
      logs.push(`ERROR - ${error.message}`);
    });
    await page.route("**", async (route) => route.continue());
    page.on("request", (request) => {
      if (
        (request.method() == "POST" || request.method() == "PUT") &&
        (request.resourceType() === "xhr" || request.resourceType() === "fetch")
      ) {
        logs.push(
          `REQUEST - ${request
            .method()
            .padEnd(7)} - Request Payload - ${JSON.stringify(
            request.postData()
          )}\n`
        );
      }
    });

    page.on("response", async (response) => {
      let responseBody;

      if (
        response.request().resourceType() === "xhr" ||
        response.request().resourceType() === "fetch"
      ) {
        if (response.status() >= 300 && response.status() < 400) {
          logs.push(
            `[Redirect Response] ${response
              .request()
              .method()
              .padEnd(8)} ${response
              .request()
              .url()} - Status: ${response.status()}`
          );
          return;
        }
        const contentType = response.headers()["content-type"];

        if (contentType && contentType.includes("application/json")) {
          responseBody = await response.json();
        } else if (contentType && contentType.includes("text")) {
          responseBody = await response.text();
        } else {
          responseBody = "[Response body cannot be parsed]";
        }
        logs.push(
          `RESPONSE - ${response.status()} ${response
            .request()
            .method()
            .padEnd(8)} \n - Response body - ${JSON.stringify(
            responseBody
          ).padEnd(1000)}\n`
        );
      }
    });
  });

  test.afterAll(() => {
    const logFilePath = path.join(
      "src/spec/leave-page/",
      "employee-entitlement.txt"
    );
    fs.writeFileSync(logFilePath, logs.join("\n"), "utf8");
    logs = [];
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
