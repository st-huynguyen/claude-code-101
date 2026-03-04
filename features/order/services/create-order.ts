import { prisma } from '@/lib/db/prisma';

import type { CheckoutFormData, CheckoutResult } from '@/features/order/types';
import { provisionEsim } from '@/features/esim/services/provision-esim';
import { createMagicLink } from '@/features/order/services/create-magic-link';
import { buildConfirmationEmail } from '@/features/order/services/build-confirmation-email';
import { sendEmail } from '@/lib/email/send-email';

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

  const { order, esim, manageToken } = await prisma.$transaction(async (tx) => {
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
      include: { orderItems: true },
    });

    const orderItem = newOrder.orderItems[0];
    const newEsim = await provisionEsim(tx, orderItem.id);
    const token = await createMagicLink(tx, newOrder.id);

    return { order: newOrder, esim: newEsim, manageToken: token };
  });

  const totalFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency,
  }).format(product.priceCents / 100);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
  const manageUrl = `${baseUrl}/manage/${manageToken}`;

  const { subject, html } = buildConfirmationEmail({
    customerName: data.name,
    orderNumber,
    productName: product.name,
    totalFormatted,
    activationCode: esim.activationCode ?? '',
    smdpAddress: esim.smdpAddress ?? '',
    manageUrl,
  });

  sendEmail({ to: data.email, subject, html }).then((result) => {
    if (!result.success) {
      console.error('Email send failed:', result.error);
    }
  });

  return {
    success: true,
    orderId: order.id,
    orderNumber: order.orderNumber,
    manageToken,
  };
}
