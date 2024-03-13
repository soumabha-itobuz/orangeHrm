import { test } from '@playwright/test';
import { login } from '../lib/login';



test.describe('Add vacancy', () => {
  let page;
  test.beforeAll(async ({ browser}) => {
    page = await browser.newPage();
  })

  test.afterAll(() => {
    page = null;
  })

  test('login', async () => {
    await login(page, process.env.userName, process.env.password);
  });

  test('Go to recruitment page', async () => {
    // If the 'login' test is executed before this one, 'page' will contain the logged-in session
    await page.goto('/web/index.php/dashboard/index');
    await page.click('ul li:nth-child(5) a span');
    await page.click('nav > ul > li:nth-child(2) > a');
    await page.click('div.orangehrm-header-container button');
  });
});
