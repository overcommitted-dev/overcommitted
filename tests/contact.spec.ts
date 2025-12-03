import { expect, test } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('has correct page title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact/);
    
    const heading = page.getByRole('heading', { name: 'Get in touch' });
    await expect(heading).toBeVisible();
  });

  test('displays all form fields', async ({ page }) => {
    await expect(page.getByPlaceholder('Enter your name')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your email')).toBeVisible();
    await expect(page.getByPlaceholder('Write a message')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  });

  test('shows validation errors for empty fields', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Submit' });
    await submitButton.click();

    // HTML5 validation should prevent submission
    const nameInput = page.getByPlaceholder('Enter your name');
    await expect(nameInput).toHaveAttribute('required');
  });

  test('shows validation error for invalid email', async ({ page }) => {
    await page.getByPlaceholder('Enter your name').fill('Test User');
    await page.getByPlaceholder('Enter your email').fill('invalid-email');
    await page.getByPlaceholder('Write a message').fill('Test message');
    
    const submitButton = page.getByRole('button', { name: 'Submit' });
    await submitButton.click();

    // HTML5 email validation should prevent submission
    const emailInput = page.getByPlaceholder('Enter your email');
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('successfully submits form with valid data', async ({ page }) => {
    // Intercept the Web3Forms API call
    await page.route('https://api.web3forms.com/submit', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Thanks for contacting us! We\'ll be in touch soon.'
        })
      });
    });

    await page.getByPlaceholder('Enter your name').fill('Test User');
    await page.getByPlaceholder('Enter your email').fill('test@example.com');
    await page.getByPlaceholder('Write a message').fill('This is a test message from Playwright');
    
    const submitButton = page.getByRole('button', { name: 'Submit' });
    await submitButton.click();

    // Wait for success message
    await expect(page.getByText(/Thanks for contacting us/i)).toBeVisible();
    
    // Form fields should be hidden after successful submission
    await expect(page.getByPlaceholder('Enter your name')).not.toBeVisible();
  });

  test('shows error message on failed submission', async ({ page }) => {
    // Intercept the Web3Forms API call and return an error
    await page.route('https://api.web3forms.com/submit', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          message: 'Something went wrong. Please try again.'
        })
      });
    });

    await page.getByPlaceholder('Enter your name').fill('Test User');
    await page.getByPlaceholder('Enter your email').fill('test@example.com');
    await page.getByPlaceholder('Write a message').fill('This is a test message');
    
    const submitButton = page.getByRole('button', { name: 'Submit' });
    await submitButton.click();

    // Wait for error message
    await expect(page.getByText(/Something went wrong/i)).toBeVisible();
    
    // Form fields should still be visible
    await expect(page.getByPlaceholder('Enter your name')).toBeVisible();
  });

  test('shows loading state during submission', async ({ page }) => {
    // Intercept and delay the API call to test loading state
    await page.route('https://api.web3forms.com/submit', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Thanks for contacting us!'
        })
      });
    });

    await page.getByPlaceholder('Enter your name').fill('Test User');
    await page.getByPlaceholder('Enter your email').fill('test@example.com');
    await page.getByPlaceholder('Write a message').fill('Test message');
    
    const submitButton = page.getByRole('button', { name: 'Submit' });
    await submitButton.click();

    // Check for loading state
    await expect(page.getByRole('button', { name: 'Submitting...' })).toBeVisible();
    
    // Eventually shows success
    await expect(page.getByText(/Thanks for contacting us/i)).toBeVisible();
  });

  test('includes access key in form submission', async ({ page }) => {
    let requestBody: any;

    // Intercept the request to check the access key
    await page.route('https://api.web3forms.com/submit', async (route) => {
      const request = route.request();
      requestBody = await request.postData();
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Success'
        })
      });
    });

    await page.getByPlaceholder('Enter your name').fill('Test User');
    await page.getByPlaceholder('Enter your email').fill('test@example.com');
    await page.getByPlaceholder('Write a message').fill('Test message');
    
    await page.getByRole('button', { name: 'Submit' }).click();

    // Wait for the request to complete
    await page.waitForTimeout(500);

    // Verify access_key was included in the form data
    expect(requestBody).toContain('access_key');
  });
});
