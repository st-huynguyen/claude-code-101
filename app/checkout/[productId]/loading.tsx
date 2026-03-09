import { Card, CardContent, CardHeader } from '@/shared/ui/card';

export default function CheckoutLoading() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="bg-muted mb-6 h-9 w-40 animate-pulse rounded" />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="bg-muted h-6 w-32 animate-pulse rounded" />
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="bg-muted h-5 w-full animate-pulse rounded" />
            <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
            <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="bg-muted h-6 w-40 animate-pulse rounded" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="bg-muted h-10 w-full animate-pulse rounded" />
            <div className="bg-muted h-10 w-full animate-pulse rounded" />
            <div className="bg-muted h-10 w-full animate-pulse rounded" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
