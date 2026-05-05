'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { PiArrowRight } from 'react-icons/pi';
import { useTranslations } from 'next-intl';

// ── bfcache reset ──────────────────────────────────────────────────────────────
// The pageshow listener must live at module scope so it is never removed by
// React's useEffect cleanup (which runs when window.location.href navigates away).
// pageShowResetter  → direct path: component is still mounted when pageshow fires
// pendingReset      → fallback: pageshow fired before the component re-mounted
let pageShowResetter: (() => void) | null = null;
let pendingReset = false;

if (typeof window !== 'undefined') {
  window.addEventListener('pageshow', (e: PageTransitionEvent) => {
    if (e.persisted) {
      if (pageShowResetter) {
        pageShowResetter();
      } else {
        pendingReset = true;
      }
    }
  });
}
// ──────────────────────────────────────────────────────────────────────────────

interface BuyNowButtonProps {
  variantId: string;
  available: boolean;
}

export default function BuyNowButton({
  variantId,
  available,
}: BuyNowButtonProps) {
  const { buyNow, isLoading } = useCart();
  const t = useTranslations('shop');
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Consume the pending flag set by pageshow before this effect ran
    if (pendingReset) {
      pendingReset = false;
      setIsRedirecting(false);
    }

    pageShowResetter = () => setIsRedirecting(false);
    return () => {
      pageShowResetter = null;
    };
  }, []);

  if (!available) return null;

  const handleBuyNow = async () => {
    setIsRedirecting(true);
    try {
      const checkoutUrl = await buyNow(variantId);
      window.location.href = checkoutUrl;
    } catch {
      setIsRedirecting(false);
    }
  };

  const busy = isLoading || isRedirecting;

  return (
    <button
      onClick={handleBuyNow}
      disabled={busy}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium bg-foreground text-background hover:opacity-80 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {busy ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          {t('processing')}
        </>
      ) : (
        <>
          {t('buyNow')}
          <PiArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}
