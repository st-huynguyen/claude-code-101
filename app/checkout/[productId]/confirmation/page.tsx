import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

import { getOrderById } from '@/features/order/services/get-order';

interface ConfirmationPageProps {
  searchParams: Promise<{ orderId?: string; manageToken?: string }>;
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const { orderId, manageToken } = await searchParams;

  if (!orderId) {
    notFound();
  }

  const order = await getOrderById(orderId);

  if (!order) {
    notFound();
  }

  const orderItem = order.orderItems[0];
  const product = orderItem?.product;
  const esim = orderItem?.esim;

  const totalFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: order.currency,
  }).format(order.totalCents / 100);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
          ✓
        </div>
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="text-muted-foreground mt-2">
          Thank you for your purchase. A confirmation has been sent to {order.customer.email}.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order Number</span>
            <span className="font-mono">{order.orderNumber}</span>
          </div>
          {product && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Plan</span>
              <span>{product.name}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Customer</span>
            <span>{order.customer.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Email</span>
            <span>{order.customer.email}</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold">{totalFormatted}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {esim && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>eSIM Activation</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
              <p className="mb-1 text-xs tracking-wider text-blue-700 uppercase">Activation Code</p>
              <p className="font-mono text-lg font-bold tracking-widest text-blue-900">
                {esim.activationCode}
              </p>
              {esim.smdpAddress && (
                <p className="text-muted-foreground mt-2 text-xs">
                  SMDP Address: {esim.smdpAddress}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center gap-3">
        {manageToken && (
          <Button asChild variant="outline">
            <Link href={`/manage/${manageToken}`}>Manage Your eSIM</Link>
          </Button>
        )}
        <Button asChild>
          <Link href="/products">Browse More Plans</Link>
        </Button>
      </div>
    </main>
  );
}
