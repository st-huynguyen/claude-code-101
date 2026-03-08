import { test, expect } from '@playwright/test';
import { ADMIN } from './fixtures/test-data';

test.describe('Admin login page', () => {
  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/admin/login');

    await page.getByLabel(/email/i).fill('wrong@example.com');
    await page.getByLabel(/password/i).fill('wrongpassword');
    await page.getByRole('button', { name: /login/i }).click();

    await expect(page.getByText(/invalid/i)).toBeVisible();
  });

  test('displays login form with required fields', async ({ page }) => {
    await page.goto('/admin/login');

    await expect(page.getByText(/admin login/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });
});
