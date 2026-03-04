import { createMagicLink } from './create-magic-link';

describe('createMagicLink', () => {
  it('creates a magic link token with 30-day expiry', async () => {
    const mockCreate = vi.fn().mockResolvedValue({ id: 'mlt-1' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tx = { magicLinkToken: { create: mockCreate } } as any;

    const token = await createMagicLink(tx, 'order-1');

    expect(typeof token).toBe('string');
    expect(token).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);

    const callData = mockCreate.mock.calls[0][0].data;
    expect(callData.orderId).toBe('order-1');
    expect(callData.token).toBe(token);

    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const expiryDiff = callData.expiresAt.getTime() - Date.now();
    expect(expiryDiff).toBeGreaterThan(thirtyDaysMs - 5000);
    expect(expiryDiff).toBeLessThanOrEqual(thirtyDaysMs);
  });
});
