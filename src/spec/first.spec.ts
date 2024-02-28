// import { chromium, devices } from '@playwright/test';
// import assert from 'node:assert';
import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');

test.describe('Example Test Suite', () => {
  let browser;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('https://www.google.co.in/');
  });

  test.afterAll(async () => {
    await browser.close();
  });

  it('should click on an element', async () => {
    // Clicking on an element using a CSS selector
    await page.click('your-css-selector');
  });
});



// (async () => {
// test('has title', async ({ page }) => {
//   //await chromium.launch({ headless: false, slowMo: 100 });
//   await page.goto('https://www.google.co.in/');
 
// });

// })();