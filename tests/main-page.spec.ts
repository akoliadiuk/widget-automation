import { BASE_URL } from '../playwright.config';
import { test } from './fixtures';

const PAGE_TITLE = 'Intaker | Live Chat Law Firm | 24/7 Unlimited Leads';

test.describe('Main Page', () => {
  test('should open', { tag: '@smoke' }, async ({ mainPage }) => {
    await test.step(`URL is "${BASE_URL}"`, async () =>
      mainPage.shouldUrlBe(BASE_URL));

    await test.step(`title is "${PAGE_TITLE}"`, async () =>
      mainPage.shouldTitleBe(PAGE_TITLE));
  });

  test('should "Call Us" button be visible', { tag: '@smoke' }, async ({ mainPage }) => {
    await mainPage.shouldCallUsButtonBeVisible();
  });
});
