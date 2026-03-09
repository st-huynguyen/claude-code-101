import Link from 'next/link';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

import { cn } from '@/shared/utils/index';

import type { Product } from '@/features/product/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const priceFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency,
  }).format(product.priceCents / 100);

  return (
    <Link href={`/checkout/${product.id}`} className="block">
      <Card className={cn('flex flex-col transition-shadow hover:shadow-lg', className)}>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <Badge variant="secondary">{Number(product.dataAmountGb)}GB</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          {product.description && (
            <p className="text-muted-foreground text-sm">{product.description}</p>
          )}
          <div className="mt-3 flex flex-col gap-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Coverage</span>
              <span>{product.coverage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Validity</span>
              <span>{product.validityDays} days</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <span className="text-2xl font-bold">{priceFormatted}</span>
          <Button size="sm">Buy Now</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
