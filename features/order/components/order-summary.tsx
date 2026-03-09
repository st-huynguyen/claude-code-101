import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';

import type { Product } from '@/features/product/types';

interface OrderSummaryProps {
  product: Product;
}

export default function OrderSummary({ product }: OrderSummaryProps) {
  const priceFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency,
  }).format(product.priceCents / 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <Badge variant="secondary">{Number(product.dataAmountGb)}GB</Badge>
        </div>
        {product.description && (
          <p className="text-muted-foreground text-sm">{product.description}</p>
        )}
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Coverage</span>
            <span>{product.coverage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Validity</span>
            <span>{product.validityDays} days</span>
          </div>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between">
            <span className="font-medium">Total</span>
            <span className="text-2xl font-bold">{priceFormatted}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
