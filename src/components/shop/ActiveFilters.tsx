'use client';
import { useTranslations } from 'next-intl';
import { PiX } from 'react-icons/pi';
import { ShopifyFilter, ShopifyCollection } from '@/lib/shopify-api';

interface ActiveFiltersProps {
  filters: ShopifyFilter[];
  collections: ShopifyCollection[];
  activeFiltersJson: string[];
  activeCollection: string | null;
  minPrice: string | null;
  maxPrice: string | null;
  inStock: boolean;
  onSale: boolean;
  onRemoveFilter: (input: string) => void;
  onClearPrice: () => void;
  onToggleInStock: () => void;
  onToggleOnSale: () => void;
  onCollectionClear: () => void;
  onClearAll: () => void;
}

export default function ActiveFilters({
  filters,
  collections,
  activeFiltersJson,
  activeCollection,
  minPrice,
  maxPrice,
  inStock,
  onSale,
  onRemoveFilter,
  onClearPrice,
  onToggleInStock,
  onToggleOnSale,
  onCollectionClear,
  onClearAll,
}: ActiveFiltersProps) {
  const t = useTranslations('pages.shop.list.filters');

  const hasActive =
    activeFiltersJson.length > 0 || minPrice || maxPrice || inStock || onSale || activeCollection;
  if (!hasActive) return null;

  const collectionLabel = activeCollection
    ? (collections.find((c) => c.handle === activeCollection)?.title ?? activeCollection)
    : null;

  const getLabel = (input: string): string => {
    for (const filter of filters) {
      const val = filter.values.find((v) => v.input === input);
      if (val) return `${filter.label}: ${val.label}`;
    }
    try {
      const parsed = JSON.parse(input) as Record<string, unknown>;
      if (typeof parsed.productType === 'string') return parsed.productType;
      if (typeof parsed.productVendor === 'string') return parsed.productVendor;
      if (typeof parsed.tag === 'string') return parsed.tag;
    } catch { /* ignore */ }
    return input;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-foreground-light uppercase tracking-wide">
        {t('activeFilters')}
      </span>

      {collectionLabel && (
        <Chip label={collectionLabel} onRemove={onCollectionClear} />
      )}

      {inStock && (
        <Chip label={t('inStockOnly')} onRemove={onToggleInStock} />
      )}

      {onSale && (
        <Chip label={t('onSaleOnly')} onRemove={onToggleOnSale} />
      )}

      {(minPrice || maxPrice) && (
        <Chip
          label={
            minPrice && maxPrice
              ? t('priceChipRange', { min: minPrice, max: maxPrice })
              : minPrice
              ? t('priceChipFrom', { min: minPrice })
              : t('priceChipUpTo', { max: maxPrice })
          }
          onRemove={onClearPrice}
        />
      )}

      {activeFiltersJson.map((input) => (
        <Chip key={input} label={getLabel(input)} onRemove={() => onRemoveFilter(input)} />
      ))}

      <button
        onClick={onClearAll}
        className="text-xs text-foreground-light underline hover:text-foreground transition-colors ml-1"
      >
        {t('clearAll')}
      </button>
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors font-medium"
    >
      {label}
      <PiX className="w-3 h-3 flex-shrink-0" />
    </button>
  );
}
