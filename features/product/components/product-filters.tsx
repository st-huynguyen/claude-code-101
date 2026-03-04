'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

interface ProductFiltersProps {
  storageOptions: number[];
}

export default function ProductFilters({ storageOptions }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStorage = searchParams.get('storage') ?? '';
  const currentSort = searchParams.get('sort') ?? '';

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <div className="flex flex-wrap gap-3">
      <Select value={currentStorage} onValueChange={(value) => updateParams('storage', value)}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="All storages" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All storages</SelectItem>
          {storageOptions.map((gb) => (
            <SelectItem key={gb} value={String(gb)}>
              {gb}GB
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={currentSort} onValueChange={(value) => updateParams('sort', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Default</SelectItem>
          <SelectItem value="asc">Price: Low to High</SelectItem>
          <SelectItem value="desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
