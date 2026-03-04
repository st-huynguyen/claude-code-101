import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { getProducts } from '@/features/product/services/get-products';
import ProductList from '@/features/product/components/product-list';
import HeroSection from '@/app/_components/hero-section';
import HowItWorks from '@/app/_components/how-it-works';

export default async function Home() {
  const products = await getProducts({ sortByPrice: 'asc' });
  const featuredProducts = products.slice(0, 3);

  return (
    <main>
      <HeroSection />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Featured Plans</h2>
            <Button asChild variant="outline">
              <Link href="/products">View All</Link>
            </Button>
          </div>
          <ProductList products={featuredProducts} />
        </div>
      </section>

      <HowItWorks />
    </main>
  );
}
