import { expect, Locator, Page } from '@playwright/test';

export default class CallUsWidget {
  private readonly _page: Page;
  private readonly _baseLocator: Locator;
  private readonly _title: Locator;
  private readonly _footerLogo: Locator;
  private readonly _xCloseButton: Locator;
  private readonly _topTitle: Locator;
  private readonly _bottomTitle: Locator;
  private readonly _firstNameField: Locator;
  private readonly _lastNameField: Locator;
  private readonly _countryCodeDropdown: Locator;
  private readonly _phoneField: Locator;
  private readonly _inactiveSubmitButton: Locator;

  constructor(page: Page) {
    this._page = page;
    this._baseLocator = this._page.locator('#icw--call--add');
    this._xCloseButton = this._page.locator('#icw--call--add--container #icw--call--add--close');
    this._title = this._baseLocator.locator('.icw-call-add-title-top');
    this._title = this._baseLocator.locator('.icw-call-add-title-top');
    this._footerLogo = this._baseLocator.locator('.icw--call-now-footer');
    this._topTitle = this._baseLocator.locator('.icw-call-add-title-top');
    this._bottomTitle = this._baseLocator.locator('.icw-call-add-title-bottom');
    this._firstNameField = this._baseLocator.locator('#icw--call--input-first');
    this._lastNameField = this._baseLocator.locator('#icw--call--input-last');
    this._countryCodeDropdown = this._baseLocator.locator('#icw--call--select');
    this._phoneField = this._baseLocator.locator('#icw--call--input');
    this._inactiveSubmitButton = this._baseLocator.locator('.icw--call--done--button--invalid');
  }

  async close() {
    await this._xCloseButton.click();
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
    await expect(this._topTitle).toHaveText(expectedTitle);
  }

  async shouldDescriptionBe(expectedDescription: string | RegExp): Promise<void> {
    await expect(this._bottomTitle).toHaveText(expectedDescription);
  }

  async shouldTextInputsBeVisible(): Promise<void> {
    await expect(this._firstNameField).toBeVisible();
    await expect(this._lastNameField).toBeVisible();
    await expect(this._phoneField).toBeVisible();
  }

  async shouldCloseButtonBeVisible(): Promise<void> {
    await expect(this._xCloseButton).toBeVisible();
  }

  async shouldFooterLogoBeVisible(): Promise<void> {
    await expect(this._footerLogo).toBeVisible();
  }
  
  async shouldCountryCodeDropdownBeVisible(): Promise<void> {
    await expect(this._countryCodeDropdown).toBeVisible();
  }

  async shouldInactiveSubmitButtonBeVisible(): Promise<void> {
    await expect(this._inactiveSubmitButton).toBeVisible();
  }
  //#endregion
}
