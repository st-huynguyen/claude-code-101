import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Globe className="size-5" />
          <span>eSIM Store</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
}
