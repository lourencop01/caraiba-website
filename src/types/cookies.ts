export type CookieCategory = 'essential' | 'analytics' | 'marketing';

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentState {
  consent: CookieConsent;
  hasConsented: boolean;
  showBanner: boolean;
  showModal: boolean;
}

export interface ScriptConfig {
  id: string;
  src: string;
  category: CookieCategory;
  async?: boolean;
  defer?: boolean;
  onLoad?: () => void;
}

export const DEFAULT_CONSENT: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
};

export const COOKIE_CONSENT_NAME = 'caraiba-cookie-consent';
export const COOKIE_CONSENT_EXPIRES = 180; // days 