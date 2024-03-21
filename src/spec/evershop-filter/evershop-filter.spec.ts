import { expect, test } from "@playwright/test";

const locators = {
  linkForMen: ".nav > li:nth-child(1)",
  linkForWomen: ".nav > li:nth-child(2)",
  priceSlider: '[type="range"]',
  priceListItems: ".sale-price",
  colorTextOption:
    ".product-filter-tool > div:nth-child(3) > ul > li > a > span",
  productName: ".product-name > a",
  productColor: ".specification > ul > li:nth-child(1) > span",
};

async function priceFilter(page, max: number, min: number) {
  const randomPrice = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(randomPrice, max, min);
  await page.$eval(
    locators.priceSlider,
    (e, randomPrice) => {
      e.value = randomPrice;
    },
    randomPrice
  );

  const prices = await page.locator(locators.priceListItems);
  const count = await prices.count();
  for (let i = 0; i < count; i++) {
    const price = Number((await prices.nth(i).innerText()).substring(1));
    expect(price).toBeLessThanOrEqual(randomPrice);
    expect(price).toBeGreaterThanOrEqual(min);
  }
}

async function colorFilterVerification(page) {
  const colorFilter = await page.locator(locators.colorTextOption);
  const count = await colorFilter.count();
  for (let i = 0; i < count; i++) {
    const color = await colorFilter.nth(i).innerText();
    await colorFilter.nth(i).click();
    await page.waitForTimeout(2000);
    const product = await page.locator(locators.productName);
    const countProduct = await product.count();
    for (let j = 0; j < countProduct; j++) {
      console.log(await product.nth(j).innerText());
      await product.nth(j).click();
      await page.waitForLoadState();
      const productColorSpecification = await (
        await page.locator(locators.productColor)
      ).innerText();
      expect(color).toBe(productColorSpecification);
      await page.goBack();
    }
    await colorFilter.nth(i).click();
    await page.waitForTimeout(2000);
  }
}

test.describe("Filter for Evershop", () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(() => {
    page = null;
  });

  test("Log in to the application", async () => {});

  test("Filter with price in the Men's section", async () => {
    await page.goto("https://demo.evershop.io/");
    await page.waitForLoadState();
    await page.click(locators.linkForMen);
    await page.waitForLoadState();
    priceFilter(page, 802, 169);
  });
  test("Filter with color in the Men's section", async () => {
    await page.goto("https://demo.evershop.io/");
    await page.waitForLoadState();
    await page.click(locators.linkForMen);
    await page.waitForLoadState();
    colorFilterVerification(page);
  });

  test("Filter with price in the Women's section", async () => {
    await page.goto("https://demo.evershop.io/");
    await page.click(locators.linkForWomen);
    await page.waitForLoadState();
    priceFilter(page, 963, 133);
  });
  test("Filter with color in the Women's section", async () => {
    await page.goto("https://demo.evershop.io/");
    await page.waitForLoadState();
    await page.click(locators.linkForWomen);
    await page.waitForLoadState();
    colorFilterVerification(page);
  });
});
