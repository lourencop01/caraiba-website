import { ScriptConfig } from '@/types/cookies';
import { hasConsentFor } from './cookies';

// Type definitions for tracking services
interface DataLayerItem {
  [key: string]: unknown;
  'gtm.start'?: number;
  event?: string;
}

type DataLayerPushItem = DataLayerItem | unknown[];

interface GtagFunction {
  (command: 'config', targetId: string, config?: Record<string, unknown>): void;
  (command: 'js', date: Date): void;
  (command: string, ...args: unknown[]): void;
}

interface FacebookPixelFunction {
  (command: 'init', pixelId: string): void;
  (command: 'track', event: string): void;
  (command: string, ...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
}

// Extend window object for tracking scripts
declare global {
  interface Window {
    dataLayer?: DataLayerPushItem[];
    gtag?: GtagFunction;
    fbq?: FacebookPixelFunction;
    _fbq?: FacebookPixelFunction;
  }
}

// Track loaded scripts to prevent duplicates
const loadedScripts = new Set<string>();

/**
 * Dynamically load a script if consent is given for its category
 */
export function loadScriptOnce(config: ScriptConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script already loaded
    if (loadedScripts.has(config.id)) {
      resolve();
      return;
    }

    // Check consent for non-essential scripts
    if (config.category !== 'essential' && !hasConsentFor(config.category)) {
      console.log(`Script ${config.id} not loaded - no consent for ${config.category}`);
      resolve();
      return;
    }

    // Check if script element already exists
    if (document.getElementById(config.id)) {
      loadedScripts.add(config.id);
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = config.id;
    script.src = config.src;
    script.async = config.async ?? true;
    script.defer = config.defer ?? false;

    script.onload = () => {
      loadedScripts.add(config.id);
      config.onLoad?.();
      resolve();
    };

    script.onerror = () => {
      reject(new Error(`Failed to load script: ${config.src}`));
    };

    document.head.appendChild(script);
  });
}

/**
 * Load Google Tag Manager
 */
export function loadGoogleTagManager(gtmId: string): Promise<void> {
  if (!gtmId) {
    console.warn('Google Tag Manager ID not provided');
    return Promise.resolve();
  }

  return loadScriptOnce({
    id: 'gtm-script',
    src: `https://www.googletagmanager.com/gtm.js?id=${gtmId}`,
    category: 'analytics',
    onLoad: () => {
      // Initialize GTM dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
    }
  });
}

/**
 * Load Google Analytics 4
 */
export function loadGoogleAnalytics(gaId: string): Promise<void> {
  if (!gaId) {
    console.warn('Google Analytics ID not provided');
    return Promise.resolve();
  }

  return loadScriptOnce({
    id: 'ga-script',
    src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
    category: 'analytics',
    onLoad: () => {
      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      }
      
      window.gtag = gtag as GtagFunction;
      
      // Set default consent state
      gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted'
      });

      // Initialize GA4
      gtag('js', new Date());
      gtag('config', gaId, {
        anonymize_ip: true,
        allow_google_signals: false,
        send_page_view: false // We'll send this after consent is granted
      });

      // Update consent state since we're only loading this after consent is granted
      gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'denied'
      });
    }
  });
}

/**
 * Load Facebook Pixel
 */
export function loadFacebookPixel(pixelId: string): Promise<void> {
  if (!pixelId) {
    console.warn('Facebook Pixel ID not provided');
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    if (!hasConsentFor('marketing')) {
      console.log('Facebook Pixel not loaded - no marketing consent');
      resolve();
      return;
    }

    if (loadedScripts.has('facebook-pixel')) {
      resolve();
      return;
    }

    // Initialize Facebook Pixel with proper types
    const fbq: FacebookPixelFunction = function(command: string, ...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(command, ...args);
      } else {
        fbq.queue?.push([command, ...args]);
      }
    };

    if (!window.fbq) {
      window.fbq = fbq;
      window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(script, firstScript);
    }

    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');

    loadedScripts.add('facebook-pixel');
    resolve();
  });
}

/**
 * Load scripts based on current consent settings
 */
export function loadConsentedScripts(): void {
  // Check if we're in the browser
  if (typeof window === 'undefined') return;

  const consent = hasConsentFor('analytics');
  const marketingConsent = hasConsentFor('marketing');

  // Load analytics scripts if consented
  if (consent) {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    const gaId = process.env.NEXT_PUBLIC_GA_ID;

    if (gtmId) {
      loadGoogleTagManager(gtmId).catch(console.error);
    }

    if (gaId) {
      loadGoogleAnalytics(gaId).catch(console.error);
    }
  }

  // Load marketing scripts if consented
  if (marketingConsent) {
    const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

    if (fbPixelId) {
      loadFacebookPixel(fbPixelId).catch(console.error);
    }
  }
}

/**
 * Remove tracking scripts (for consent withdrawal)
 */
export function removeTrackingScripts(): void {
  const scriptsToRemove = [
    'gtm-script',
    'ga-script',
    'facebook-pixel',
  ];

  scriptsToRemove.forEach(scriptId => {
    const script = document.getElementById(scriptId);
    if (script) {
      script.remove();
      loadedScripts.delete(scriptId);
    }
  });

  // Clear dataLayer
  if (window.dataLayer) {
    window.dataLayer = [];
  }

  // Clear Facebook Pixel
  if (window.fbq) {
    delete window.fbq;
    delete window._fbq;
  }
} 