import { expect, Locator, Page } from '@playwright/test';

export default class CallUsWidget {
  private readonly _page: Page;
  private readonly _baseLocator: Locator;
  private readonly _title: Locator;
  private readonly _footerLogo: Locator;
  private readonly _xButton: Locator;

  constructor(page: Page) {
    this._page = page;
    this._baseLocator = this._page.locator('#icw--call--add');
    this._xButton = this._page.locator('#icw--call--add--container #icw--call--add--close');
    this._title = this._baseLocator.locator('.icw-call-add-title-top');
    this._title = this._baseLocator.locator('.icw-call-add-title-top');
    this._footerLogo = this._baseLocator.locator('.icw--call-now-footer');
  }

  async close() {
    await this._xButton.click();
    await expect(this._baseLocator).toBeHidden();
  }

  //#region Assertions
  async shouldBeOpened() {
    await expect(this._baseLocator).toBeVisible();
    await expect(this._title).toBeVisible();
  }

  async shouldBeClosed() {
    await expect(this._baseLocator).toBeHidden();
    await expect(this._title).toBeHidden();
  }

  async shouldBeInViewPort() {
    await expect(this._title).toBeInViewport();
    await expect(this._footerLogo).toBeInViewport()
  }

  async shouldTitleBe(expectedTitle: string | RegExp): Promise<void> {
    await expect(this._page).toHaveTitle(expectedTitle);
  }
  //#endregion
}
