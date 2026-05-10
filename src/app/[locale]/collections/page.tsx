import { getCollections } from '@/lib/shopify-api';
import { cormorantGaramond } from '@/lib/fonts';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.collections.meta' });
  return { title: t('title'), description: t('description'), openGraph: { title: t('ogTitle'), description: t('ogDescription') } };
}

export default async function CollectionsPage({ params }: PageProps) {
  const { locale } = await params;
  const [collections, t] = await Promise.all([
    getCollections(24, locale),
    getTranslations({ locale, namespace: 'pages.collections' }),
  ]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-surface border-b border-border py-14 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
            {t('hero.eyebrow')}
          </p>
          <h1
            className={`text-4xl md:text-5xl font-bold text-foreground mb-4 ${cormorantGaramond.className}`}
          >
            {t('hero.title')}
          </h1>
          <p className="text-foreground-light text-lg max-w-xl mx-auto">
            {t('hero.description')}
          </p>
        </div>
      </section>

      {/* Collections grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {collections.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-foreground-light text-lg">{t('empty')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/${locale}/collections/${collection.handle}`}
                className="group relative flex flex-col overflow-hidden shadow-theme hover:shadow-theme-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-background">
                  {collection.image ? (
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText ?? collection.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary-light to-secondary">
                      <span
                        className={`text-4xl font-bold text-white/60 ${cormorantGaramond.className}`}
                      >
                        {collection.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="py-5 flex flex-col gap-2 flex-1">
                  <h2 className="text-foreground font-semibold text-lg group-hover:text-primary-dark transition-colors">
                    {collection.title}
                  </h2>
                  {collection.description && (
                    <p className="text-foreground-light text-sm line-clamp-2">
                      {collection.description}
                    </p>
                  )}
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <span className="text-xs text-primary font-medium group-hover:underline">
                      {t('shopNow')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
