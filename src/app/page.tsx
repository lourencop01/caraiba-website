import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: "Salon Concept | Women's Hair Salon in Lisbon",
    template: "Salon Concept | Women's Hair Salon in Lisbon"
  },
  description: "Transform your look at Lisbon's premier hair salon. Professional cuts, coloring, balayage, styling & treatments by expert stylists. Book your appointment today!",
  metadataBase: new URL("https://www.salonconcept.pt"),
  alternates: {
    canonical: "https://www.salonconcept.pt/en/",
    languages: {
      'pt': "https://www.salonconcept.pt/pt/",
      'pt-PT': "https://www.salonconcept.pt/pt/",
      'en': "https://www.salonconcept.pt/en/",
      'x-default': "https://www.salonconcept.pt/en/",
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
    title: "Salon Concept | Women's Hair Salon in Lisbon",
    description: "Transform your look at Lisbon's premier hair salon. Professional cuts, coloring, balayage, styling & treatments by expert stylists. Book your appointment today!",
    url: "https://www.salonconcept.pt/en/",
    siteName: "Salon Concept",
    images: [
      {
        url: "https://www.salonconcept.pt/valentina_background.png",
        width: 1200,
        height: 630,
        alt: "Salon Concept - Premium Hair Salon in Lisbon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootPage() {
  // Permanent redirect to the default locale
  redirect('/en')
} 