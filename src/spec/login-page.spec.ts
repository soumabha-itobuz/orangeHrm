import { test, expect, type Page } from '@playwright/test';

test.describe('Login page', () => {
    test('Log in to the application', async ({ page }) => {
      await page.goto(`${process.env.uiURl}`);
      await page.fill('[name="username"]', 'Admin');
      await page.fill('[name="password"]', 'admin123');
      await page.click('[type="submit"]');
    });
}) 