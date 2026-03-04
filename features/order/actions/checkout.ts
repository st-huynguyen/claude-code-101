'use server';

import { createOrder } from '@/features/order/services/create-order';
import type { CheckoutResult } from '@/features/order/types';

export async function checkout(
  _prevState: CheckoutResult | null,
  formData: FormData,
): Promise<CheckoutResult> {
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const productId = formData.get('productId') as string;

  if (!email || !name || !productId) {
    return { success: false, error: 'All fields are required' };
  }

  return createOrder({ email, name, productId });
}
