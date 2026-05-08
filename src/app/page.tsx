import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Caraíba | Women\'s fashion for every season',
    template: 'Caraíba | Women\'s fashion for every season',
  },
  description:
    'Shop Caraíba — clothing, swimwear, bags, and jewelry for women. Confident fits and standout pieces for every season.',
  metadataBase: new URL('https://www.caraiba.pt'),
  alternates: {
    canonical: 'https://www.caraiba.pt/en/',
    languages: {
      pt: 'https://www.caraiba.pt/pt/',
      'pt-PT': 'https://www.caraiba.pt/pt/',
      en: 'https://www.caraiba.pt/en/',
      'x-default': 'https://www.caraiba.pt/en/',
    },
  },
  robots: {
    index: false, // Don't index the root redirect page
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
  openGraph: {
    title: 'Caraíba | Women\'s fashion for every season',
    description:
      'Women\'s fashion for every season: clothing, swimwear, bags, and jewelry — confidence-first design from Lisbon.',
    url: 'https://www.caraiba.pt/en/',
    siteName: 'Caraíba',
    images: [
      {
        url: 'https://www.caraiba.pt/hero1.png',
        width: 1200,
        height: 630,
        alt: 'Caraíba — women\'s fashion for every season',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootPage() {
  redirect('/en');
}
