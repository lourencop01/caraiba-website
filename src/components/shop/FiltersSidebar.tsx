'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { PiCaretDown, PiCaretUp } from 'react-icons/pi';
import { ShopifyFilter, ShopifyCollection, ProductTypeOption } from '@/lib/shopify-api';

interface FiltersSidebarProps {
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

export default function FiltersSidebar({
  filters,
  collections,
  productTypes,
  activeFiltersJson,
  activeCollection,
  minPrice,
  maxPrice,
  inStock,
  onSale,
  onFilterToggle,
  onPriceChange,
  onInStockToggle,
  onOnSaleToggle,
  onCollectionSelect,
  isPending,
}: FiltersSidebarProps) {
  const t = useTranslations('pages.shop.list.filters');
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(['__collections', '__category', '__availability', '__price'])
  );
  const [localMin, setLocalMin] = useState(minPrice ?? '');
  const [localMax, setLocalMax] = useState(maxPrice ?? '');

  // Sync price inputs when URL changes (e.g. chip removal)
  useEffect(() => {
    setLocalMin(minPrice ?? '');
    setLocalMax(maxPrice ?? '');
  }, [minPrice, maxPrice]);

  const toggle = (id: string) =>
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const isActive = (input: string) => activeFiltersJson.includes(input);

  return (
    <div
      className={`w-full transition-opacity duration-200 ${
        isPending ? 'opacity-40 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* ── Collections ── */}
      {collections.length > 0 && (
        <AccordionSection
          id="__collections"
          label={t('collections')}
          open={openSections.has('__collections')}
          onToggle={() => toggle('__collections')}
        >
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {collections.map((col) => (
              <CheckboxRow
                key={col.handle}
                checked={activeCollection === col.handle}
                label={col.title}
                onChange={() => onCollectionSelect(col.handle)}
              />
            ))}
          </div>
        </AccordionSection>
      )}

      {/* ── Category (Product Type) ── */}
      {productTypes.length > 0 && (
        <AccordionSection
          id="__category"
          label={t('category')}
          open={openSections.has('__category')}
          onToggle={() => toggle('__category')}
        >
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {productTypes.map((type) => {
              const filterJson = JSON.stringify({ productType: type.canonical });
              return (
                <CheckboxRow
                  key={type.canonical}
                  checked={isActive(filterJson)}
                  label={type.label}
                  onChange={() => onFilterToggle(filterJson)}
                />
              );
            })}
          </div>
        </AccordionSection>
      )}

      {/* ── Availability ── */}
      <AccordionSection
        id="__availability"
        label={t('availability')}
        open={openSections.has('__availability')}
        onToggle={() => toggle('__availability')}
      >
        <div className="space-y-2">
          <CheckboxRow
            checked={inStock}
            label={t('inStockOnly')}
            onChange={onInStockToggle}
          />
          <CheckboxRow
            checked={onSale}
            label={t('onSaleOnly')}
            onChange={onOnSaleToggle}
          />
        </div>
      </AccordionSection>

      {/* ── Price ── */}
      <AccordionSection
        id="__price"
        label={t('priceRange')}
        open={openSections.has('__price')}
        onToggle={() => toggle('__price')}
      >
        <div className="space-y-3">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="text-xs text-foreground-light block mb-1">{t('min')}</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={localMin}
                onChange={(e) => setLocalMin(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <span className="text-foreground-light pb-2">–</span>
            <div className="flex-1">
              <label className="text-xs text-foreground-light block mb-1">{t('max')}</label>
              <input
                type="number"
                min="0"
                placeholder="∞"
                value={localMax}
                onChange={(e) => setLocalMax(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <button
            onClick={() => onPriceChange(localMin, localMax)}
            className="w-full py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            {t('applyPrice')}
          </button>
        </div>
      </AccordionSection>

      {/* ── Dynamic Shopify facets ── */}
      {filters.map((filter) => {
        if (filter.type === 'PRICE_RANGE') return null; // rendered above
        if (filter.type === 'BOOLEAN') return null;     // rendered above
        if (filter.values.length === 0) return null;

        return (
          <AccordionSection
            key={filter.id}
            id={filter.id}
            label={filter.label}
            open={openSections.has(filter.id)}
            onToggle={() => toggle(filter.id)}
          >
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {filter.values.map((v) => (
                <CheckboxRow
                  key={v.id}
                  checked={isActive(v.input)}
                  label={v.label}
                  count={v.count}
                  onChange={() => onFilterToggle(v.input)}
                />
              ))}
            </div>
          </AccordionSection>
        );
      })}
    </div>
  );
}

/* ── Sub-components ── */

function AccordionSection({
  id,
  label,
  open,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border py-4">
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`filter-${id}`}
        className="flex items-center justify-between w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
      >
        <span className="font-semibold text-foreground text-sm">{label}</span>
        {open ? (
          <PiCaretUp className="w-4 h-4 text-foreground-light" aria-hidden />
        ) : (
          <PiCaretDown className="w-4 h-4 text-foreground-light" aria-hidden />
        )}
      </button>
      {open && (
        <div id={`filter-${id}`} className="mt-3">
          {children}
        </div>
      )}
    </div>
  );
}

function CheckboxRow({
  checked,
  label,
  count,
  onChange,
}: {
  checked: boolean;
  label: string;
  count?: number;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer group">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 rounded border-border text-primary accent-primary cursor-pointer focus:ring-primary/20"
        />
        <span className="text-sm text-foreground-light group-hover:text-foreground transition-colors">
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className="text-xs text-foreground-muted tabular-nums">({count})</span>
      )}
    </label>
  );
}
