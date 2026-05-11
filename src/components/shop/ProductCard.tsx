'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShopifyProduct, formatMoney, isProductPurchasable } from '@/lib/shopify-api';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
  product: ShopifyProduct;
  locale: string;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const t = useTranslations('shop');
  const firstVariant = product.variants?.edges?.[0]?.node;
  const isAvailable = isProductPurchasable(product);
  const price = product.priceRange.minVariantPrice;
  const maxPrice = product.priceRange.maxVariantPrice;
  const hasRange = parseFloat(price.amount) !== parseFloat(maxPrice.amount);
  const compareAtPrice = firstVariant?.compareAtPrice;
  const isOnSale =
    compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  // Primary image: prefer images array (fetched in list queries), fallback to featuredImage
  const primaryImg = product.images?.edges?.[0]?.node ?? product.featuredImage;
  const hoverImg = product.images?.edges?.[1]?.node ?? null;

  return (
    <Link
      href={`/${locale}/shop/${product.handle}`}
      className="group flex flex-col bg-background overflow-hidden hover:shadow-theme-lg transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* ── Image ── */}
      <div className="relative aspect-square overflow-hidden bg-surface">
        {primaryImg ? (
          <>
            <Image
              src={primaryImg.url}
              alt={primaryImg.altText ?? product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-all duration-500 ${
                hoverImg ? 'group-hover:opacity-0' : 'group-hover:scale-105'
              }`}
            />
            {hoverImg && (
              <Image
                src={hoverImg.url}
                alt={hoverImg.altText ?? product.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-foreground-light text-sm">
            {t('noImage')}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {isOnSale && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              {t('badgeSale')}
            </span>
          )}
          {!isAvailable && (
            <span className="bg-foreground/80 text-background text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              {t('soldOut')}
            </span>
          )}
        </div>
      </div>

      {/* ── Info ── */}
      <div className="py-4 flex flex-col gap-1 flex-1">
        <p className="text-foreground font-medium leading-snug line-clamp-2 text-sm group-hover:text-primary-dark transition-colors">
          {product.title}
        </p>

        {product.productType && (
          <p className="text-foreground-muted text-xs">{product.productType}</p>
        )}

        <div className="mt-auto pt-3 flex items-center gap-2">
          <span className="font-semibold text-foreground text-sm">
            {hasRange ? t('priceFrom', { price: formatMoney(price) }) : formatMoney(price)}
          </span>
          {isOnSale && compareAtPrice && (
            <span className="text-xs text-foreground-muted line-through">
              {formatMoney(compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
