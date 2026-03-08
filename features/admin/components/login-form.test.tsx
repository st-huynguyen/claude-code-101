import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import LoginForm from './login-form';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('@/features/admin/actions/login', () => ({
  login: vi.fn(),
}));

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders login button', () => {
    render(<LoginForm />);

    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('email field has correct type', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  it('password field masks input', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('email and password fields are required', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Password')).toBeRequired();
  });

  it('renders card with title and description', () => {
    render(<LoginForm />);

    expect(screen.getByText('Admin Login')).toBeInTheDocument();
    expect(screen.getByText('Sign in to access the admin dashboard')).toBeInTheDocument();
  });
});
