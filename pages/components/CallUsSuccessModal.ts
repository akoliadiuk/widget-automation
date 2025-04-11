import { expect, Locator, Page } from '@playwright/test';
import AModal from './AModal';

export default class CallUsSuccessModal extends AModal {
  protected readonly _baseLocator: Locator;
  protected readonly _xCloseButton: Locator;
  private readonly _footerLogo: Locator;
  private readonly _successCheckmark: Locator;
  private readonly _successText: Locator;
  private readonly _phoneNumber: Locator;

  constructor(page: Page) {
    super(page);
    this._baseLocator = this._page.locator('#icw--call--done');
    this._xCloseButton = this._page.locator('#icw--call--add--container #icw--call--add--close');
    this._footerLogo = this._baseLocator.locator('.icw--call-now-footer');
    this._successCheckmark = this._baseLocator.locator('.icw--call--check');
    this._successText = this._baseLocator.locator('.icw--call--done--title');
    this._phoneNumber = this._baseLocator.locator('#icw--call--done--result');
  }

  async close() {
    await this._xCloseButton.click();
    await expect(this._baseLocator).toBeHidden();
  }

  //#region Assertions
  async shouldBeOpened() {
    await expect(this._baseLocator).toBeVisible();
    await expect(this._xCloseButton).toBeVisible();
  }

  async shouldBeClosed() {
    await expect(this._baseLocator).toBeHidden();
    await expect(this._xCloseButton).toBeHidden();
  }

  async shouldBeInViewPort() {
    await expect(this._xCloseButton).toBeInViewport();
    await expect(this._footerLogo).toBeInViewport();
  }

  async shouldSuccessMessageBe(expectedTitle: string | RegExp): Promise<void> {
    await expect(this._successText).toHaveText(expectedTitle);
  }

  async shouldPhoneNumberBe(expectedNumber: string | RegExp): Promise<void> {
    await expect(this._phoneNumber).toHaveText(expectedNumber);
  }

  async shouldSuccessCheckmarkBeVisible(): Promise<void> {
    await expect(this._successCheckmark).toBeVisible();
  }

  async shouldFooterLogoBeVisible(): Promise<void> {
    await expect(this._footerLogo).toBeVisible();
  }
  //#endregion
}
