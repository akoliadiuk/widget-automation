import { test } from "../../fixtures";
import dataset from "../../data/call-us-widget/call-us.dataset.json" assert { type: "json" };
import MainPage from "../../../pages/MainPage";
import CallUsWidget from "../../../pages/components/CallUsWidget";

test.describe('Main Page - "Call Us" Widget', () => {
  let widget: CallUsWidget;

  test.beforeEach(async ({ mainPage }) => {
    await mainPage.openCallUsWidget();
    widget = mainPage.callUsWidget;
  });

  test("should open", { tag: "@smoke" }, async () => {
    await widget.shouldBeOpened();
    await widget.shouldBeInViewPort();
  });

  test("should close", { tag: "@smoke" }, async () => {
    await widget.close();
    
    await widget.shouldBeClosed();
  });

  test(
    "should have all the elements",
    { tag: "@regression" },
    async () => {
      await widget.shouldCloseButtonBeVisible();
      await widget.shouldTitleBe(dataset.title);
      await widget.shouldDescriptionBe(dataset.description);
      await widget.shouldTextInputsBeVisible();
      await widget.shouldCountryCodeDropdownBeVisible();
      await widget.shouldInactiveSubmitButtonBeVisible();
      await widget.shouldFooterLogoBeVisible();
    }
  );
});
