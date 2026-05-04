'use client';

import { useCart } from '@/contexts/CartContext';
import { PiShoppingCartSimple } from 'react-icons/pi';

export default function CartIcon() {
  const { cart, openCart } = useCart();
  const count = cart?.totalQuantity ?? 0;

  return (
    <button
      onClick={openCart}
      aria-label="Open cart"
      className="relative p-2 text-foreground-light hover:text-primary transition-colors cursor-pointer"
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
