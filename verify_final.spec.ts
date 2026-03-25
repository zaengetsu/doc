import { test, expect } from '@playwright/test';

test('verify dark mode and content', async ({ page }) => {
  await page.goto('http://localhost:3000/en');
  await page.waitForLoadState('networkidle');

  // Take screenshot of English home
  await page.screenshot({ path: 'verify_en_home.png' });

  // Switch to Dark Mode
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verify_en_dark.png' });

  // Navigate to Architecture
  await page.goto('http://localhost:3000/en/architecture');
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(1000); // Wait for mermaid
  await page.screenshot({ path: 'verify_en_architecture_dark.png' });

  // Switch to French
  await page.goto('http://localhost:3000/fr/architecture');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'verify_fr_architecture.png' });

  // Check Mermaid in light mode
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verify_fr_architecture_light.png' });
});
