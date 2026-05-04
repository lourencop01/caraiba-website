'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { CookieConsent, CookieConsentState, DEFAULT_CONSENT } from '@/types/cookies';
import { loadCookieConsent, saveCookieConsent } from '@/lib/cookies';
import { removeTrackingScripts } from '@/lib/scriptLoader';

interface CookieConsentContextType {
  state: CookieConsentState;
  updateConsent: (consent: Partial<CookieConsent>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  showBanner: () => void;
  hideBanner: () => void;
  showModal: () => void;
  hideModal: () => void;
  resetConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

interface CookieConsentProviderProps {
  children: ReactNode;
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const [state, setState] = useState<CookieConsentState>({
    consent: DEFAULT_CONSENT,
    hasConsented: false,
    showBanner: false,
    showModal: false,
  });

  // Initialize consent state on mount
  useEffect(() => {
    const { consent, hasConsented } = loadCookieConsent();
    
    setState(prev => ({
      ...prev,
      consent,
      hasConsented,
      showBanner: !hasConsented, // Show banner only if user hasn't consented
    }));

    // Load scripts if consent already given
    // NOTE: Script loading now handled by individual components (GoogleAnalytics.tsx)
    // to avoid conflicts with direct GA4 implementation
    // if (hasConsented) {
    //   loadConsentedScripts();
    // }
  }, []);

  const updateConsent = useCallback((newConsent: Partial<CookieConsent>) => {
    setState(prev => {
      const updatedConsent = { ...prev.consent, ...newConsent };
      
      // Save to cookie
      saveCookieConsent(updatedConsent);
      
      // Load or remove scripts based on new consent
      // NOTE: Script loading now handled by individual components (GoogleAnalytics.tsx)
      // loadConsentedScripts();
      
      return {
        ...prev,
        consent: updatedConsent,
        hasConsented: true,
        showBanner: false,
        showModal: false,
      };
    });
  }, []);

  const acceptAll = useCallback(() => {
    const allConsent: CookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    
    updateConsent(allConsent);
  }, [updateConsent]);

  const rejectAll = useCallback(() => {
    const minimalConsent: CookieConsent = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    
    // Remove existing tracking scripts
    removeTrackingScripts();
    
    updateConsent(minimalConsent);
  }, [updateConsent]);

  const showBanner = useCallback(() => {
    setState(prev => ({ ...prev, showBanner: true }));
  }, []);

  const hideBanner = useCallback(() => {
    setState(prev => ({ ...prev, showBanner: false }));
  }, []);

  const showModal = useCallback(() => {
    setState(prev => ({ ...prev, showModal: true, showBanner: false }));
  }, []);

  const hideModal = useCallback(() => {
    setState(prev => ({ ...prev, showModal: false }));
  }, []);

  const resetConsent = useCallback(() => {
    // Remove tracking scripts
    removeTrackingScripts();
    
    // Reset state to defaults
    setState({
      consent: DEFAULT_CONSENT,
      hasConsented: false,
      showBanner: true,
      showModal: false,
    });
  }, []);

  const contextValue: CookieConsentContextType = {
    state,
    updateConsent,
    acceptAll,
    rejectAll,
    showBanner,
    hideBanner,
    showModal,
    hideModal,
    resetConsent,
  };

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextType {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
} 