'use client';
import { useTranslations } from 'next-intl';
import { PiArrowsDownUp } from 'react-icons/pi';
import { SortOption } from '@/lib/shopify-api';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const t = useTranslations('pages.shop.list.sort');

  const options: { value: SortOption; label: string }[] = [
    { value: 'featured',      label: t('featured') },
    { value: 'best-selling',  label: t('bestSelling') },
    { value: 'price-asc',     label: t('priceAsc') },
    { value: 'price-desc',    label: t('priceDesc') },
    { value: 'newest',        label: t('newest') },
  ];

  return (
    <div className="flex items-center gap-2">
      <PiArrowsDownUp className="w-4 h-4 text-foreground-light flex-shrink-0" />
      <label className="text-sm text-foreground-light whitespace-nowrap sr-only sm:not-sr-only">
        {t('label')}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
