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
  });

  test('Go to vacancy page', async () => {
    await page.click('nav > ul > li:nth-child(2) > a');
    await page.click('div.orangehrm-header-container button');
  });

  test('Add vacancy', async () => {
    await page.fill('div.oxd-layout-context > div > div > form > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(2) > input', 'Qa Qa');
    await page.click('.oxd-select-text-input');
    await page.click('.oxd-select-dropdown.--positon-bottom .oxd-select-option:nth-child(9) span');
    await page.fill('[placeholder="Type description here"]','asasas');
    await page.fill('[placeholder="Type for hints..."]','Rather Test  Flow');
    await page.click('[type="submit"]');
  });

});
