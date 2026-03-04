import { prisma } from '@/lib/db/prisma';

import type { CheckoutFormData, CheckoutResult } from '@/features/order/types';

export async function createOrder(data: CheckoutFormData): Promise<CheckoutResult> {
  const product = await prisma.product.findFirst({
    where: { id: data.productId, isActive: true },
  });

  if (!product) {
    return { success: false, error: 'Product not found' };
  }

  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  const orderNumber = `ORD-${timestamp}-${random}`;

  const order = await prisma.$transaction(async (tx) => {
    const customer = await tx.customer.upsert({
      where: { email: data.email },
      update: { name: data.name },
      create: { email: data.email, name: data.name },
    });

    const newOrder = await tx.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        status: 'paid',
        subtotalCents: product.priceCents,
        totalCents: product.priceCents,
        currency: product.currency,
        paidAt: new Date(),
        orderItems: {
          create: {
            productId: product.id,
            quantity: 1,
            unitPriceCents: product.priceCents,
          },
        },
      },
    });

    return newOrder;
  });

  return {
    success: true,
    orderId: order.id,
    orderNumber: order.orderNumber,
  };
}
