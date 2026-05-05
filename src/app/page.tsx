import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Caraíba | Summer fashion for women',
    template: 'Caraíba | Summer fashion for women',
  },
  description:
    "Shop Caraíba — swimwear, bags, and jewelry for women. Summer energy, confident fits, pieces that make you feel unique.",
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
    title: 'Caraíba | Summer fashion for women',
    description:
      "Women's summer fashion: bikinis, bags, and jewelry — confidence-first design from Lisbon.",
    url: 'https://www.caraiba.pt/en/',
    siteName: 'Caraíba',
    images: [
      {
        url: 'https://www.caraiba.pt/hero1.png',
        width: 1200,
        height: 630,
        alt: 'Caraíba — summer fashion and beach style',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootPage() {
  redirect('/en');
}
