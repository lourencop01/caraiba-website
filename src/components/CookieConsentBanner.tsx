'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

export default function CookieConsentBanner() {
  const t = useTranslations('cookies.banner');
  const { state, acceptAll, rejectAll, showModal } = useCookieConsent();

  // Don't render if banner shouldn't be shown
  if (!state.showBanner) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg dark:bg-gray-900/95 dark:border-gray-700"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          {/* Content */}
          <div className="flex-1">
            <h2 
              id="cookie-banner-title" 
              className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2"
            >
              {t('title')}
            </h2>
            <p 
              id="cookie-banner-description"
              className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              {t('description')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={rejectAll}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              aria-label={t('rejectAll')}
            >
              {t('rejectAll')}
            </button>
            
            <button
              onClick={showModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
              aria-label={t('managePreferences')}
            >
              {t('managePreferences')}
            </button>
            
            <button
              onClick={acceptAll}
              className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-primary-dark rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-md hover:shadow-lg"
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