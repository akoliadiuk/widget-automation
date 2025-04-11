import { test } from '../../fixtures';
import CallUsWidget from '../../../pages/components/CallUsWidget';
import { faker } from '@faker-js/faker';
import { getRandomEnumValue } from '../../types/random';
import CountryCode, { getNumberCode } from '../../types/country-codes';
import CallUsSuccessModal from '../../../pages/components/CallUsSuccessModal';

test.describe('Main Page - "Call Us" Widget', () => {
  const SUCCESS_MESSAGE = 'You’ve requested a call for';
  let widget: CallUsWidget;
  let successModal: CallUsSuccessModal;

  test.beforeEach(async ({ mainPage }) => {
    await mainPage.openCallUsWidget();
    widget = mainPage.callUsWidget;
    successModal = mainPage.callUsSuccessModal;
  });

  test('should request a call', { tag: '@e2e' }, async () => {
    const nationalPhoneNumber = faker.string.numeric(9);
    const countryCode = getRandomEnumValue(CountryCode);

    await test.step('should open withing the viewport', async () => widget.shouldBeInViewPort());
    await test.step('should fill first name', async () => widget.fillFirstName(faker.person.firstName()));
    await test.step('should fill last name', async () => widget.fillLastName(faker.person.lastName()));
    await test.step('should fill country code', async () => widget.selectCountryCode(countryCode));
    await test.step('should fill phone number', async () => widget.fillPhoneNumber(nationalPhoneNumber));
    await test.step('should submit the form', async () => widget.clickSubmitButton());

    await test.step('should success modal open', async () => {
      await successModal.shouldBeOpened();
      await successModal.shouldBeInViewPort();
    });

    await test.step('should success modal have all the elements', async () => {
      await successModal.shouldCloseButtonBeVisible();
      await successModal.shouldSuccessCheckmarkBeVisible();
      await successModal.shouldSuccessMessageBe(SUCCESS_MESSAGE);
      await successModal.shouldPhoneNumberBe(`+${getNumberCode(countryCode)}${nationalPhoneNumber}`);
      await successModal.shouldFooterLogoBeVisible();
    });

    await test.step('should close success modal', async () => {
      await successModal.close();

      await successModal.shouldBeClosed();
    });
  });
});
