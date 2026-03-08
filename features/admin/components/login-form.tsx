'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

import { login } from '@/features/admin/actions/login';
import type { LoginResult } from '@/features/admin/types';

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<LoginResult | null, FormData>(login, null);

  useEffect(() => {
    if (state?.success) {
      router.push('/admin');
    }
  }, [state, router]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Admin Login</CardTitle>
        <CardDescription>Sign in to access the admin dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          {state?.error && <p className="text-destructive text-sm">{state.error}</p>}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
