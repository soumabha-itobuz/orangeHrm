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

test.describe("Add to cart testing", () => {

    let page;
    test.beforeAll(async ({ browser}) => {
      page = await browser.newPage();
    })
  
    test.afterAll(() => {
      page = null;
    })
  
    test("Log in to EverShop ", async ({page}) => {
        await page.goto(process.env.evershopUrl);
        await everShopLogin(page, process.env.everUser, process.env.everPassword);
        await page.goto('/account');
        await expect(page.url()).toMatch('/account');
      })

    test("Open any products and add to cart", async ({page}) => {
        await page.goto('https://demo.evershop.io/');
        const locator = page.textContent('div:nth-child(1) > div.product-name.product-list-name.mt-1.mb-025 > a > span');
        await page.click('div:nth-child(1) > div.product-thumbnail-listing > a > img');
        const locator2 = page.textContent('[class="product-single-name"]');
        if(locator===locator2){
            console.log('Text value match');
        } else{
            console.log('Text values do not match');
        }
        await page.click('div.variant.variant-container.grid.grid-cols-1.gap-1.mt-2 > div:nth-child(1) > ul > li:nth-child(1) > a');
        await page.click('div.variant.variant-container.grid.grid-cols-1.gap-1.mt-2 > div:nth-child(2) > ul > li:nth-child(1) > a');
        await page.click('[type="button"]');
        setTimeout(30000);
        await page.click('.mini-cart-icon');
        if(locator===locator2){
            console.log('Text value match');
        } else{
            console.log('Text values do not match');
        }
    })
  });
  