import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(process.env.uiURl);
  await page.getByLabel('[name="username"]').fill(process.env.userName);
  await page.getByLabel('[name="password"]').fill(process.env.password);
  //await page.getByRole('[type="submit"]', { name: 'Login' }).click();
  await page.click('[type="submit"]');
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  //await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});