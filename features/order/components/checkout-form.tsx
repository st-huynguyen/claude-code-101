'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

import { checkout } from '@/features/order/actions/checkout';
import type { CheckoutResult } from '@/features/order/types';

interface CheckoutFormProps {
  productId: string;
}

export default function CheckoutForm({ productId }: CheckoutFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<CheckoutResult | null, FormData>(
    checkout,
    null,
  );

  useEffect(() => {
    if (state?.success && state.orderId) {
      const params = new URLSearchParams({ orderId: state.orderId });
      if (state.manageToken) params.set('manageToken', state.manageToken);
      router.push(`/checkout/${productId}/confirmation?${params.toString()}`);
    }
  }, [state, productId, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="productId" value={productId} />
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
          </div>
          {state?.error && <p className="text-destructive text-sm">{state.error}</p>}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Processing...' : 'Complete Purchase'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
