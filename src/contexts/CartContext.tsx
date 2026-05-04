'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import {
  ShopifyCart,
  cartCreate,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
  getCart,
} from '@/lib/shopify-api';

const CART_ID_KEY = 'shopify_cart_id';

interface CartContextType {
  cart: ShopifyCart | null;
  isLoading: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Restore cart from localStorage on mount
  useEffect(() => {
    const storedCartId = localStorage.getItem(CART_ID_KEY);
    if (!storedCartId) return;

    getCart(storedCartId)
      .then((existingCart) => {
        if (existingCart) {
          setCart(existingCart);
        } else {
          // Cart expired on Shopify side — clear it
          localStorage.removeItem(CART_ID_KEY);
        }
      })
      .catch(() => {
        localStorage.removeItem(CART_ID_KEY);
      });
  }, []);

  const ensureCart = useCallback(async (): Promise<string> => {
    if (cart?.id) return cart.id;

    const storedId = localStorage.getItem(CART_ID_KEY);
    if (storedId) return storedId;

    const newCart = await cartCreate();
    localStorage.setItem(CART_ID_KEY, newCart.id);
    setCart(newCart);
    return newCart.id;
  }, [cart]);

  const addToCart = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      setIsLoading(true);
      try {
        const cartId = await ensureCart();
        const updated = await cartLinesAdd(cartId, [{ merchandiseId, quantity }]);
        setCart(updated);
        setIsOpen(true);
      } finally {
        setIsLoading(false);
      }
    },
    [ensureCart]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setIsLoading(true);
      try {
        const updated = await cartLinesUpdate(cart.id, [{ id: lineId, quantity }]);
        setCart(updated);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const removeFromCart = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setIsLoading(true);
      try {
        const updated = await cartLinesRemove(cart.id, [lineId]);
        setCart(updated);
      } finally {
        setIsLoading(false);
      }
    },
    [cart]
  );

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartContext.Provider
      value={{ cart, isLoading, isOpen, openCart, closeCart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
