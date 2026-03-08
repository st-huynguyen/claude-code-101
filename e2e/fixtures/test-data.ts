export const PRODUCTS = [
  {
    name: 'Viettel 10GB',
    description: '10GB data plan for 30 days',
    dataAmountGb: 10,
    validityDays: 30,
    coverage: 'Vietnam',
    priceCents: 999,
    priceFormatted: '$9.99',
  },
  {
    name: 'Viettel 20GB',
    description: '20GB data plan for 30 days',
    dataAmountGb: 20,
    validityDays: 30,
    coverage: 'Vietnam',
    priceCents: 1799,
    priceFormatted: '$17.99',
  },
  {
    name: 'Viettel 50GB',
    description: '50GB data plan for 30 days',
    dataAmountGb: 50,
    validityDays: 30,
    coverage: 'Vietnam',
    priceCents: 3999,
    priceFormatted: '$39.99',
  },
] as const;

export const ADMIN = {
  email: 'admin@esim.com',
  password: 'admin123',
} as const;

export const TEST_CUSTOMER = {
  name: 'E2E Test Customer',
  email: 'e2e-test@example.com',
} as const;

export const E2E_MAGIC_LINK_TOKEN = 'e2e-test-token';
