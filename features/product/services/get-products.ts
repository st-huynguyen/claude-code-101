import { prisma } from '@/lib/db/prisma';

import type { Product, ProductFilters } from '@/features/product/types';

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const where: Record<string, unknown> = { isActive: true };

  if (filters?.dataAmountGb) {
    where.dataAmountGb = filters.dataAmountGb;
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: filters?.sortByPrice ? { priceCents: filters.sortByPrice } : { createdAt: 'desc' },
  });

  return products as unknown as Product[];
}
