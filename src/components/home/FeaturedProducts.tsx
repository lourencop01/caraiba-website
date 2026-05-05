import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ShopifyProduct, formatMoney, getFirstAvailableVariant, isProductPurchasable } from '@/lib/shopify-api';
import { PiArrowRight, PiShoppingCartSimple } from 'react-icons/pi';
import AddToCartButton from '@/components/shop/AddToCartButton';
import { cormorantGaramond } from '@/lib/fonts';

interface FeaturedProductsProps {
  products: ShopifyProduct[];
  locale: string;
}

export default async function FeaturedProducts({ products, locale }: FeaturedProductsProps) {
  const t = await getTranslations({ locale, namespace: 'featuredProducts' });
  const tc = await getTranslations({ locale, namespace: 'shop' });

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
            href={`/${locale}/shop`}
            className="flex items-center gap-1 text-primary-dark font-semibold text-sm hover:gap-2 transition-all shrink-0"
          >
            {t('viewAll')} <PiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => {
              const image = product.images.edges[0]?.node;
              const price = product.priceRange.minVariantPrice;
              const firstVariant = product.variants.edges[0]?.node;
              const cartVariant = getFirstAvailableVariant(product) ?? firstVariant;
              const comparePrice = firstVariant?.compareAtPrice;
              const isOnSale = comparePrice && parseFloat(comparePrice.amount) > parseFloat(price.amount);
              const isAvailable = isProductPurchasable(product);
              const isSoldOut = !isAvailable;

              return (
                <div key={product.id} className="group relative bg-background rounded-2xl border border-border/30 overflow-hidden hover:shadow-theme-lg transition-all duration-300">
                  {/* Image */}
                  <Link href={`/${locale}/shop/${product.handle}`} className="block">
                    <div className="relative aspect-square overflow-hidden bg-surface">
                      {image ? (
                        <Image
                          src={image.url}
                          alt={image.altText || product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-surface to-surface-dark flex items-center justify-center">
                          <PiShoppingCartSimple className="w-12 h-12 text-border" />
                        </div>
                      )}

                      {isOnSale && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                          {tc('badgeSale')}
                        </span>
                      )}
                      {isSoldOut && (
                        <span className="absolute top-3 right-3 bg-foreground/90 text-background text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide z-10">
                          {tc('soldOut')}
                        </span>
                      )}

                      {/* Quick-add overlay on hover */}
                      <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
                        {cartVariant && (
                          <AddToCartButton
                            variantId={cartVariant.id}
                            available={cartVariant.availableForSale}
                            compact
                          />
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-4">
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
        ) : (
          /* Skeleton */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-background rounded-2xl border border-border/30 overflow-hidden">
                <div className="aspect-square bg-surface animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-surface rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-surface rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
