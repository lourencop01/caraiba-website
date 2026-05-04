import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n } from './i18n/routing';

// Replace with your actual canonical domain (with www)
const CANONICAL_DOMAIN = 'www.salonconcept.pt';
const PROTOCOL = 'https';

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  let languages: string[];
  try {
    languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  } catch {
    languages = [];
  }

  const locales: string[] = i18n.locales;
  
  // Ensure we have valid languages array and fallback to default if empty
  const validLanguages = Array.isArray(languages) && languages.length > 0 
    ? languages.filter(lang => typeof lang === 'string' && lang.trim() !== '')
    : [i18n.defaultLocale];

  try {
    return matchLocale(validLanguages, locales, i18n.defaultLocale);
  } catch (error) {
    // If matchLocale fails, return the default locale
    console.warn('Failed to match locale:', error);
    return i18n.defaultLocale;
  }
}

// Only initialize maintenance mode check once
const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get('host') || '';
  
  // 1. REDIRECT: Non-www to www (or vice versa based on CANONICAL_DOMAIN)
  // This ensures consistent subdomain usage
  // Skip redirect for localhost and development environments
  const isLocalhost = host.includes('localhost') || host.startsWith('127.0.0.1') || host.startsWith('[::1]');
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (host && host !== CANONICAL_DOMAIN && !isLocalhost && !isDevelopment) {
    const canonicalUrl = new URL(
      `${PROTOCOL}://${CANONICAL_DOMAIN}${pathname}${search}`
    );
    return NextResponse.redirect(canonicalUrl, { status: 301 });
  }

  // 2. REDIRECT: Add trailing slash to locale paths without it
  // Example: /en -> /en/
  const locales = i18n.locales;
  const localePattern = new RegExp(`^/(${locales.join('|')})$`);
  
  if (localePattern.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `${pathname}/`;
    return NextResponse.redirect(url, { status: 301 });
  }
  
  // Extract locale from pathname for all requests
  let currentLocale = i18n.defaultLocale;
  for (const locale of i18n.locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      currentLocale = locale;
      break;
    }
  }
  
  // If maintenance mode is disabled, skip all maintenance-related checks
  if (isMaintenanceMode) {
    // Skip maintenance check for API routes and static files
    if (!pathname.startsWith('/api/') && 
        !pathname.includes('.') && 
        !pathname.startsWith('/_next/')) {
      
      const maintenanceAccess = request.cookies.get('maintenance_access');
      if (!maintenanceAccess?.value) {
        return NextResponse.rewrite(new URL('/maintenance', request.url));
      }
    }
  }

  // Handle i18n routing
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const response = NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
    // Set the detected locale in a custom header
    response.headers.set('x-locale', locale);
    return response;
  }

  // For requests that already have a locale, add it to headers
  const response = NextResponse.next();
  response.headers.set('x-locale', currentLocale);
  return response;
}

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - Static files (_next/static)
  // - Image optimization files (_next/image)
  // - Favicon, robots.txt, sitemap.xml
  // - Any files with extensions (images, css, js, fonts, etc.)
  // This ensures middleware ONLY runs on actual page routes and not on static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*|api/).*)']}; 