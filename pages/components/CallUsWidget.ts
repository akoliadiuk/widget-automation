import { expect, Locator, Page } from '@playwright/test';
import CountryCode, { getNumberCode } from '../../tests/types/country-codes';
import AModal from './AModal';

export default class CallUsWidget extends AModal {
  protected readonly _baseLocator: Locator;
  protected readonly _xCloseButton: Locator;
  private readonly _footerLogo: Locator;
  private readonly _topTitle: Locator;
  private readonly _bottomTitle: Locator;
  private readonly _firstNameField: Locator;
  private readonly _lastNameField: Locator;
  private readonly _countryCodeDropdown: Locator;
  private readonly _phoneNumberField: Locator;
  private readonly _inactiveSubmitButton: Locator;
  private readonly _activeSubmitButton: Locator;

  constructor(page: Page) {
    super(page);
    this._baseLocator = this._page.locator('#icw--call--add');
    this._xCloseButton = this._page.locator('#icw--call--add--container #icw--call--add--close');
    this._footerLogo = this._baseLocator.locator('.icw--call-now-footer');
    this._topTitle = this._baseLocator.locator('.icw-call-add-title-top');
    this._bottomTitle = this._baseLocator.locator('.icw-call-add-title-bottom');
    this._firstNameField = this._baseLocator.locator('#icw--call--input-first');
    this._lastNameField = this._baseLocator.locator('#icw--call--input-last');
    this._countryCodeDropdown = this._baseLocator.locator('#icw--call--select');
    this._phoneNumberField = this._baseLocator.locator('#icw--call--input');
    this._inactiveSubmitButton = this._baseLocator.locator('.icw--call--done--button--invalid');
    this._activeSubmitButton = this._baseLocator.locator(
      '#icw--call--done--button:not(.icw--call--done--button--invalid)',
    );
  }

  //#region Actions
  async fillFirstName(firstName: string) {
    await this._firstNameField.fill(firstName);
    await expect(this._firstNameField).toHaveValue(firstName);
  }

  async fillLastName(lastName: string) {
    await this._lastNameField.fill(lastName);
    await expect(this._lastNameField).toHaveValue(lastName);
  }

  async selectCountryCode(countryCode: CountryCode) {
    await this._countryCodeDropdown.selectOption(countryCode);
    await expect(this._countryCodeDropdown).toHaveValue(`+${getNumberCode(countryCode)}`);
  }

  async fillPhoneNumber(phoneNumber: string) {
    await this._phoneNumberField.fill(phoneNumber);
    await expect(this._phoneNumberField).toHaveValue(phoneNumber);
  }

  async clickSubmitButton() {
    await this._activeSubmitButton.click();
    await expect(this._topTitle).toBeHidden();
  }
  //#endregion

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

  async shouldTitleBe(expectedTitle: string | RegExp): Promise<void> {
    await expect(this._topTitle).toHaveText(expectedTitle);
  }

  async shouldDescriptionBe(expectedDescription: string | RegExp): Promise<void> {
    await expect(this._bottomTitle).toHaveText(expectedDescription);
  }

  async shouldTextInputsBeVisible(): Promise<void> {
    await expect(this._firstNameField).toBeVisible();
    await expect(this._lastNameField).toBeVisible();
    await expect(this._phoneNumberField).toBeVisible();
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
