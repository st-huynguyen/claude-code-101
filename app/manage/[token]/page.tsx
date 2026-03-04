import Link from 'next/link';

import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

import { validateMagicLink } from '@/features/order/services/validate-magic-link';

interface ManagePageProps {
  params: Promise<{ token: string }>;
}

export default async function ManagePage({ params }: ManagePageProps) {
  const { token } = await params;
  const order = await validateMagicLink(token);

  if (!order) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600">
          !
        </div>
        <h1 className="text-2xl font-bold">Invalid or Expired Link</h1>
        <p className="text-muted-foreground mt-2">
          This manage link is no longer valid. Please contact support if you need help.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Go Home</Link>
        </Button>
      </main>
    );
  }

  const orderItem = order.orderItems[0];
  const product = orderItem?.product;
  const esim = orderItem?.esim;

  const totalFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: order.currency,
  }).format(order.totalCents / 100);

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    active: 'bg-green-100 text-green-800',
    expired: 'bg-gray-100 text-gray-800',
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Manage Your eSIM</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order Number</span>
            <span className="font-mono">{order.orderNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Customer</span>
            <span>{order.customer.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Email</span>
            <span>{order.customer.email}</span>
          </div>
          {product && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Plan</span>
              <span>{product.name}</span>
            </div>
          )}
          <div className="border-t pt-3">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold">{totalFormatted}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {esim && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>eSIM Details</CardTitle>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[esim.status] ?? 'bg-gray-100 text-gray-800'}`}
              >
                {esim.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
              <p className="mb-1 text-xs tracking-wider text-blue-700 uppercase">Activation Code</p>
              <p className="font-mono text-lg font-bold tracking-widest text-blue-900">
                {esim.activationCode}
              </p>
            </div>
            {esim.smdpAddress && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">SMDP Address</span>
                <span className="font-mono">{esim.smdpAddress}</span>
              </div>
            )}
            {esim.iccid && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ICCID</span>
                <span className="font-mono">{esim.iccid}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
