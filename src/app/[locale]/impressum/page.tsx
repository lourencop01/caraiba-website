import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import ImpressumContent from '@/components/ImpressumContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'impressum' });
  
  const baseUrl = "https://www.salonconcept.pt";
  const enUrl = `${baseUrl}/en/impressum/`;
  const ptUrl = `${baseUrl}/pt/aviso-legal/`;
  const localizedUrl = locale === 'en' ? enUrl : ptUrl;

  return {
    title: `${t('title')} | Salon Concept`,
    description: t('description').substring(0, 160),
    robots: 'index, follow',
    openGraph: {
      title: `${t('title')} | Salon Concept`,
      description: t('description').substring(0, 160),
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

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  return <ImpressumContent />;
} 