import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';

export default function ProductsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-9 w-40 animate-pulse rounded-md bg-muted" />
        <div className="flex gap-3">
          <div className="h-9 w-[160px] animate-pulse rounded-md bg-muted" />
          <div className="h-9 w-[180px] animate-pulse rounded-md bg-muted" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />
                <div className="h-5 w-12 animate-pulse rounded-full bg-muted" />
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="mt-3 flex flex-col gap-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
