import { Locator, Page } from '@playwright/test';

export default abstract class AComponent {
  protected readonly _page: Page;
  protected abstract _baseLocator: Locator;

  constructor(page: Page) {
    this._page = page;
  }
}
