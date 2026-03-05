import { notFound } from 'next/navigation';

import { getProductById } from '@/features/product/services/get-product-by-id';
import OrderSummary from '@/features/order/components/order-summary';
import CheckoutForm from '@/features/order/components/checkout-form';

interface CheckoutPageProps {
  params: Promise<{ productId: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <OrderSummary product={product} />
        <CheckoutForm
          productId={productId}
          productName={product.name}
          priceCents={product.priceCents}
          currency={product.currency}
          dataAmountGb={
            typeof product.dataAmountGb === 'number'
              ? product.dataAmountGb
              : product.dataAmountGb.toNumber()
          }
          validityDays={product.validityDays}
        />
      </div>
    </main>
  );
}
