import { test as baseTest, expect } from '@playwright/test';
import MainPage from '../pages/MainPage';
import { BASE_URL } from '../playwright.config';

interface Fixtures {
  mainPage: MainPage;
}

const test = baseTest.extend<Fixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page, BASE_URL);
    await mainPage.goto();
    await use(mainPage);
    await mainPage.close();
  },
});

test.afterEach(async ({ page }, testInfo) => {
  const screenshot = await page.screenshot({ fullPage: true });
  await testInfo.attach('screenshot', {
    body: screenshot,
    contentType: 'image/png',
  });
});

export { test, expect };
