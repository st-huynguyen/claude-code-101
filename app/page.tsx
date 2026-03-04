'use client';

import { Button } from '@/shared/ui/button';

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const me: any = {
    name: 'John Doe',
    age: 10,
  };

  const handleClick = () => {
    console.log('Button clicked!', me.name);
  };

  return (
    <div className="flex min-h-screen items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}
