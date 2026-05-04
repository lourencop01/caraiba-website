'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

export function GoogleAnalytics() {
  const { state: { consent, hasConsented } } = useCookieConsent();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // Handle consent updates after script is loaded
  useEffect(() => {
    if (scriptLoaded && hasConsented && window.gtag) {
      // Update consent state based on current user preferences
      window.gtag('consent', 'update', {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied',
        functionality_storage: 'granted', // Always granted for basic functionality
        personalization_storage: consent.marketing ? 'granted' : 'denied'
      });
    }
  }, [scriptLoaded, hasConsented, consent.analytics, consent.marketing]);

  // Handle GA script loading based on consent
  const handleScriptLoad = () => {
    // Wait a bit for the GA script to fully initialize
    setTimeout(() => {
      // Ensure dataLayer exists
      if (!window.dataLayer) {
        window.dataLayer = [];
      }
      
      // Ensure gtag function exists and is properly set up
      if (typeof window.gtag !== 'function') {
        window.gtag = function(...args: unknown[]) {
          window.dataLayer?.push(args);
        };
      }
      
      setScriptLoaded(true);
      
      // Initialize GA4 with the measurement ID
      window.gtag('js', new Date());
      window.gtag('config', gaId!, {
        anonymize_ip: true,
        allow_google_signals: false,
        send_page_view: false, // We'll send this manually after consent update
      });

      // Update consent state since we're only loading this after consent is granted
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: consent.marketing ? 'granted' : 'denied',
        functionality_storage: 'granted',
        personalization_storage: consent.marketing ? 'granted' : 'denied'
      });

      // Fire the initial page_view event after consent is granted
      window.gtag('event', 'page_view', {
        page_location: window.location.href,
        page_title: document.title,
        page_referrer: document.referrer
      });
    }, 100); // Small delay to ensure GA script is fully loaded
  };

  // Only render the GA script if:
  // 1. User has consented (hasConsented is true)
  // 2. Analytics consent is granted
  // 3. GA ID is configured
  const shouldLoadGA = hasConsented && consent.analytics && gaId;

  if (!shouldLoadGA) {
    return null;
  }

  return (
    <Script
      id="google-analytics"
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      onLoad={handleScriptLoad}
    />
  );
}