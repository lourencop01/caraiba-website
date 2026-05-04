'use client';

import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { formatMoney } from '@/lib/shopify-api';
import { PiX, PiMinus, PiPlus, PiTrash, PiShoppingCartSimple } from 'react-icons/pi';

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, updateQuantity, removeFromCart } = useCart();
  const lines = cart?.lines.edges.map((e) => e.node) ?? [];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface z-[70] shadow-theme-lg flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <PiShoppingCartSimple className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Your Cart
              {cart && cart.totalQuantity > 0 && (
                <span className="ml-2 text-sm text-foreground-light font-normal">
                  ({cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 text-foreground-light hover:text-primary transition-colors rounded-full hover:bg-background cursor-pointer"
          >
            <PiX className="w-5 h-5" />
          </button>
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <PiShoppingCartSimple className="w-16 h-16 text-border" />
              <p className="text-foreground-light">Your cart is empty.</p>
            </div>
          ) : (
            lines.map((line) => (
              <div
                key={line.id}
                className="flex gap-4 p-3 bg-background rounded-xl border border-border"
              >
                {/* Thumbnail */}
                {line.merchandise.product.featuredImage && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface">
                    <Image
                      src={line.merchandise.product.featuredImage.url}
                      alt={line.merchandise.product.featuredImage.altText ?? line.merchandise.product.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-medium text-sm truncate">
                    {line.merchandise.product.title}
                  </p>
                  {line.merchandise.title !== 'Default Title' && (
                    <p className="text-foreground-light text-xs mt-0.5">
                      {line.merchandise.title}
                    </p>
                  )}
                  <p className="text-primary text-sm font-semibold mt-1">
                    {formatMoney(line.cost.totalAmount)}
                  </p>
                </div>

                {/* Quantity controls + remove */}
                <div className="flex flex-col items-end justify-between gap-2">
                  <button
                    onClick={() => removeFromCart(line.id)}
                    disabled={isLoading}
                    aria-label="Remove item"
                    className="text-foreground-light hover:text-red-500 transition-colors p-1 cursor-pointer disabled:opacity-50"
                  >
                    <PiTrash className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(line.id, Math.max(0, line.quantity - 1))}
                      disabled={isLoading}
                      aria-label="Decrease quantity"
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-border hover:bg-primary hover:text-white transition-colors text-foreground-light cursor-pointer disabled:opacity-50"
                    >
                      <PiMinus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-sm text-foreground font-medium">
                      {line.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(line.id, line.quantity + 1)}
                      disabled={isLoading}
                      aria-label="Increase quantity"
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-border hover:bg-primary hover:text-white transition-colors text-foreground-light cursor-pointer disabled:opacity-50"
                    >
                      <PiPlus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && cart && (
          <div className="border-t border-border px-6 py-5 space-y-4 bg-surface">
            <div className="flex justify-between text-sm text-foreground-light">
              <span>Subtotal</span>
              <span className="text-foreground font-medium">
                {formatMoney(cart.cost.subtotalAmount)}
              </span>
            </div>
            {cart.cost.totalTaxAmount && (
              <div className="flex justify-between text-sm text-foreground-light">
                <span>Taxes</span>
                <span>{formatMoney(cart.cost.totalTaxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-foreground">
              <span>Total</span>
              <span className="text-primary">{formatMoney(cart.cost.totalAmount)}</span>
            </div>
            <a
              href={cart.checkoutUrl}
              className="block w-full text-center py-3 rounded-full font-medium bg-gradient-to-r from-primary to-primary-dark text-white hover:opacity-90 transition-opacity"
            >
              Checkout
            </a>
            <p className="text-center text-xs text-foreground-light">
              Shipping &amp; taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
