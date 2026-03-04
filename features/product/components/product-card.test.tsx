import { render, screen } from '@testing-library/react';
import ProductCard from './product-card';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const product = {
  id: 'p1',
  name: 'Japan eSIM',
  description: '5GB data plan for Japan',
  vendorId: 'v1',
  dataAmountGb: 5,
  validityDays: 30,
  coverage: 'Japan',
  priceCents: 1499,
  currency: 'USD',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ProductCard', () => {
  it('renders product name and description', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText('Japan eSIM')).toBeInTheDocument();
    expect(screen.getByText('5GB data plan for Japan')).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText('$14.99')).toBeInTheDocument();
  });

  it('renders data amount badge', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText('5GB')).toBeInTheDocument();
  });

  it('renders coverage and validity', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.getByText('30 days')).toBeInTheDocument();
  });

  it('links to checkout page', () => {
    render(<ProductCard product={product} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/checkout/p1');
  });
});
