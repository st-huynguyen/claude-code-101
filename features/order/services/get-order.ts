import { prisma } from '@/lib/db/prisma';

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      orderItems: {
        include: { product: true },
      },
    },
  });
}
