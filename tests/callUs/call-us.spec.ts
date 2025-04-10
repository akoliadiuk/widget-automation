import { test } from '../fixtures';

test.describe('Main Page - "Call Us" Widget', () => {
  test('should open', { tag: '@smoke' }, async ({ mainPage }) => {
    await mainPage.openCallUsWidget();

    await mainPage.callUsWidget.shouldBeOpened();
    await mainPage.callUsWidget.shouldBeInViewPort();
  });

  test('should close', { tag: '@smoke' }, async ({ mainPage }) => {
    await mainPage.openCallUsWidget();
    await mainPage.callUsWidget.close();

    await mainPage.callUsWidget.shouldBeClosed();
  });
});
