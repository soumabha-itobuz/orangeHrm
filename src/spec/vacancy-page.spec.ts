import { test } from '@playwright/test';
import { login } from '../lib/login';

let page;

test.describe('Add vacancy', () => {
  test('login', async ({ browser }) => {
    const token = ''; // Define token here or fetch it from somewhere
    page = await browser.newPage();
    await login(page, process.env.userName, process.env.password);
    await page.evaluate(token => localStorage.setItem('Identity.States.token', token), token);
  });

  test('Go to recruitment page', async () => {
    // If the 'login' test is executed before this one, 'page' will contain the logged-in session
    await page.goto('/web/index.php/dashboard/index');
    await page.click('ul li:nth-child(5) a span');
    await page.click('nav > ul > li:nth-child(2) > a');
    await page.click('div.orangehrm-header-container button');
  });
});
