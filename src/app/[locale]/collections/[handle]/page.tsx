import { getCollectionByHandle } from '@/lib/shopify-api';
import ProductCard from '@/components/shop/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type PageProps = { params: Promise<{ locale: string; handle: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, handle } = await params;
  const result = await getCollectionByHandle(handle, 24, locale);
  if (!result) return {};
  return {
    title: `${result.collection.title} | Collections | Salon Concept`,
    description: result.collection.description,
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { locale, handle } = await params;
  const result = await getCollectionByHandle(handle, 24, locale);

  if (!result) notFound();

  const { collection, products } = result;

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-foreground-light">
          <Link href={`/${locale}`} className="hover:text-primary transition-colors">
            {locale === 'en' ? 'Home' : 'Início'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/collections`} className="hover:text-primary transition-colors">
            {locale === 'en' ? 'Collections' : 'Coleções'}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[200px]">{collection.title}</span>
        </div>
      </div>

      {/* Collection header */}
      <section className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {collection.image && (
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-border flex-shrink-0">
                <Image
                  src={collection.image.url}
                  alt={collection.image.altText ?? collection.title}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h1
                className="text-3xl md:text-4xl font-bold text-foreground mb-3"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                {collection.title}
              </h1>
              {collection.description && (
                <p className="text-foreground-light text-lg max-w-2xl">{collection.description}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-foreground-light text-lg">
              {locale === 'en' ? 'No products in this collection yet.' : 'Ainda não há produtos nesta coleção.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
