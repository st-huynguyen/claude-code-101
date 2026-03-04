import { prisma } from '@/lib/db/prisma';

import type { Product } from '@/features/product/types';

export async function getProductById(id: string): Promise<Product | null> {
  const product = await prisma.product.findFirst({
    where: { id, isActive: true },
  });

  return product as unknown as Product | null;
}
