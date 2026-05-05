import { getProductByHandle, formatMoney } from '@/lib/shopify-api';
import { cormorantGaramond } from '@/lib/fonts';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import ProductImageGallery from '@/components/shop/ProductImageGallery';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AddToCartButton from '@/components/shop/AddToCartButton';
import BuyNowButton from '@/components/shop/BuyNowButton';
import VariantSelector from '@/components/shop/VariantSelector';

type PageProps = {
  params: Promise<{ locale: string; handle: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return {};
  return {
    title: `${product.title} | Shop | Salon Concept`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { locale, handle } = await params;
  const [product, tn, tp] = await Promise.all([
    getProductByHandle(handle, locale),
    getTranslations({ locale, namespace: 'navigation' }),
    getTranslations({ locale, namespace: 'pages.product' }),
  ]);

  if (!product) notFound();

  const firstVariant = product.variants.edges[0]?.node;
  const images = product.images.edges.map((e) => e.node);
  // Fall back to featuredImage if the images array is empty
  const galleryImages =
    images.length > 0
      ? images
      : product.featuredImage
      ? [product.featuredImage]
      : [];

  // Determine if we need a variant selector (more than one variant or option)
  const hasOptions =
    (product.options?.length ?? 0) > 0 &&
    !(product.options?.length === 1 && product.options[0].values.length === 1);

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-foreground-light">
          <Link href={`/${locale}`} className="hover:text-primary-dark transition-colors">
            {tn('home')}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/shop`} className="hover:text-primary-dark transition-colors">
            {tn('shop')}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Images */}
          <ProductImageGallery images={galleryImages} title={product.title} />

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1
                className={`text-3xl md:text-4xl font-bold text-foreground mb-3 ${cormorantGaramond.className}`}
              >
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                {firstVariant?.compareAtPrice &&
                  parseFloat(firstVariant.compareAtPrice.amount) >
                    parseFloat(firstVariant.price.amount) && (
                    <span className="text-foreground-light line-through text-lg">
                      {formatMoney(firstVariant.compareAtPrice)}
                    </span>
                  )}
                <span className="text-primary text-2xl font-semibold">
                  {formatMoney(product.priceRange.minVariantPrice)}
                </span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="text-foreground-light leading-relaxed">
                {product.descriptionHtml ? (
                  <div
                    className="prose prose-sm max-w-none text-foreground-light"
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                ) : (
                  <p>{product.description}</p>
                )}
              </div>
            )}

            {/* Variant selector — rendered client side so selection drives the button */}
            {hasOptions && (
              <VariantSelector
                options={product.options ?? []}
                variants={product.variants.edges.map((e) => e.node)}
              />
            )}

            {/* Add to cart + Buy Now — uses first (or only) variant when no selector needed */}
            {!hasOptions && firstVariant && (
              <div className="flex flex-col gap-3">
                <AddToCartButton
                  variantId={firstVariant.id}
                  available={firstVariant.availableForSale}
                />
                <BuyNowButton
                  variantId={firstVariant.id}
                  available={firstVariant.availableForSale}
                />
              </div>
            )}

            <div className="pt-2 border-t border-border space-y-2 text-sm text-foreground-light">
              <p>{tp('trustShipping')}</p>
              <p>{tp('trustQuality')}</p>
              <p>{tp('trustCheckout')}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
