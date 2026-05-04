'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { CookieConsent } from '@/types/cookies';

export default function CookieConsentModal() {
  const t = useTranslations('cookies');
  const { state, updateConsent, hideModal } = useCookieConsent();
  const [localConsent, setLocalConsent] = useState<CookieConsent>(state.consent);

  // Update local state when global state changes
  useEffect(() => {
    setLocalConsent(state.consent);
  }, [state.consent]);

  const handleToggle = (category: keyof CookieConsent) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    
    setLocalConsent(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSave = () => {
    updateConsent(localConsent);
    hideModal();
  };

  const handleClose = useCallback(() => {
    setLocalConsent(state.consent); // Reset to current state
    hideModal();
  }, [state.consent, hideModal]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (state.showModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [state.showModal, handleClose]);

  // Don't render if modal shouldn't be shown
  if (!state.showModal) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="cookie-modal-title"
      aria-describedby="cookie-modal-description"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="flex flex-col relative w-full max-w-2xl max-h-[80vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 
            id="cookie-modal-title"
            className="text-xl font-semibold text-gray-900 dark:text-gray-100"
          >
            {t('modal.title')}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={t('modal.closeModal')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <p 
            id="cookie-modal-description"
            className="text-gray-600 dark:text-gray-300 mb-6"
          >
            {t('modal.description')}
          </p>

          {/* Cookie Categories */}
          <div className="space-y-6">
            {/* Essential Cookies */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {t('categories.essential.title')}
                </h3>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                    Always On
                  </span>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {t('categories.essential.description')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <strong>Examples:</strong> {t('categories.essential.examples')}
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {t('categories.analytics.title')}
                </h3>
                <button
                  onClick={() => handleToggle('analytics')}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                    localConsent.analytics 
                      ? 'bg-primary' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Toggle ${t('categories.analytics.title')}`}
                  aria-pressed={localConsent.analytics}
                >
                  <div 
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                      localConsent.analytics ? 'translate-x-7' : 'translate-x-1'
                    }`} 
                  />
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {t('categories.analytics.description')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <strong>Examples:</strong> {t('categories.analytics.examples')}
              </p>
            </div>

            {/* Marketing Cookies */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {t('categories.marketing.title')}
                </h3>
                <button
                  onClick={() => handleToggle('marketing')}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                    localConsent.marketing 
                      ? 'bg-primary' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Toggle ${t('categories.marketing.title')}`}
                  aria-pressed={localConsent.marketing}
                >
                  <div 
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                      localConsent.marketing ? 'translate-x-7' : 'translate-x-1'
                    }`} 
                  />
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {t('categories.marketing.description')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <strong>Examples:</strong> {t('categories.marketing.examples')}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {t('modal.closeModal')}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-primary-dark rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-md"
          >
            {t('modal.saveAndClose')}
          </button>
        </div>
      </div>
    </div>
  );
} 