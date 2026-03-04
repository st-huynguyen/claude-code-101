import { buildConfirmationEmail } from './build-confirmation-email';

describe('buildConfirmationEmail', () => {
  const params = {
    customerName: 'Jane Doe',
    orderNumber: 'ORD-123',
    productName: 'Global 5GB',
    totalFormatted: '$9.99',
    activationCode: 'ACT-ABCD-1234-WXYZ',
    smdpAddress: 'smdp.example.com',
    manageUrl: 'http://localhost:3000/manage/abc-123',
  };

  it('returns subject with order number', () => {
    const { subject } = buildConfirmationEmail(params);
    expect(subject).toContain('ORD-123');
  });

  it('returns html with key details', () => {
    const { html } = buildConfirmationEmail(params);
    expect(html).toContain('Jane Doe');
    expect(html).toContain('ORD-123');
    expect(html).toContain('Global 5GB');
    expect(html).toContain('$9.99');
    expect(html).toContain('ACT-ABCD-1234-WXYZ');
    expect(html).toContain('smdp.example.com');
    expect(html).toContain('http://localhost:3000/manage/abc-123');
  });
});
