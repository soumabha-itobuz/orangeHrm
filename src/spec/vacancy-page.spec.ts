import { test } from '@playwright/test';
import { login } from '../lib/login';
import { testConfig } from '../lib/test-config';

test.describe('Add vacancy', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
      page = await browser.newPage();
      await page.goto(process.env.uiURl);
      await login(page, process.env.userName, process.env.password);
      await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  });

  test('Go to recruitment page ', async () => {
      // Your test logic to navigate to the recruitment page
      await page.click('ul  li:nth-child(5)  a  span');  
      await page.click('nav > ul > li:nth-child(2) > a');
      await page.click('div.orangehrm-header-container button');

      // Add assertions or further actions
  });

});