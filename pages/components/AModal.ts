import { expect, Locator, Page } from '@playwright/test';
import AComponent from './AComponent';

export default abstract class AModal extends AComponent {
  protected abstract _xCloseButton: Locator;

  constructor(page: Page) {
    super(page);
  }

  async close() {
    await this._xCloseButton.click();
    await expect(this._baseLocator).toBeHidden();
  }

  async shouldCloseButtonBeVisible(): Promise<void> {
    await expect(this._xCloseButton).toBeVisible();
  }
}
