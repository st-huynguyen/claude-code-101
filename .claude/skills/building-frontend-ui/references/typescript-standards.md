# TypeScript Standards

TypeScript best practices for this Next.js 16 / React 19 project.

---

## Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "paths": { "@/*": ["./*"] }
  }
}
```

**This means:**

- No implicit `any` types
- Null/undefined must be handled explicitly
- No `import React` needed for JSX (react-jsx transform)
- Path alias `@/*` maps to project root

---

## No `any` Type

```typescript
// ❌ NEVER
function handleData(data: any) {
  return data.something;
}

// ✅ Use specific types
function handleData(data: MyData) {
  return data.something;
}

// ✅ Or unknown for truly unknown data
function handleUnknown(data: unknown) {
  if (typeof data === 'object' && data !== null && 'something' in data) {
    return (data as MyData).something;
  }
}
```

---

## Explicit Return Types

```typescript
// ✅ Explicit return type
function getUser(id: string): Promise<User> {
  return apiClient.get(`/users/${id}`);
}

function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Hooks — return type on custom hooks
function useProduct(id: string): { data: Product | null; isLoading: boolean } {
  const [data, setData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  return { data, isLoading };
}
```

---

## Type Imports

```typescript
// ✅ Use `import type` for type-only imports
import type { Product } from '@/features/product/types';
import type { ActionResult } from '@/shared/types';

// ❌ Don't mix value and type imports
import { Product } from '@/features/product/types';
```

---

## Component Prop Interfaces

Use separate `interface` with JSDoc. No `React.FC` — use `export default function`.

```tsx
interface ProductCardProps {
  /** The product to display */
  product: Product;
  /** Optional callback when added to cart */
  onAddToCart?: (id: string) => void;
  /** Display mode */
  mode?: 'compact' | 'full';
  /** Additional CSS classes */
  className?: string;
}

export default function ProductCard({
  product,
  onAddToCart,
  mode = 'full',
  className,
}: ProductCardProps) {
  return <div>...</div>;
}
```

### Props with Children

```tsx
interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

---

## ActionResult Pattern

Standard return type for server actions:

```typescript
// shared/types/index.ts
type ActionResult<T = void> = { success: true; data: T } | { success: false; error: string };
```

Usage in actions:

```typescript
export async function createOrder(formData: FormData): Promise<ActionResult<Order>> {
  try {
    const order = await orderService.create(formData);
    return { success: true, data: order };
  } catch (error) {
    return { success: false, error: 'Failed to create order' };
  }
}
```

Usage in components:

```typescript
const result = await createOrder(formData);
if (result.success) {
  // result.data is Order
} else {
  // result.error is string
}
```

---

## Utility Types

```typescript
// Make all properties optional
type ProductUpdate = Partial<Product>;

// Select specific properties
type ProductPreview = Pick<Product, 'id' | 'name' | 'priceCents'>;

// Exclude specific properties
type PublicProduct = Omit<Product, 'vendorId'>;

// Type-safe object map
const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  paid: 'Paid',
  failed: 'Failed',
  refunded: 'Refunded',
};
```

---

## Type Guards

```typescript
// Basic type guard
function isProduct(data: unknown): data is Product {
  return typeof data === 'object' && data !== null && 'id' in data && 'priceCents' in data;
}

// Discriminated unions
type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
```

---

## Null/Undefined Handling

```typescript
// Optional chaining
const name = user?.profile?.name;

// Nullish coalescing (only null/undefined, not '' or 0)
const displayName = user?.name ?? 'Anonymous';

// Prefer explicit checks over non-null assertion
const data = getData();
if (data) {
  // use data
}
```

---

## Summary

- Strict mode enabled — no implicit `any`
- `import type` for type-only imports
- Explicit return types on functions and hooks
- `interface` for component props with JSDoc
- `ActionResult<T>` for server action returns
- Utility types (`Partial`, `Pick`, `Omit`, `Record`)
- Optional chaining + nullish coalescing over non-null assertions
