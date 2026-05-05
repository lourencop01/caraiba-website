'use client';

import { useCart } from '@/contexts/CartContext';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { useTranslations } from 'next-intl';

export default function FloatingCartButton() {
  const { cart, openCart } = useCart();
  const t = useTranslations('accessibility');
  const count = cart?.totalQuantity ?? 0;

  return (
    <button
      onClick={openCart}
      aria-label={t('openCart')}
      className="lg:hidden fixed bottom-6 right-5 z-50 w-14 h-14 rounded-full bg-foreground text-background shadow-theme-lg flex items-center justify-center transition-transform duration-200 active:scale-95 hover:bg-primary-dark"
    >
      <PiShoppingCartSimple className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full px-1 leading-none border-2 border-background">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}
