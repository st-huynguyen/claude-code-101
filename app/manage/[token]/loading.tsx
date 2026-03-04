import { Card, CardContent, CardHeader } from '@/shared/ui/card';

export default function ManageLoading() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="bg-muted mb-6 h-9 w-64 animate-pulse rounded" />

      <Card className="mb-6">
        <CardHeader>
          <div className="bg-muted h-6 w-32 animate-pulse rounded" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="bg-muted h-4 w-24 animate-pulse rounded" />
              <div className="bg-muted h-4 w-32 animate-pulse rounded" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="bg-muted h-6 w-28 animate-pulse rounded" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="bg-muted h-20 animate-pulse rounded" />
          <div className="flex justify-between">
            <div className="bg-muted h-4 w-24 animate-pulse rounded" />
            <div className="bg-muted h-4 w-40 animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
