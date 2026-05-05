'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { CookieConsent } from '@/types/cookies';

export default function CookieConsentModal() {
  const t = useTranslations('cookies');
  const { state, updateConsent, hideModal } = useCookieConsent();
  const [localConsent, setLocalConsent] = useState<CookieConsent>(state.consent);

  useEffect(() => {
    setLocalConsent(state.consent);
  }, [state.consent]);

  const handleToggle = (category: keyof CookieConsent) => {
    if (category === 'essential') return;

    setLocalConsent((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    updateConsent(localConsent);
    hideModal();
  };

  const handleClose = useCallback(() => {
    setLocalConsent(state.consent);
    hideModal();
  }, [state.consent, hideModal]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (state.showModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [state.showModal, handleClose]);

  if (!state.showModal) {
    return null;
  }

  const toggleClass = (on: boolean) =>
    `w-12 h-6 rounded-full relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
      on ? 'bg-primary' : 'bg-border'
    }`;

  const knobClass = (on: boolean) =>
    `absolute top-1 h-4 w-4 rounded-full bg-background shadow-sm transition-transform duration-200 ${
      on ? 'translate-x-7' : 'translate-x-1'
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="cookie-modal-title"
      aria-describedby="cookie-modal-description"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="relative flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-theme-lg">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 id="cookie-modal-title" className="text-xl font-semibold text-foreground">
            {t('modal.title')}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-foreground-muted transition-colors hover:bg-surface hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label={t('modal.closeModal')}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-[calc(90vh-8rem)] overflow-y-auto p-6">
          <p id="cookie-modal-description" className="mb-6 text-foreground-light">
            {t('modal.description')}
          </p>

          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-surface/80 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">{t('categories.essential.title')}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground-muted">{t('categories.essential.alwaysOn')}</span>
                  <div className="relative h-6 w-12 rounded-full bg-primary">
                    <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-background shadow-sm" />
                  </div>
                </div>
              </div>
              <p className="mb-2 text-sm text-foreground-light">{t('categories.essential.description')}</p>
              <p className="text-xs text-foreground-muted">
                <strong className="font-medium text-foreground">Examples:</strong> {t('categories.essential.examples')}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface/80 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">{t('categories.analytics.title')}</h3>
                <button
                  type="button"
                  onClick={() => handleToggle('analytics')}
                  className={toggleClass(localConsent.analytics)}
                  aria-label={`Toggle ${t('categories.analytics.title')}`}
                  aria-pressed={localConsent.analytics}
                >
                  <div className={knobClass(localConsent.analytics)} />
                </button>
              </div>
              <p className="mb-2 text-sm text-foreground-light">{t('categories.analytics.description')}</p>
              <p className="text-xs text-foreground-muted">
                <strong className="font-medium text-foreground">Examples:</strong> {t('categories.analytics.examples')}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface/80 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">{t('categories.marketing.title')}</h3>
                <button
                  type="button"
                  onClick={() => handleToggle('marketing')}
                  className={toggleClass(localConsent.marketing)}
                  aria-label={`Toggle ${t('categories.marketing.title')}`}
                  aria-pressed={localConsent.marketing}
                >
                  <div className={knobClass(localConsent.marketing)} />
                </button>
              </div>
              <p className="mb-2 text-sm text-foreground-light">{t('categories.marketing.description')}</p>
              <p className="text-xs text-foreground-muted">
                <strong className="font-medium text-foreground">Examples:</strong> {t('categories.marketing.examples')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border p-6 sm:flex-row">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            {t('modal.closeModal')}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 rounded-full bg-gradient-to-r from-primary to-primary-dark px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:opacity-95 hover:shadow-theme-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            {t('modal.saveAndClose')}
          </button>
        </div>
      </div>
    </div>
  );
}
