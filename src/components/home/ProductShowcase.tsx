import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ShopifyProduct, formatMoney } from '@/lib/shopify-api';
import { PiArrowRight, PiShoppingCartSimple } from 'react-icons/pi';
import { cormorantGaramond } from '@/lib/fonts';
import AddToCartButton from '@/components/shop/AddToCartButton';

interface ProductShowcaseProps {
  products: ShopifyProduct[];
  locale: string;
}

export default async function ProductShowcase({ products, locale }: ProductShowcaseProps) {
  const t = await getTranslations({ locale, namespace: 'productShowcase' });
  const tc = await getTranslations({ locale, namespace: 'shop' });

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-2 block">
              {t('title')}
            </span>
            <h2 className={`text-3xl sm:text-4xl font-bold text-foreground ${cormorantGaramond.className}`}>
              {t('subtitle')}
            </h2>
          </div>
          <Link
            href={`/${locale}/shop`}
            className="flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all shrink-0"
          >
            {t('viewAll')} <PiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {products.map((product) => {
            const image = product.images.edges[0]?.node;
            const price = product.priceRange.minVariantPrice;
            const firstVariant = product.variants.edges[0]?.node;
            const comparePrice = firstVariant?.compareAtPrice;
            const isOnSale = comparePrice && parseFloat(comparePrice.amount) > parseFloat(price.amount);
            const isAvailable = firstVariant?.availableForSale ?? product.availableForSale ?? true;
            const isSoldOut = !isAvailable;

            return (
              <div
                key={product.id}
                className="group relative bg-background rounded-2xl overflow-hidden flex-shrink-0 w-[220px] sm:w-[260px] lg:w-auto snap-start hover:shadow-theme-lg transition-all duration-300"
              >
                {/* Image */}
                <Link href={`/${locale}/shop/${product.handle}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                    {image ? (
                      <Image
                        src={image.url}
                        alt={image.altText || product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-surface to-surface-dark flex items-center justify-center">
                        <PiShoppingCartSimple className="w-10 h-10 text-border" />
                      </div>
                    )}

                    {/* NEW badge */}
                    <span className="absolute top-3 left-3 bg-foreground text-background text-xs font-bold px-2 py-1 rounded-full z-10">
                      {tc('badgeNew')}
                    </span>

                    {isOnSale && (
                      <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        {tc('badgeSale')}
                      </span>
                    )}
                    {isSoldOut && (
                      <span className="absolute bottom-3 left-3 bg-foreground/90 text-background text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide z-10">
                        {tc('soldOut')}
                      </span>
                    )}

                    {/* Quick-add on hover */}
                    <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
                      {firstVariant && (
                        <AddToCartButton
                          variantId={firstVariant.id}
                          available={firstVariant.availableForSale}
                          compact
                        />
                      )}
                    </div>
                  </div>
                </Link>

                {/* Info */}
                <div className="py-4">
                  <Link href={`/${locale}/shop/${product.handle}`}>
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary-dark transition-colors leading-tight mb-2">
                      {product.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-foreground">
                      {formatMoney(price)}
                    </span>
                    {isOnSale && comparePrice && (
                      <span className="text-sm text-foreground-muted line-through">
                        {formatMoney(comparePrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
