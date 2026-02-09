# Component Patterns

Two patterns coexist in this project. **Custom components** use `export default function` with a separate props interface. Default **shadcn/ui components** (`shared/ui/`) use plain `function` declarations with named exports — do not modify that pattern.

## Custom Components — Function Declaration with Default Export (PREFERRED)

### Basic Pattern

```tsx
interface MyComponentProps {
  userId: number;
  onAction?: () => void;
}

export default function MyComponent({ userId, onAction }: MyComponentProps) {
  return <div>User: {userId}</div>;
}
```

**Key Points:**

- Separate `interface` for props (with JSDoc when helpful)
- `export default function` inline (not at bottom)
- Destructure props in parameters
- No `React.FC` — use direct annotation
- No `import React` needed (React 19 JSX transform handles it)

### Server Component (pages)

Page components use `export default function` with `async`:

```tsx
import { getProducts } from '@/features/product/services/get-products';
import ProductList from '@/features/product/components/product-list';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">Products</h1>
      <ProductList products={products} />
    </main>
  );
}
```

### Client Component

Add `"use client"` only when the component needs hooks, event handlers, or browser APIs.

```tsx
'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/shared/ui/button';

import { useAuth } from '@/shared/hooks/use-auth';

// 1. PROPS INTERFACE
interface AddToCartButtonProps {
  productId: string;
}

// 2. COMPONENT DEFINITION
export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  // 2.1. HOOKS
  const { user } = useAuth();

  // 2.2. STATES
  const [pending, setPending] = useState(false);

  // 2.3. EVENT HANDLER
  const handleAdd = () => {
    setPending(true);
    // ...
  };

  // 2.4. EFFECT
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, []);

  // 2.5. RENDER
  return (
    <Button onClick={handleAdd} disabled={pending}>
      Add to Cart
    </Button>
  );
}
```

## Export Patterns

- Custom components: `export default function ComponentName()` (inline)
- Page/route files: `export default function PageName()` / `export default async function`
- shadcn/ui components: `export { ComponentName }` (named, not default)
- Hooks, services, actions, utils: named exports (`export function`, `export const`)

## Import Orders

Group imports in this order, separated by blank lines. Only include groups you need.

```tsx
// 1. React (only when using hooks or React APIs)
import { useState, useCallback, useMemo, useEffect } from 'react';

// 2. Next.js
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 3. Third-party libraries
import { useForm } from 'react-hook-form';
import { ShoppingCart, ChevronRight } from 'lucide-react';

// 4. shadcn/ui components
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/shared/ui/form';

// 5. Shared utilities and types
import { cn } from '@/shared/utils';
import type { ActionResult } from '@/shared/types';

// 6. Feature imports — all by direct path
import { getProducts } from '@/features/product/services/get-products';
import type { Product } from '@/features/product/types';
import ProductList from '@/features/product/components/product-list';
```

## shadcn/ui Components (`shared/ui/`) — Do Not Modify

Plain `function` declarations with `React.ComponentProps`. Keep this pattern to match upstream shadcn/ui.

```tsx
import * as React from 'react';
import { cn } from '@/shared/utils/index';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn('border-input h-9 w-full rounded-md border', className)}
      {...props}
    />
  );
}

export { Input };
```

- `function` declaration (not `React.FC`)
- `React.ComponentProps<'element'>` for props
- `data-slot` attribute, `cn()` for class merging
- Named export `export { X }` (not default)
