'use client';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { PiX } from 'react-icons/pi';
import FiltersSidebar from './FiltersSidebar';
import { ShopifyFilter, ShopifyCollection, ProductTypeOption } from '@/lib/shopify-api';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ShopifyFilter[];
  collections: ShopifyCollection[];
  productTypes: ProductTypeOption[];
  activeFiltersJson: string[];
  activeCollection: string | null;
  minPrice: string | null;
  maxPrice: string | null;
  inStock: boolean;
  onSale: boolean;
  onFilterToggle: (input: string) => void;
  onPriceChange: (min: string, max: string) => void;
  onInStockToggle: () => void;
  onOnSaleToggle: () => void;
  onCollectionSelect: (handle: string) => void;
  isPending: boolean;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  ...filterProps
}: FilterDrawerProps) {
  const t = useTranslations('pages.shop.list.filters');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('title')}
        className="fixed inset-y-0 left-0 w-80 max-w-full bg-background z-50 flex flex-col lg:hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-bold text-foreground">{t('title')}</h2>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="p-2 hover:bg-surface rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <PiX className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Scrollable filters */}
        <div className="flex-1 overflow-y-auto px-5 py-2">
          <FiltersSidebar {...filterProps} />
        </div>

        {/* Footer CTA */}
        <div className="px-5 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
          >
            {t('viewResults')}
          </button>
        </div>
      </div>
    </>
  );
}
