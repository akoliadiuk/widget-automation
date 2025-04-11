import { Page, Locator, expect } from '@playwright/test';
import { BASE_URL } from '../playwright.config';
import CallUsWidget from './components/CallUsWidget';
import CallUsSuccessModal from './components/CallUsSuccessModal';

export default class MainPage {
  private readonly _page: Page;
  private _fullUrl!: URL;
  protected readonly _callUsButton: Locator;
  protected readonly _callUsWidget: CallUsWidget;
  get callUsWidget(): CallUsWidget {
    return this._callUsWidget;
  }

  protected readonly _callUsSuccessModal: CallUsSuccessModal;
  get callUsSuccessModal(): CallUsSuccessModal {
    return this._callUsSuccessModal;
  }

  constructor(page: Page, url: string) {
    this._page = page;
    this.url = url;
    this._callUsButton = page.locator('#icw--call--button');
    this._callUsWidget = new CallUsWidget(this._page);
    this._callUsSuccessModal = new CallUsSuccessModal(this._page);
  }

  get url(): string {
    return this._fullUrl.href;
  }

  protected set url(path: string) {
    try {
      this._fullUrl = new URL(path, BASE_URL);
    } catch (error) {
      throw new Error(`Unable to create a URL from path parameter: "${path}"!
        ${(error as Error)?.stack ?? error}`);
    }
  }

  async goto(): Promise<void> {
    await this._page.goto(this.url);
  }

  async close(): Promise<void> {
    await this._page.close();
  }

  async openCallUsWidget(): Promise<void> {
    await this._callUsButton.click();
    await expect(this._callUsButton).toBeHidden();
  }

  //#region Assertions
  async shouldTitleBe(expectedTitle: string | RegExp): Promise<void> {
    await expect(this._page).toHaveTitle(expectedTitle);
  }

  async shouldUrlBe(expectedUrl: string | RegExp): Promise<void> {
    await expect(this._page).toHaveURL(expectedUrl);
  }

  async shouldCallUsButtonBeVisible(): Promise<void> {
    await expect(this._callUsButton).toBeVisible();
  }
  //#endregion
}
