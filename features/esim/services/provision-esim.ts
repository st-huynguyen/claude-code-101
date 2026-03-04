import type { PrismaClient } from '@/lib/db/generated/client';

type TransactionClient = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0];

function generateIccid(): string {
  const suffix = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join('');
  return `8901${suffix}`;
}

function generateActivationCode(): string {
  const segment = () =>
    Array.from({ length: 4 }, () =>
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 36)),
    ).join('');
  return `ACT-${segment()}-${segment()}-${segment()}`;
}

export async function provisionEsim(tx: TransactionClient, orderItemId: string) {
  const iccid = generateIccid();
  const activationCode = generateActivationCode();
  const smdpAddress = 'smdp.example.com';

  return tx.esim.create({
    data: {
      orderItemId,
      iccid,
      activationCode,
      smdpAddress,
      status: 'pending',
    },
  });
}
