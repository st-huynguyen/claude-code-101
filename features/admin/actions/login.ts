'use server';

import type { LoginResult } from '@/features/admin/types';

export async function login(
  _prevState: LoginResult | null,
  formData: FormData,
): Promise<LoginResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'All fields are required' };
  }

  // TODO: Wire up to real authentication logic
  return { success: false, error: 'Invalid email or password' };
}
