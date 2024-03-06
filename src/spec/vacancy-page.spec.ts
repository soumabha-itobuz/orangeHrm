import { test, expect, type Page } from '@playwright/test';
import { login } from '../lib/login';

test.describe('Login page', () => {
   
    test('Log in to the application', async ({ page }) => {
      await page.goto(process.env.uiURl);
      await login(page, process.env.userName, process.env.password);
      //await page.locator('.oxd-text.oxd-text--h6').waitFor();
      //test.setTimeout(300000);
    });

    test('Go to recruitment page ',async ({ page }) => {
        await page.click('ul  li:nth-child(5)  a  span');  
        await page.click('nav > ul > li:nth-child(2) > a');
        await page.click('div.orangehrm-header-container button');
    });
}) 