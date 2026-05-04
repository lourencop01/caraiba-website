import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import CookiePolicyContent from '@/components/CookiePolicyContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'cookies.policy' });
  
  const baseUrl = "https://www.salonconcept.pt";
  const enUrl = `${baseUrl}/en/cookie-policy/`;
  const ptUrl = `${baseUrl}/pt/politica-cookies/`;
  const localizedUrl = locale === 'en' ? enUrl : ptUrl;
  
  return {
    title: `${t('title')} | Salon Concept`,
    description: t('introduction.description').substring(0, 160),
    robots: 'index, follow',
    openGraph: {
      title: `${t('title')} | Salon Concept`,
      description: t('introduction.description').substring(0, 160),
      url: localizedUrl,
      siteName: 'Salon Concept',
      locale: locale === 'pt' ? "pt_PT" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: localizedUrl,
      languages: {
        'pt': ptUrl,
        'pt-PT': ptUrl,
        'en': enUrl,
        'x-default': enUrl,
        [locale === 'pt' ? 'pt-PT' : 'en']: localizedUrl,
      },
    },
  };
}

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  return <CookiePolicyContent />;
} 