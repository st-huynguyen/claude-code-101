import { test, expect } from '@playwright/test';
import { PRODUCTS } from './fixtures/test-data';

test.describe('Products page', () => {
  test('displays all products with names and prices', async ({ page }) => {
    await page.goto('/products');

    await expect(page.getByRole('heading', { name: /esim plans/i })).toBeVisible();

    for (const product of PRODUCTS) {
      await expect(page.getByText(product.name).first()).toBeVisible();
      await expect(page.getByText(product.priceFormatted).first()).toBeVisible();
    }
  });

  test('displays product details', async ({ page }) => {
    await page.goto('/products');

    for (const product of PRODUCTS) {
      await expect(page.getByText(`${product.dataAmountGb}GB`).first()).toBeVisible();
    }
  });
});
