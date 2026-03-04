import { getProducts } from './get-products';

vi.mock('@/lib/db/prisma', () => ({
  prisma: {
    product: {
      findMany: vi.fn(),
    },
  },
}));

const { prisma } = await import('@/lib/db/prisma');
const findMany = vi.mocked(prisma.product.findMany);

const fakeProduct = {
  id: '1',
  name: 'Test eSIM',
  description: 'A test product',
  vendorId: 'v1',
  dataAmountGb: 5,
  validityDays: 30,
  coverage: 'Global',
  priceCents: 999,
  currency: 'USD',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('getProducts', () => {
  beforeEach(() => {
    findMany.mockReset();
  });

  it('returns active products sorted by createdAt desc by default', async () => {
    findMany.mockResolvedValue([fakeProduct]);

    const result = await getProducts();

    expect(findMany).toHaveBeenCalledWith({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    expect(result).toEqual([fakeProduct]);
  });

  it('filters by dataAmountGb when provided', async () => {
    findMany.mockResolvedValue([fakeProduct]);

    await getProducts({ dataAmountGb: 5 });

    expect(findMany).toHaveBeenCalledWith({
      where: { isActive: true, dataAmountGb: 5 },
      orderBy: { createdAt: 'desc' },
    });
  });

  it('sorts by price when sortByPrice is provided', async () => {
    findMany.mockResolvedValue([fakeProduct]);

    await getProducts({ sortByPrice: 'asc' });

    expect(findMany).toHaveBeenCalledWith({
      where: { isActive: true },
      orderBy: { priceCents: 'asc' },
    });
  });
});
