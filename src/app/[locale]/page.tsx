import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { generatePageSpecificStructuredData } from '@/lib/structuredData';
import { getProducts, getFeaturedProducts, getCollections } from '@/lib/shopify-api';
import StructuredData from '@/components/StructuredData';

// Sections
import Hero from '@/components/Hero';
import CategoryNav from '@/components/home/CategoryNav';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PromoBanner from '@/components/home/PromoBanner';
import ProductShowcase from '@/components/home/ProductShowcase';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Newsletter from '@/components/home/Newsletter';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'metadata' });
  const baseUrl = 'https://www.salonconcept.pt';
  const enUrl = `${baseUrl}/en/`;
  const ptUrl = `${baseUrl}/pt/`;
  const localizedUrl = locale === 'en' ? enUrl : ptUrl;

  return {
    title: t('title.default'),
    description: t('description'),
    keywords: Array.isArray(t.raw('keywords')) ? t.raw('keywords') : [],
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      url: localizedUrl,
      siteName: t('openGraph.siteName'),
      images: [
        {
          url: `${baseUrl}/valentina_background.png`,
          width: 1200,
          height: 630,
          alt: t('openGraph.imageAlt'),
        },
      ],
      locale: locale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitter.title'),
      description: t('twitter.description'),
      images: [`${baseUrl}/valentina_background.png`],
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
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: localizedUrl,
      languages: {
        pt: ptUrl,
        'pt-PT': ptUrl,
        en: enUrl,
        'x-default': enUrl,
        [locale === 'pt' ? 'pt-PT' : 'en']: localizedUrl,
      },
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const structuredData = generatePageSpecificStructuredData(locale as 'en' | 'pt', 'home');

  // Fetch data in parallel
  const [featuredProducts, showcaseProducts, collections] = await Promise.all([
    getFeaturedProducts(8, locale),
    getProducts(8, locale),
    getCollections(6, locale),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <StructuredData data={structuredData} />

      {/* 1 — Hero */}
      <Hero />

      {/* 2 — Category Navigation */}
      <CategoryNav collections={collections} locale={locale} />

      {/* 3 — Featured Products */}
      <FeaturedProducts products={featuredProducts} locale={locale} />

      {/* 4 — Highlight / Promo Banner */}
      {/* <PromoBanner locale={locale} /> */}

      {/* 5 — Product Showcase (New Arrivals) */}
      <ProductShowcase products={showcaseProducts} locale={locale} />

      {/* 8 — Brand / Story */}
      <About isHomePage={true} />

      {/* 6 — Social Proof */}
      <Testimonials isHomePage={true} />

      {/* 7 — Visual Content */}
      <Gallery isHomePage={true} />

      {/* 9 — Newsletter / CTA */}
      {/* <Newsletter /> */}
    </main>
  );
}
