/*
Login to the application
Open any products
Select the size, color
Click on the 'Add To Cart' button
Assert the popup alert
*/

import { expect, test } from '@playwright/test';
import { everShopLogin } from '../lib/login';
import { setTimeout } from 'timers/promises';

test.describe("Search testing", () => {

    let page;
    test.beforeAll(async ({ browser}) => {
      page = await browser.newPage();
    })
  
    test.afterAll(() => {
      page = null;
    })

    test("Log in to EverShop ", async () => {
        await page.goto(process.env.evershopUrl);
        await everShopLogin(page, process.env.everUser, process.env.everPassword);
        await page.goto('/account');
        await expect(page.url()).toMatch('/account');
      })
  
    test("Search functionality testing", async () => {
        await page.goto('https://demo.evershop.io/');
        let value = await page.locator('div:nth-child(1) > div.product-name.product-list-name.mt-1.mb-025 > a > span');
        console.log(await value.innerText());
        await page.click('.search-icon');
        const inputField = await page.waitForSelector('.search-icon');
        await inputField.fill(await value.innerText());
        await page.keyboard.press('Enter');
      })

  });
  