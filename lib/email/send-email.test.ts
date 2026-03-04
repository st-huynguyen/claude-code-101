import { sendEmail } from './send-email';

vi.mock('@/lib/email/resend', () => ({
  resend: {
    emails: {
      send: vi.fn(),
    },
  },
}));

const { resend } = await import('@/lib/email/resend');
const mockSend = vi.mocked(resend.emails.send);

describe('sendEmail', () => {
  beforeEach(() => {
    mockSend.mockReset();
  });

  it('sends email and returns success', async () => {
    mockSend.mockResolvedValue({ data: { id: '1' }, error: null });

    const result = await sendEmail({
      to: 'test@example.com',
      subject: 'Test',
      html: '<p>Hello</p>',
    });

    expect(result).toEqual({ success: true });
    expect(mockSend).toHaveBeenCalledWith({
      from: expect.any(String),
      to: 'test@example.com',
      subject: 'Test',
      html: '<p>Hello</p>',
    });
  });

  it('returns error on failure without throwing', async () => {
    mockSend.mockRejectedValue(new Error('API down'));

    const result = await sendEmail({
      to: 'test@example.com',
      subject: 'Test',
      html: '<p>Hello</p>',
    });

    expect(result).toEqual({ success: false, error: 'API down' });
  });
});
