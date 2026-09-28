import { expect, test } from '@playwright/test';

const SUBMIT_URL = 'https://api.web3forms.com/submit';

const segments = [
  {
    path: '/honest-answers',
    heading: 'Honest Answers',
    submitLabel: 'Send it anonymously',
    subject: 'Honest Answers submission',
    successText: /anonymize the details/i
  },
  {
    path: '/root-cause',
    heading: 'Root Cause',
    submitLabel: 'Send it in',
    subject: 'Root Cause submission',
    successText: /go find out why/i
  }
];

for (const segment of segments) {
  test.describe(`${segment.heading} submissions`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(segment.path);
    });

    test('has correct page title and heading', async ({ page }) => {
      await expect(page).toHaveTitle(new RegExp(segment.heading));
      await expect(
        page.getByRole('heading', { level: 1, name: segment.heading })
      ).toBeVisible();
    });

    test('only the situation field is required', async ({ page }) => {
      const situation = page.locator('#situation');
      await expect(situation).toBeVisible();
      await expect(situation).toHaveAttribute('required');

      await expect(page.locator('#alias')).not.toHaveAttribute('required', '');
      await expect(page.locator('#email')).not.toHaveAttribute('required', '');
    });

    test('submits anonymously with only the situation filled in', async ({
      page
    }) => {
      let requestBody = '';

      await page.route(SUBMIT_URL, async (route) => {
        requestBody = route.request().postData() ?? '';
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, message: 'Success' })
        });
      });

      await page.locator('#situation').fill('A tricky situation at work.');
      await page.getByRole('button', { name: segment.submitLabel }).click();

      await expect(page.getByRole('status')).toHaveText(segment.successText);
      await expect(page.locator('#situation')).not.toBeVisible();

      expect(requestBody).toContain('access_key');
      expect(requestBody).toContain(segment.subject);
    });

    test('shows an error message on failed submission', async ({ page }) => {
      await page.route(SUBMIT_URL, async (route) => {
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            message: 'Something went wrong. Please try again.'
          })
        });
      });

      await page.locator('#situation').fill('A tricky situation at work.');
      await page.getByRole('button', { name: segment.submitLabel }).click();

      await expect(page.getByRole('alert')).toHaveText(/Something went wrong/i);
      await expect(page.locator('#situation')).toBeVisible();
    });

    test('shows a loading state during submission', async ({ page }) => {
      await page.route(SUBMIT_URL, async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, message: 'Success' })
        });
      });

      await page.locator('#situation').fill('A tricky situation at work.');
      await page.getByRole('button', { name: segment.submitLabel }).click();

      await expect(
        page.getByRole('button', { name: 'Submitting...' })
      ).toBeVisible();
      await expect(page.getByRole('status')).toHaveText(segment.successText);
    });
  });
}
