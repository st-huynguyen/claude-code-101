export interface Product {
  id: string;
  name: string;
  description: string | null;
  vendorId: string;
  dataAmountGb: number | { toNumber(): number };
  validityDays: number;
  coverage: string;
  priceCents: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type SortOrder = 'asc' | 'desc';

export interface ProductFilters {
  dataAmountGb?: number;
  sortByPrice?: SortOrder;
}
