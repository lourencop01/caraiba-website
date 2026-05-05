'use client';
import { useState, useTransition, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { PiSlidersHorizontal } from 'react-icons/pi';
import {
  ShopifyProduct,
  ShopifyFilter,
  ShopifyCollection,
  ShopifyPageInfo,
  ProductTypeOption,
  SortOption,
  getFilteredProducts,
  buildProductQueryString,
} from '@/lib/shopify-api';
import ProductCard from '@/components/shop/ProductCard';
import SortDropdown from '@/components/shop/SortDropdown';
import FiltersSidebar from '@/components/shop/FiltersSidebar';
import FilterDrawer from '@/components/shop/FilterDrawer';
import ActiveFilters from '@/components/shop/ActiveFilters';

interface ShopClientProps {
  initialProducts: ShopifyProduct[];
  initialPageInfo: ShopifyPageInfo;
  availableFilters: ShopifyFilter[];
  availableCollections: ShopifyCollection[];
  availableProductTypes: ProductTypeOption[];
  locale: string;
  initialOnSale?: boolean;
}

export default function ShopClient({
  initialProducts,
  initialPageInfo,
  availableFilters,
  availableCollections,
  availableProductTypes,
  locale,
  initialOnSale = false,
}: ShopClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('pages.shop.list');

  // Client-side "load more" state
  const [extraProducts, setExtraProducts] = useState<ShopifyProduct[]>([]);
  const [currentPageInfo, setCurrentPageInfo] = useState<ShopifyPageInfo>(initialPageInfo);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ── Read active state from URL ──────────────────────────────────────────────
  const sort = (searchParams.get('sort') as SortOption) ?? 'featured';
  const activeFiltersJson = searchParams.getAll('filter');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const inStock = searchParams.get('inStock') === 'true';
  // Fall back to the server-resolved value so the checkbox/chip are correct
  // on initial mount even if useSearchParams hasn't settled yet.
  const onSale = searchParams.get('onSale') === 'true' || initialOnSale;
  const activeCollection = searchParams.get('collection');
  const activeFilterCount =
    activeFiltersJson.length +
    (minPrice || maxPrice ? 1 : 0) +
    (inStock ? 1 : 0) +
    (onSale ? 1 : 0) +
    (activeCollection ? 1 : 0);

  const allProducts = [...initialProducts, ...extraProducts];

  // ── URL update helper ───────────────────────────────────────────────────────
  const updateURL = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      updater(params);
      startTransition(() => {
        router.push(`?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleSortChange = (value: SortOption) =>
    updateURL((p) => {
      if (value === 'featured') p.delete('sort');
      else p.set('sort', value);
    });

  const handleFilterToggle = (filterInput: string) =>
    updateURL((p) => {
      const current = p.getAll('filter');
      p.delete('filter');
      if (current.includes(filterInput)) {
        current.filter((f) => f !== filterInput).forEach((f) => p.append('filter', f));
      } else {
        [...current, filterInput].forEach((f) => p.append('filter', f));
      }
    });

  const handlePriceChange = (min: string, max: string) =>
    updateURL((p) => {
      if (min) p.set('minPrice', min); else p.delete('minPrice');
      if (max) p.set('maxPrice', max); else p.delete('maxPrice');
    });

  const handleClearPrice = () => handlePriceChange('', '');

  const handleInStockToggle = () =>
    updateURL((p) => {
      if (inStock) p.delete('inStock');
      else p.set('inStock', 'true');
    });

  const handleOnSaleToggle = () =>
    updateURL((p) => {
      if (onSale) p.delete('onSale');
      else p.set('onSale', 'true');
    });

  const handleCollectionSelect = (handle: string) =>
    updateURL((p) => {
      if (p.get('collection') === handle) p.delete('collection');
      else p.set('collection', handle);
    });

  const handleClearAll = () =>
    updateURL((p) => {
      const sortVal = p.get('sort');
      Array.from(p.keys()).forEach((k) => p.delete(k));
      if (sortVal && sortVal !== 'featured') p.set('sort', sortVal);
    });

  // ── Load more ───────────────────────────────────────────────────────────────
  const handleLoadMore = async () => {
    if (!currentPageInfo.hasNextPage || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const result = await getFilteredProducts({
        first: 24,
        after: currentPageInfo.endCursor,
        sort,
        queryString: buildProductQueryString({ filterJsons: activeFiltersJson, minPrice, maxPrice, inStock }),
        filterJsons: activeFiltersJson,
        collectionHandle: activeCollection,
        inStock,
        onSale,
        minPrice,
        maxPrice,
        locale,
      });
      setExtraProducts((prev) => [...prev, ...result.products]);
      setCurrentPageInfo(result.pageInfo);
    } catch (err) {
      console.error('Load more failed:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // ── Filter sidebar shared props ─────────────────────────────────────────────
  const sidebarProps = {
    filters: availableFilters,
    collections: availableCollections,
    productTypes: availableProductTypes,
    activeFiltersJson,
    activeCollection,
    minPrice,
    maxPrice,
    inStock,
    onSale,
    onFilterToggle: handleFilterToggle,
    onPriceChange: handlePriceChange,
    onInStockToggle: handleInStockToggle,
    onOnSaleToggle: handleOnSaleToggle,
    onCollectionSelect: handleCollectionSelect,
    isPending,
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ── Toolbar ── */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm font-medium hover:border-primary hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <PiSlidersHorizontal className="w-4 h-4" aria-hidden />
              {t('filters.showFilters')}
              {activeFilterCount > 0 && (
                <span className="bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <span className="text-sm text-foreground-light hidden sm:block">
              {t('productsCount', { count: allProducts.length })}
            </span>
          </div>

          <SortDropdown value={sort} onChange={handleSortChange} />
        </div>

        {/* Active filter chips */}
        <ActiveFilters
          filters={availableFilters}
          collections={availableCollections}
          activeFiltersJson={activeFiltersJson}
          activeCollection={activeCollection}
          minPrice={minPrice}
          maxPrice={maxPrice}
          inStock={inStock}
          onSale={onSale}
          onRemoveFilter={handleFilterToggle}
          onClearPrice={handleClearPrice}
          onToggleInStock={handleInStockToggle}
          onToggleOnSale={handleOnSaleToggle}
          onCollectionClear={() => handleCollectionSelect(activeCollection!)}
          onClearAll={handleClearAll}
        />
      </div>

      {/* ── Body: sidebar + grid ── */}
      <div className="flex gap-8 lg:gap-10">

        {/* Desktop filter sidebar */}
        <aside className="hidden lg:block w-52 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-foreground text-sm uppercase tracking-wide">
                {t('filters.title')}
              </h2>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-primary hover:text-primary-dark underline"
                >
                  {t('filters.clearAll')}
                </button>
              )}
            </div>
            <FiltersSidebar {...sidebarProps} />
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {allProducts.length === 0 ? (
            <EmptyState onClear={handleClearAll} hasFilters={activeFilterCount > 0} t={t} locale={locale} />
          ) : (
            <>
              <div
                className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 transition-opacity duration-300 ${
                  isPending ? 'opacity-50 pointer-events-none' : 'opacity-100'
                }`}
              >
                {allProducts.map((product) => (
                  <ProductCard key={product.id} product={product} locale={locale} />
                ))}
              </div>

              {/* Load more */}
              {currentPageInfo.hasNextPage && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="px-10 py-4 border-2 border-border rounded-full font-semibold text-foreground hover:border-primary hover:text-primary-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    {isLoadingMore ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        {t('loading')}
                      </span>
                    ) : (
                      t('loadMore')
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        {...sidebarProps}
      />
    </div>
  );
}

// ── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({
  onClear,
  hasFilters,
  t,
  locale,
}: {
  onClear: () => void;
  hasFilters: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
  locale: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-6">
        <PiSlidersHorizontal className="w-8 h-8 text-foreground-light" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-2">{t('empty.title')}</h3>
      <p className="text-foreground-light mb-6 max-w-xs">{t('empty.subtitle')}</p>
      {hasFilters ? (
        <button
          onClick={onClear}
          className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          {t('empty.clearFilters')}
        </button>
      ) : (
        <Link
          href={`/${locale}/shop`}
          className="px-6 py-3 border-2 border-border rounded-full font-semibold text-foreground hover:border-primary hover:text-primary-dark transition-colors"
        >
          {t('empty.browseAll')}
        </Link>
      )}
    </div>
  );
}
