import { prisma } from '@/lib/db/prisma';

export async function getStorageOptions(): Promise<number[]> {
  const results = await prisma.product.findMany({
    where: { isActive: true },
    select: { dataAmountGb: true },
    distinct: ['dataAmountGb'],
    orderBy: { dataAmountGb: 'asc' },
  });

  return results.map((r) => Number(r.dataAmountGb));
}
