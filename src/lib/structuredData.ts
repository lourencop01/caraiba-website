const BASE_URL = 'https://www.caraiba.pt';

export function generateMainStructuredData(locale: 'en' | 'pt', baseUrl: string = BASE_URL) {
  return {
    "email": "salonconcept@gmail.com",
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${baseUrl}/#business`,
    name: 'Caraíba',
    legalName: 'Caraíba',
    description:
      locale === 'en'
        ? "Women's summer fashion — swimwear, bags, and jewelry designed to celebrate confidence and individuality."
        : 'Moda de verão para mulheres — fatos de banho, malas e bijuteria pensados para celebrar confiança e individualidade.',
    url: baseUrl,
    telephone: '+351915662413',
    priceRange: '€€',
    foundingDate: '2020',
    slogan:
      locale === 'en'
        ? 'Summer fashion for women that makes you feel one of a kind.'
        : 'Moda de verão para mulheres que a faz sentir única.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Exemplo 12',
      addressLocality: 'Lisboa',
      addressRegion: 'Lisboa',
      postalCode: '1500-332',
      addressCountry: 'PT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.719142,
      longitude: -9.167943,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+351915662413',
      contactType: 'Customer Service',
      areaServed: 'PT',
      availableLanguage: ['Portuguese', 'English'],
    },
    "sameAs": [
      "https://www.instagram.com/salonconcept",
      "https://www.facebook.com/ParrucchieriLisbona"
    ],
    "image": `${baseUrl}/icon.png`,
    "logo": `${baseUrl}/icon.png`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 229,
      bestRating: 5,
      worstRating: 1,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/${locale}/`,
      inLanguage: locale,
    },
  };
}

export function generatePageSpecificStructuredData(locale: 'en' | 'pt', pageType: string, baseUrl: string = BASE_URL) {
  const businessData = generateMainStructuredData(locale, baseUrl);

  const paths: Record<string, Record<'en' | 'pt', string>> = {
    home: { en: '', pt: '' },
    shop: { en: '/shop', pt: '/shop' },
    collections: { en: '/collections', pt: '/collections' },
    about: { en: '/about', pt: '/about' },
    contact: { en: '/contact', pt: '/contacto' },
  };

  const titles: Record<string, Record<'en' | 'pt', string>> = {
    home: { en: 'Caraíba — Summer fashion for women', pt: 'Caraíba — Moda de verão para mulheres' },
    shop: { en: 'Shop — Caraíba', pt: 'Loja — Caraíba' },
    collections: { en: 'Collections — Caraíba', pt: 'Coleções — Caraíba' },
    about: { en: 'About — Caraíba', pt: 'Sobre — Caraíba' },
    contact: { en: 'Contact — Caraíba', pt: 'Contacto — Caraíba' },
  };

  const descriptions: Record<string, Record<'en' | 'pt', string>> = {
    home: {
      en: "Women's summer fashion: swimwear, bags, and jewelry with a confident, sun-soaked vibe.",
      pt: 'Moda de verão para mulheres: fatos de banho, malas e bijuteria com um espírito luminoso e confiante.',
    },
    shop: {
      en: 'Browse bikinis, bags, jewelry, and accessories from Caraíba.',
      pt: 'Explore fatos de banho, malas, bijuteria e acessórios Caraíba.',
    },
    collections: {
      en: 'Shop curated summer edits and capsule collections.',
      pt: 'Compre edições de verão e coleções curadas.',
    },
    about: {
      en: 'Our mission: fashion that lifts confidence and celebrates your uniqueness.',
      pt: 'A nossa missão: moda que valoriza a confiança e celebra a singularidade.',
    },
    contact: {
      en: 'Reach Caraíba for orders, sizing, or styling help.',
      pt: 'Contacte a Caraíba para encomendas, tamanhos ou ajuda de styling.',
    },
  };

  const pagePath = paths[pageType]?.[locale] ?? '';
  const webPageData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${baseUrl}/${locale}${pagePath}`,
    name: titles[pageType]?.[locale] ?? 'Caraíba',
    description: descriptions[pageType]?.[locale] ?? '',
    inLanguage: locale,
    mainEntity: { '@id': `${baseUrl}/#business` },
  };

  return [webPageData, businessData];
}
