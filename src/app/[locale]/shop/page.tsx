import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getFilteredProducts, buildProductQueryString, getCollections, getProductTypes, SortOption } from '@/lib/shopify-api';
import ShopClient from './ShopClient';

type SearchParams = { [key: string]: string | string[] | undefined };

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function str(v: SearchParams[string]): string | null {
  if (!v) return null;
  return Array.isArray(v) ? v[0] : v;
}
function arr(v: SearchParams[string]): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

// ── Metadata ───────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.shop.meta' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('ogTitle'), description: t('ogDescription') },
  };
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function ShopPage({ params, searchParams }: PageProps) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  const t = await getTranslations({ locale, namespace: 'pages.shop' });

  // Parse URL search params
  const sort = (str(sp.sort) ?? 'featured') as SortOption;
  const filterJsons = arr(sp.filter);
  const minPrice = str(sp.minPrice);
  const maxPrice = str(sp.maxPrice);
  const inStock = str(sp.inStock) === 'true';
  const collectionHandle = str(sp.collection);

  const queryString = buildProductQueryString({ filterJsons, minPrice, maxPrice, inStock });

  // Fetch products, collections, and product types in parallel
  const [{ products, filters, pageInfo }, collections, productTypes] = await Promise.all([
    getFilteredProducts({ first: 24, sort, queryString, filterJsons, collectionHandle, inStock, minPrice, maxPrice, locale }),
    getCollections(50, locale),
    getProductTypes(50, locale),
  ]);

  // Key forces ShopClient to remount (reset load-more state) when sort/filters change
  const clientKey = JSON.stringify({ sort, filterJsons, minPrice, maxPrice, inStock, collectionHandle });

  return (
    <main className="min-h-screen bg-background">
      {/* Collection header */}
      <section className="bg-surface border-b border-border py-14 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
            {t('hero.eyebrow')}
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            {t('hero.title')}
          </h1>
          <p className="text-foreground-light text-lg max-w-xl mx-auto">
            {t('hero.description')}
          </p>
        </div>
      </section>

      {/* Interactive PLP — must be in Suspense because ShopClient uses useSearchParams() */}
      <Suspense fallback={<PLPSkeleton />}>
        <ShopClient
          key={clientKey}
          initialProducts={products}
          initialPageInfo={pageInfo}
          availableFilters={filters}
          availableCollections={collections}
          availableProductTypes={productTypes}
          locale={locale}
        />
      </Suspense>
    </main>
  );
}

// ── Loading skeleton ───────────────────────────────────────────────────────────
function PLPSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Toolbar skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-9 w-28 bg-surface rounded-full animate-pulse" />
        <div className="h-9 w-36 bg-surface rounded-lg animate-pulse" />
      </div>
      <div className="flex gap-10">
        {/* Sidebar skeleton */}
        <div className="hidden lg:flex flex-col gap-4 w-52 flex-shrink-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-6 bg-surface rounded animate-pulse" />
          ))}
        </div>
        {/* Grid skeleton */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-surface rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-square bg-border/30" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-border/30 rounded w-3/4" />
                <div className="h-4 bg-border/30 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
