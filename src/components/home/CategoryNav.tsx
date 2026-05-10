import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ShopifyCollection } from '@/lib/shopify-api';
import { PiArrowRight } from 'react-icons/pi';
import { cormorantGaramond } from '@/lib/fonts';

interface CategoryNavProps {
  collections: ShopifyCollection[];
  locale: string;
}

export default async function CategoryNav({ collections, locale }: CategoryNavProps) {
  const t = await getTranslations({ locale, namespace: 'categoryNav' });

  const displayCollections = collections.slice(0, 6);

  const placeholderGradients = [
    'from-rose-100 to-rose-200',
    'from-amber-100 to-amber-200',
    'from-emerald-100 to-emerald-200',
    'from-sky-100 to-sky-200',
    'from-violet-100 to-violet-200',
    'from-pink-100 to-pink-200',
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className={`text-3xl sm:text-4xl font-bold text-foreground ${cormorantGaramond.className}`}>
              {t('title')}
            </h2>
            <p className="text-foreground-light mt-2">{t('subtitle')}</p>
          </div>
          <Link
            href={`/${locale}/collections`}
            className="flex items-center gap-1 text-primary-dark font-semibold text-sm hover:gap-2 transition-all shrink-0"
          >
            {t('viewAll')} <PiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        {displayCollections.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {displayCollections.map((collection, i) => (
              <Link
                key={collection.id}
                href={`/${locale}/collections/${collection.handle}`}
                className="group flex flex-col items-center gap-3"
              >
                <div className="relative w-full aspect-square overflow-hidden hover:shadow-lg hover:-translate-y-1 group-hover:shadow-theme-lg transition-all duration-300">
                  {collection.image ? (
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${placeholderGradients[i % placeholderGradients.length]} flex items-center justify-center`}>
                      <span className={`text-3xl font-bold text-white/70 ${cormorantGaramond.className}`}>
                        {collection.title[0]}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <span className="text-sm font-semibold text-foreground text-center group-hover:text-primary-dark transition-colors leading-tight">
                  {collection.title}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          /* Skeleton placeholders while Shopify is being configured */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {placeholderGradients.map((grad, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${grad}`} />
                <div className="h-4 w-3/4 bg-border rounded animate-pulse" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
