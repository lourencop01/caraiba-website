'use client';

import { useState, useMemo } from 'react';
import { ShopifyProductOption, ShopifyProductVariant } from '@/lib/shopify-api';
import AddToCartButton from './AddToCartButton';
import BuyNowButton from './BuyNowButton';

interface VariantSelectorProps {
  options: ShopifyProductOption[];
  variants: ShopifyProductVariant[];
}

export default function VariantSelector({ options, variants }: VariantSelectorProps) {
  // Initialize selection to first value of each option
  const [selected, setSelected] = useState<Record<string, string>>(
    Object.fromEntries(options.map((o) => [o.name, o.values[0]]))
  );

  // Find the variant that matches all currently selected options
  const matchedVariant = useMemo(() => {
    return variants.find((v) =>
      v.selectedOptions.every((opt) => selected[opt.name] === opt.value)
    ) ?? null;
  }, [selected, variants]);

  const handleSelect = (optionName: string, value: string) => {
    setSelected((prev) => ({ ...prev, [optionName]: value }));
  };

  return (
    <div className="flex flex-col gap-5">
      {options.map((option) => (
        <div key={option.id}>
          <p className="text-sm font-medium text-foreground mb-2">
            {option.name}:{' '}
            <span className="font-normal text-foreground-light">{selected[option.name]}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selected[option.name] === value;
              // Check if this combination is available in at least one variant
              const isAvailable = variants.some(
                (v) =>
                  v.availableForSale &&
                  v.selectedOptions.some((o) => o.name === option.name && o.value === value)
              );
              return (
                <button
                  key={value}
                  onClick={() => handleSelect(option.name, value)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer
                    ${isSelected
                      ? 'border-primary bg-primary text-white'
                      : isAvailable
                        ? 'border-border text-foreground hover:border-primary hover:text-primary-dark'
                        : 'border-border text-foreground-light opacity-40 cursor-not-allowed line-through'
                    }`}
                  disabled={!isAvailable}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {matchedVariant && (
        <div className="flex flex-col gap-3">
          <AddToCartButton
            variantId={matchedVariant.id}
            available={matchedVariant.availableForSale}
          />
          <BuyNowButton
            variantId={matchedVariant.id}
            available={matchedVariant.availableForSale}
          />
        </div>
      )}
    </div>
  );
}
