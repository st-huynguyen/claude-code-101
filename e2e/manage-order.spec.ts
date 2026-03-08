import { test, expect } from '@playwright/test';
import { E2E_MAGIC_LINK_TOKEN } from './fixtures/test-data';

test.describe('Manage order page', () => {
  test('shows order details for valid token', async ({ page }) => {
    await page.goto(`/manage/${E2E_MAGIC_LINK_TOKEN}`);

    await expect(page.getByRole('heading', { name: /manage your esim/i })).toBeVisible();
    await expect(page.getByText(/ORD-/)).toBeVisible();
    await expect(page.getByText(/activation code/i)).toBeVisible();
  });

  test('shows error for invalid token', async ({ page }) => {
    await page.goto('/manage/invalid-token-12345');

    await expect(page.getByText(/invalid or expired/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /go home/i })).toBeVisible();
  });
});
