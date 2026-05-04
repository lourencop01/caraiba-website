import "./globals.css";
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import { Viewport } from 'next';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import Script from 'next/script';
import { headers } from 'next/headers';
import { i18n } from '@/i18n/routing';

// Export viewport configuration instead of using meta tag
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

// Function to extract locale from middleware headers
async function getLocaleFromHeaders(): Promise<string> {
  const headersList = await headers();
  
  // Get locale from custom header set by middleware
  const localeHeader = headersList.get('x-locale');
  if (localeHeader && i18n.locales.includes(localeHeader as typeof i18n.locales[number])) {
    return localeHeader;
  }
  
  // Fallback: extract from referer or other headers
  const referer = headersList.get('referer') || '';
  for (const locale of i18n.locales) {
    if (referer.includes(`/${locale}/`) || referer.endsWith(`/${locale}`)) {
      return locale;
    }
  }
  
  return i18n.defaultLocale;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the locale server-side from middleware headers
  const locale = await getLocaleFromHeaders();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Favicon configuration for all browsers and search engines */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* 
          CRITICAL: Default-deny snippet must run BEFORE any GA code
          This sets up gtag function and denies all consent categories by default
        */}
        <Script
          id="ga-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              
              // Set default consent to denied for all categories
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                functionality_storage: 'denied',
                personalization_storage: 'denied',
                security_storage: 'granted'
              });
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <CookieConsentProvider>
          {/* 
            GoogleAnalytics component is rendered inside CookieConsentProvider
            so it can access the consent state via useCookieConsent()
          */}
          <GoogleAnalytics />
          {children}
        </CookieConsentProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
