import { Suspense } from 'react';

import { getProducts } from '@/features/product/services/get-products';
import { getStorageOptions } from '@/features/product/services/get-storage-options';
import type { SortOrder } from '@/features/product/types';
import ProductFilters from '@/features/product/components/product-filters';
import ProductList from '@/features/product/components/product-list';

interface ProductsPageProps {
  searchParams: Promise<{ storage?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  const dataAmountGb =
    params.storage && params.storage !== 'all' ? Number(params.storage) : undefined;
  const sortByPrice =
    params.sort && params.sort !== 'none' ? (params.sort as SortOrder) : undefined;

  const [products, storageOptions] = await Promise.all([
    getProducts({ dataAmountGb, sortByPrice }),
    getStorageOptions(),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">eSIM Plans</h1>
        <Suspense>
          <ProductFilters storageOptions={storageOptions} />
        </Suspense>
      </div>
      <ProductList products={products} />
    </main>
  );
}
