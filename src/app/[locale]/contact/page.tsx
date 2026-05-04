import Contact from '@/components/Contact'
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
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
  
  const baseUrl = "https://www.salonconcept.pt";
  
  // Contact page URLs (keep consistent with routing)
  const enUrl = `${baseUrl}/en/contact/`;
  const ptUrl = `${baseUrl}/pt/contacto/`; // Fixed: Use correct Portuguese route
  const localizedUrl = locale === 'en' ? enUrl : ptUrl;

  return {
    title: locale === 'en' 
      ? 'Contact Us | Book Your Appointment | Salon Concept'
      : 'Contacte-nos | Marque a Sua Consulta | Salon Concept',
    description: locale === 'en'
      ? 'Contact Salon Concept to book your hair appointment. Located in the heart of Lisbon, we offer expert styling, cutting, and coloring services. Call us or visit our salon today.'
      : 'Contacte o Salon Concept para marcar a sua consulta de cabeleireiro. Localizado no coração de Lisboa, oferecemos serviços especializados de penteados, cortes e coloração. Ligue-nos ou visite o nosso salão hoje.',
    keywords: locale === 'en' 
      ? ['contact hair salon Lisbon', 'book appointment', 'hair salon location', 'Lisbon hairdresser contact', 'salon booking', 'hair appointment Lisbon', 'contact hairdresser', 'salon address Lisbon', 'hair salon phone']
      : ['contactar cabeleireiro Lisboa', 'marcar consulta', 'localização cabeleireiro', 'contacto cabeleireiro Lisboa', 'marcação cabeleireiro', 'consulta cabelo Lisboa', 'contactar cabeleireiro', 'morada cabeleireiro Lisboa', 'telefone cabeleireiro'],
    openGraph: {
      title: locale === 'en'
        ? 'Contact Us | Book Your Appointment | Salon Concept'
        : 'Contacte-nos | Marque a Sua Consulta | Salon Concept',
      description: locale === 'en'
        ? 'Contact Salon Concept to book your hair appointment. Located in the heart of Lisbon, we offer expert styling, cutting, and coloring services. Call us or visit our salon today.'
        : 'Contacte o Salon Concept para marcar a sua consulta de cabeleireiro. Localizado no coração de Lisboa, oferecemos serviços especializados de penteados, cortes e coloração. Ligue-nos ou visite o nosso salão hoje.',
      url: localizedUrl,
      siteName: t('openGraph.siteName'),
      images: [
        {
          url: `${baseUrl}/valentina_background.png`,
          width: 1200,
          height: 630,
          alt: locale === 'en' 
            ? "Contact Salon Concept - Hair Salon in Lisbon"
            : "Contacte o Salon Concept - Cabeleireiro em Lisboa",
        },
      ],
      locale: locale === 'pt' ? "pt_PT" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: locale === 'en'
        ? 'Contact Us | Book Your Appointment | Salon Concept'
        : 'Contacte-nos | Marque a Sua Consulta | Salon Concept',
      description: locale === 'en'
        ? 'Contact Salon Concept to book your hair appointment. Located in the heart of Lisbon, we offer expert styling, cutting, and coloring services. Call us or visit our salon today.'
        : 'Contacte o Salon Concept para marcar a sua consulta de cabeleireiro. Localizado no coração de Lisboa, oferecemos serviços especializados de penteados, cortes e coloração. Ligue-nos ou visite o nosso salão hoje.',
      images: [`${baseUrl}/og-contact-salon.jpg`],
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
    <main>
      <StructuredData data={structuredData} />
      
      {/* Hero Section with H1 */}
      <section className="pt-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
              {t('title')}
              <span className="text-1xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark block leading-tight">
                {t('subtitle')}
              </span>
            </h1>
            <p className="text-xl text-foreground-light leading-relaxed max-w-2xl mx-auto">
              {t('heroDescription')}
            </p>
          </div>
        </div>
      </section>
      
      <Contact />
    </main>
  )
} 