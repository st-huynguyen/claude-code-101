import crypto from 'crypto';

import type { PrismaClient } from '@/lib/db/generated/client';

type TransactionClient = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0];

export async function createMagicLink(tx: TransactionClient, orderId: string) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await tx.magicLinkToken.create({
    data: { token, orderId, expiresAt },
  });

  return token;
}
