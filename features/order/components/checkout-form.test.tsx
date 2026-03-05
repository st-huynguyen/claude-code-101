import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import CheckoutForm from './checkout-form';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('@/features/order/actions/checkout', () => ({
  checkout: vi.fn(),
}));

const defaultProps = {
  productId: 'prod-1',
  productName: 'Japan Travel eSIM',
  priceCents: 1999,
  currency: 'USD',
  dataAmountGb: 5,
  validityDays: 30,
};

describe('CheckoutForm', () => {
  it('renders the form with customer information fields', () => {
    render(<CheckoutForm {...defaultProps} />);

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Complete Purchase' })).toBeInTheDocument();
  });

  it('opens confirmation dialog when form is valid', async () => {
    const user = userEvent.setup();
    render(<CheckoutForm {...defaultProps} />);

    await user.type(screen.getByLabelText('Full Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.click(screen.getByRole('button', { name: 'Complete Purchase' }));

    expect(screen.getByText('Confirm Your Purchase')).toBeInTheDocument();
  });

  it('displays order summary in the confirmation dialog', async () => {
    const user = userEvent.setup();
    render(<CheckoutForm {...defaultProps} />);

    await user.type(screen.getByLabelText('Full Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.click(screen.getByRole('button', { name: 'Complete Purchase' }));

    expect(screen.getByText('Japan Travel eSIM')).toBeInTheDocument();
    expect(screen.getByText('5 GB')).toBeInTheDocument();
    expect(screen.getByText('30 days')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });

  it('closes the dialog when cancel is clicked', async () => {
    const user = userEvent.setup();
    render(<CheckoutForm {...defaultProps} />);

    await user.type(screen.getByLabelText('Full Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.click(screen.getByRole('button', { name: 'Complete Purchase' }));

    expect(screen.getByText('Confirm Your Purchase')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.queryByText('Confirm Your Purchase')).not.toBeInTheDocument();
  });
});
