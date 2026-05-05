'use client';

import { useCart } from '@/contexts/CartContext';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { useTranslations } from 'next-intl';

interface AddToCartButtonProps {
  variantId: string;
  available: boolean;
  /** Renders a smaller icon-only button for product card quick-add */
  compact?: boolean;
}

export default function AddToCartButton({
  variantId,
  available,
  compact = false,
}: AddToCartButtonProps) {
  const { addToCart, isLoading } = useCart();
  const t = useTranslations('shop');

  const label = t('addToCart');
  const soldOutLabel = t('soldOut');

  if (compact) {
    return (
      <button
        onClick={(e) => { e.preventDefault(); if (available) addToCart(variantId); }}
        disabled={!available || isLoading}
        aria-label={available ? label : soldOutLabel}
        className="w-full py-2.5 rounded-full text-sm font-medium bg-foreground text-background hover:bg-primary-dark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <PiShoppingCartSimpleBold className="w-4 h-4" />
        {available ? label : soldOutLabel}
      </button>
    );
  }

  if (!available) {
    return (
      <button
        disabled
        className="w-full py-3 rounded-full font-medium bg-border text-foreground-light cursor-not-allowed"
      >
        {soldOutLabel}
      </button>
    );
  }

  return (
    <button
      onClick={() => addToCart(variantId)}
      disabled={isLoading}
      className="w-full py-3 rounded-full font-medium bg-gradient-to-r from-primary to-primary-dark text-white hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          {t('addingToCart')}
        </span>
      ) : (
        label
      )}
    </button>
  );
}
