import { Card, CardContent, CardHeader } from '@/shared/ui/card';

export default function AdminLoginLoading() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="bg-muted h-6 w-32 animate-pulse rounded" />
        <div className="bg-muted h-4 w-56 animate-pulse rounded" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="bg-muted h-4 w-12 animate-pulse rounded" />
            <div className="bg-muted h-9 w-full animate-pulse rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-muted h-4 w-16 animate-pulse rounded" />
            <div className="bg-muted h-9 w-full animate-pulse rounded" />
          </div>
          <div className="bg-muted h-9 w-full animate-pulse rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
