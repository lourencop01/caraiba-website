import { CookieConsent, DEFAULT_CONSENT, COOKIE_CONSENT_NAME, COOKIE_CONSENT_EXPIRES } from '@/types/cookies';

/**
 * Set a cookie with specified name, value, and expiration days
 */
export function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  
  return null;
}

/**
 * Delete a cookie by name
 */
export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Strict`;
}

/**
 * Save user's cookie consent preferences
 */
export function saveCookieConsent(consent: CookieConsent): void {
  const consentString = JSON.stringify({
    ...consent,
    timestamp: new Date().toISOString(),
  });
  
  setCookie(COOKIE_CONSENT_NAME, consentString, COOKIE_CONSENT_EXPIRES);
}

/**
 * Load user's cookie consent preferences
 */
export function loadCookieConsent(): { consent: CookieConsent; hasConsented: boolean } {
  const consentString = getCookie(COOKIE_CONSENT_NAME);
  
  if (!consentString) {
    return {
      consent: DEFAULT_CONSENT,
      hasConsented: false,
    };
  }
  
  try {
    const parsed = JSON.parse(consentString);
    return {
      consent: {
        essential: parsed.essential ?? true,
        analytics: parsed.analytics ?? false,
        marketing: parsed.marketing ?? false,
      },
      hasConsented: true,
    };
  } catch (error) {
    console.warn('Failed to parse cookie consent:', error);
    return {
      consent: DEFAULT_CONSENT,
      hasConsented: false,
    };
  }
}

/**
 * Check if consent has been given for a specific category
 */
export function hasConsentFor(category: keyof CookieConsent): boolean {
  const { consent } = loadCookieConsent();
  return consent[category];
}

/**
 * Reset all cookie consent (for testing or user request)
 */
export function resetCookieConsent(): void {
  deleteCookie(COOKIE_CONSENT_NAME);
} 