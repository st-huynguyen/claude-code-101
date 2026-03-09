export default function HomeLoading() {
  return (
    <main className="animate-pulse">
      {/* Hero skeleton */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-muted mx-auto h-12 w-3/4 rounded sm:w-1/2" />
          <div className="bg-muted mx-auto mt-6 h-6 w-2/3 rounded" />
          <div className="bg-muted mx-auto mt-2 h-6 w-1/2 rounded" />
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="bg-muted h-11 w-32 rounded-md" />
            <div className="bg-muted h-11 w-32 rounded-md" />
          </div>
        </div>
      </section>

      {/* Featured plans skeleton */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div className="bg-muted h-9 w-48 rounded" />
            <div className="bg-muted h-10 w-24 rounded-md" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border p-6">
                <div className="bg-muted mb-4 h-5 w-2/3 rounded" />
                <div className="bg-muted mb-2 h-4 w-full rounded" />
                <div className="bg-muted mb-6 h-4 w-3/4 rounded" />
                <div className="bg-muted h-8 w-20 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works skeleton */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="bg-muted mx-auto h-9 w-48 rounded" />
            <div className="bg-muted mx-auto mt-3 h-5 w-64 rounded" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-muted size-10 rounded-lg" />
                  <div className="bg-muted h-5 w-32 rounded" />
                </div>
                <div className="bg-muted h-4 w-full rounded" />
                <div className="bg-muted mt-2 h-4 w-2/3 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
