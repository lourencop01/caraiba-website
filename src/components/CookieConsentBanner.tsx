'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

export default function CookieConsentBanner() {
  const t = useTranslations('cookies.banner');
  const { state, acceptAll, rejectAll, showModal } = useCookieConsent();

  if (!state.showBanner) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 p-4 shadow-theme-lg backdrop-blur-md sm:p-5"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
          <div className="flex-1">
            <h2 id="cookie-banner-title" className="mb-2 text-lg font-semibold text-foreground">
              {t('title')}
            </h2>
            <p id="cookie-banner-description" className="text-sm leading-relaxed text-foreground-light">
              {t('description')}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <button
              type="button"
              onClick={rejectAll}
              className="rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-surface-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label={t('rejectAll')}
            >
              {t('rejectAll')}
            </button>

            <button
              type="button"
              onClick={showModal}
              className="rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/50 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label={t('managePreferences')}
            >
              {t('managePreferences')}
            </button>

            <button
              type="button"
              onClick={acceptAll}
              className="transform rounded-full bg-gradient-to-r from-primary to-primary-dark px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:opacity-95 hover:shadow-theme-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label={t('acceptAll')}
            >
              {t('acceptAll')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
