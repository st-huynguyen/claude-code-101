import Link from 'next/link';
import { Button } from '@/shared/ui/button';

export default function HeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Stay Connected <br className="hidden sm:inline" /> Anywhere in the World
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
          Instant eSIM plans for 190+ countries. No physical SIM needed &mdash; activate your data
          plan in minutes and enjoy seamless connectivity wherever you travel.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/products">Browse Plans</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#how-it-works">How It Works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
