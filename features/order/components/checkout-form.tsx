'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';

import { checkout } from '@/features/order/actions/checkout';
import type { CheckoutResult } from '@/features/order/types';

interface CheckoutFormProps {
  productId: string;
  productName: string;
  priceCents: number;
  currency: string;
  dataAmountGb: number;
  validityDays: number;
}

function formatPrice(priceCents: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(priceCents / 100);
}

export default function CheckoutForm({
  productId,
  productName,
  priceCents,
  currency,
  dataAmountGb,
  validityDays,
}: CheckoutFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [state, formAction, isPending] = useActionState<CheckoutResult | null, FormData>(
    checkout,
    null,
  );

  const shouldCloseDialog = (state?.success && state.orderId) || state?.error;
  const isDialogOpen = dialogOpen && !shouldCloseDialog;

  useEffect(() => {
    if (state?.success && state.orderId) {
      const params = new URLSearchParams({ orderId: state.orderId });
      if (state.manageToken) params.set('manageToken', state.manageToken);
      router.push(`/checkout/${productId}/confirmation?${params.toString()}`);
    }
  }, [state, productId, router]);

  function handlePurchaseClick() {
    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }
    const formData = new FormData(formRef.current);
    setCustomerEmail(formData.get('email') as string);
    setDialogOpen(true);
  }

  function handleConfirm() {
    formRef.current?.requestSubmit();
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="flex flex-col gap-4">
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
            <Button
              type="button"
              onClick={handlePurchaseClick}
              disabled={isPending}
              className="w-full"
            >
              {isPending ? 'Processing...' : 'Complete Purchase'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Purchase</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="flex flex-col gap-3">
                <p>Please review your order before confirming:</p>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <dt className="text-muted-foreground">Product</dt>
                  <dd className="font-medium">{productName}</dd>
                  <dt className="text-muted-foreground">Data</dt>
                  <dd className="font-medium">{dataAmountGb} GB</dd>
                  <dt className="text-muted-foreground">Validity</dt>
                  <dd className="font-medium">{validityDays} days</dd>
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="font-medium">{customerEmail}</dd>
                  <dt className="text-muted-foreground">Total</dt>
                  <dd className="font-medium">{formatPrice(priceCents, currency)}</dd>
                </dl>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isPending}>
              {isPending ? 'Processing...' : 'Confirm Purchase'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
