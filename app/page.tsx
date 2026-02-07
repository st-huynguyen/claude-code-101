import { Button } from '@/shared/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
}
