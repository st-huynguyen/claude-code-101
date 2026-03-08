import { test, expect } from '@playwright/test';
import { PRODUCTS, TEST_CUSTOMER } from './fixtures/test-data';

test.describe('Checkout flow', () => {
  test('completes full purchase flow', async ({ page }) => {
    // Navigate to products page and click Buy on first product
    await page.goto('/products');
    await page.getByRole('link', { name: /buy/i }).first().click();

    // Should be on checkout page
    await expect(page.getByRole('heading', { name: /checkout/i })).toBeVisible();

    // Fill the form
    await page.getByLabel(/full name/i).fill(TEST_CUSTOMER.name);
    await page.getByLabel(/email/i).fill(TEST_CUSTOMER.email);

    // Click Complete Purchase to open confirmation dialog
    await page.getByRole('button', { name: /complete purchase/i }).click();

    // Confirm in the dialog
    await expect(page.getByRole('heading', { name: /confirm your purchase/i })).toBeVisible();
    await page.getByRole('button', { name: /confirm purchase/i }).click();

    // Should redirect to confirmation page
    await expect(page.getByRole('heading', { name: /order confirmed/i })).toBeVisible();
    await expect(page.getByText(TEST_CUSTOMER.email, { exact: true })).toBeVisible();
  });

  test('shows validation errors for empty form', async ({ page }) => {
    await page.goto('/products');
    await page.getByRole('link', { name: /buy/i }).first().click();

    // Try to submit empty form
    await page.getByRole('button', { name: /complete purchase/i }).click();

    // The confirmation dialog should not appear since form validation fails
    await expect(page.getByRole('heading', { name: /confirm your purchase/i })).not.toBeVisible();
  });
});
