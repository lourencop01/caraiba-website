'use client';

import { useCart } from '@/contexts/CartContext';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { useTranslations } from 'next-intl';

interface CartIconProps {
  isTransparent?: boolean;
}

export default function CartIcon({ isTransparent = false }: CartIconProps) {
  const { cart, openCart } = useCart();
  const t = useTranslations('accessibility');
  const count = cart?.totalQuantity ?? 0;

  return (
    <button
      onClick={openCart}
      aria-label={t('openCart')}
      className={`relative p-2 transition-colors cursor-pointer ${
        isTransparent ? 'text-white/85 hover:text-white' : 'text-foreground-light hover:text-primary-dark'
      }`}
    >
      <PiShoppingCartSimple className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full px-1 leading-none">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}
