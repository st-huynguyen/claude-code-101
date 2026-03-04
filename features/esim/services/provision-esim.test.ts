import { provisionEsim } from './provision-esim';

describe('provisionEsim', () => {
  it('creates an esim record with correct format', async () => {
    const mockCreate = vi.fn().mockResolvedValue({
      id: 'esim-1',
      orderItemId: 'oi-1',
      iccid: '8901000000000000000',
      activationCode: 'ACT-ABCD-1234-WXYZ',
      smdpAddress: 'smdp.example.com',
      status: 'pending',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tx = { esim: { create: mockCreate } } as any;

    await provisionEsim(tx, 'oi-1');

    expect(mockCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        orderItemId: 'oi-1',
        status: 'pending',
        smdpAddress: 'smdp.example.com',
      }),
    });

    const callData = mockCreate.mock.calls[0][0].data;
    expect(callData.iccid).toMatch(/^8901\d{15}$/);
    expect(callData.activationCode).toMatch(/^ACT-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
  });
});
