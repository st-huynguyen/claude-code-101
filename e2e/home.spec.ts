import { test, expect } from '@playwright/test';
import { PRODUCTS } from './fixtures/test-data';

test.describe('Home page', () => {
  test('displays hero section with heading and CTA', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', {
        name: /stay connected anywhere/i,
      }),
    ).toBeVisible();

    await expect(page.getByRole('link', { name: /browse plans/i })).toBeVisible();
  });

  test('displays featured product cards', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /featured plans/i })).toBeVisible();

    for (const product of PRODUCTS) {
      await expect(page.getByText(product.name).first()).toBeVisible();
    }
  });

  test('"View All" link navigates to products page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /view all/i }).click();

    await expect(page).toHaveURL('/products');
  });
});
