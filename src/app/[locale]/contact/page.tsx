import Image from 'next/image';
import Contact from '@/components/Contact';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cormorantGaramond } from '@/lib/fonts';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import StructuredData from '@/components/StructuredData';
import { generatePageSpecificStructuredData } from '@/lib/structuredData';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  const baseUrl = 'https://www.caraiba.pt';

  const enUrl = `${baseUrl}/en/contact/`;
  const ptUrl = `${baseUrl}/pt/contacto/`;
  const localizedUrl = locale === 'en' ? enUrl : ptUrl;

  return {
    title:
      locale === 'en'
        ? 'Contact | Customer support | Caraíba'
        : 'Contacto | Apoio ao cliente | Caraíba',
    description:
      locale === 'en'
        ? 'Questions about orders, sizing, delivery, or styling? Contact Caraíba by phone, WhatsApp, or email — we reply as soon as we can.'
        : 'Dúvidas sobre encomendas, tamanhos, envios ou styling? Contacte a Caraíba por telefone, WhatsApp ou e-mail — respondemos o mais rápido possível.',
    keywords:
      locale === 'en'
        ? [
            'Caraíba contact',
            'swimwear help Lisbon',
            'fashion customer support',
            'order tracking',
            'sizing help',
            'women swimwear Portugal',
          ]
        : [
            'contacto Caraíba',
            'apoio ao cliente moda',
            'ajuda encomendas',
            'tamanhos fatos de banho',
            'moda feminina Portugal',
          ],
    openGraph: {
      title:
        locale === 'en'
          ? 'Contact | Customer support | Caraíba'
          : 'Contacto | Apoio ao cliente | Caraíba',
      description:
        locale === 'en'
          ? 'Questions about orders, sizing, delivery, or styling? Contact Caraíba by phone, WhatsApp, or email.'
          : 'Dúvidas sobre encomendas, tamanhos ou envios? Contacte a Caraíba por telefone, WhatsApp ou e-mail.',
      url: localizedUrl,
      siteName: t('openGraph.siteName'),
      images: [
        {
          url: `${baseUrl}/hero1.png`,
          width: 1200,
          height: 630,
          alt:
            locale === 'en'
              ? 'Contact Caraíba — customer support'
              : 'Contacto Caraíba — apoio ao cliente',
        },
      ],
      locale: locale === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title:
        locale === 'en'
          ? 'Contact | Customer support | Caraíba'
          : 'Contacto | Apoio ao cliente | Caraíba',
      description:
        locale === 'en'
          ? 'Questions about orders, sizing, delivery, or styling? Contact Caraíba by phone, WhatsApp, or email.'
          : 'Dúvidas sobre encomendas, tamanhos ou envios? Contacte a Caraíba.',
      images: [`${baseUrl}/hero1.png`],
      creator: t('twitter.creator'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
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

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  
  const t = await getTranslations({ locale, namespace: 'contact' });
  
  // Generate structured data for contact page
  const structuredData = generatePageSpecificStructuredData(locale as 'en' | 'pt', 'contact');
  return (
    <main className="min-h-screen bg-background">
      <StructuredData data={structuredData} />
      
      <section className="relative overflow-hidden bg-foreground pt-24 pb-20 lg:pt-28 lg:pb-24">
        <div className="absolute inset-0 opacity-[0.12]">
          <Image src="/pexels-2.jpg" alt="" fill className="object-cover" priority />
        </div>
        <div className="relative container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-primary">
            {t('heroEyebrow')}
          </span>
          <h1
            className={`mx-auto max-w-3xl text-4xl font-bold leading-tight text-background sm:text-5xl lg:text-6xl ${cormorantGaramond.className}`}
          >
            {t('title')}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-background/75 sm:text-xl">{t('subtitle')}</p>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-background/60 sm:text-lg">
            {t('heroDescription')}
          </p>
        </div>
      </section>
      
      <Contact />
    </main>
  )
} 