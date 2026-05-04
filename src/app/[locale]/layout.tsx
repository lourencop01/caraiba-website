import type { Metadata } from "next";
import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import Footer from "@/components/Footer";
import NavbarWrapper from "@/components/NavbarWrapper";
import { notFound } from "next/navigation";
import { getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import CookieConsentModal from '@/components/CookieConsentModal';
import { CartProvider } from '@/contexts/CartContext';
import CartDrawer from '@/components/shop/CartDrawer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// Define the locales
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Dynamic metadata using next-intl
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  const baseUrl = "https://www.salonconcept.pt";
  const localizedUrl = `${baseUrl}/${locale}/`;

  return {
    title: {
      default: t('title.default'),
      template: t('title.default')
    },
    description: t('description'),
    keywords: Array.isArray(t.raw('keywords')) ? t.raw('keywords') : [],
    authors: [{ name: "Salon Concept" }],
    creator: "Salon Concept",
    publisher: "Salon Concept",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: "website",
      locale: locale === 'pt' ? "pt_PT" : "en_US",
      url: localizedUrl,
      siteName: t('openGraph.siteName'),
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      images: [
        {
          url: `${baseUrl}/valentina_background.png`,
          width: 1200,
          height: 630,
          alt: t('openGraph.imageAlt'),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('twitter.title'),
      description: t('twitter.description'),
      images: [`${baseUrl}/og-lisbon-glam-studio.jpg`],
      creator: t('twitter.creator'),
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: localizedUrl,
      languages: {
        'pt': `${baseUrl}/pt/`,
        'pt-PT': `${baseUrl}/pt/`,
        'en': `${baseUrl}/en/`,
        'x-default': `${baseUrl}/en/`,
        [locale === 'pt' ? 'pt-PT' : 'en']: localizedUrl,
      },
    },
    // Additional Open Graph locale alternates for better international SEO
    other: {
      'og:locale:alternate': locale === 'en' ? ['pt_PT'] : ['en_US'],
    },
    verification: {
      google: t('verification.google'),
      yandex: t('verification.yandex'),
      yahoo: t('verification.yahoo'),
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();  
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} ${bodoniModa.variable} antialiased`}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <CartProvider>
          <NavbarWrapper locale={locale} />
          {children}
          <Footer />
          <CartDrawer />
          <CookieConsentBanner />
          <CookieConsentModal />
        </CartProvider>
      </NextIntlClientProvider>
    </div>
  );
}