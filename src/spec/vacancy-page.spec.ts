import { test } from '@playwright/test';
import { login } from '../lib/login';
import { testConfig } from '../lib/test-config';

test.describe('Add vacancy',  () => {
  
    test('login', async ({ page }) => {
      await login(page, process.env.userName, process.env.password);
    })

    test.use({ storageState: testConfig.authFile })
    
    test('Go to recruitment page ', async ({ page }) => {
        await page.goto('/web/index.php/dashboard/index');
        await page.click('ul  li:nth-child(5)  a  span');  
        await page.click('nav > ul > li:nth-child(2) > a');
        await page.click('div.orangehrm-header-container button');
    });
}) 