import { test, expect } from '@playwright/test';

test('GET /api/health returns 200 with healthy status', async ({ request }) => {
  const response = await request.get('/api/health');

  expect(response.ok()).toBe(true);

  const body = await response.json();
  expect(body.status).toBe('healthy');
  expect(body.database).toBe('connected');
  expect(body.timestamp).toBeDefined();
});
