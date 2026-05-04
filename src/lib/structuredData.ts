const BASE_URL = 'https://www.salonconcept.pt';

export function generateMainStructuredData(locale: 'en' | 'pt', baseUrl: string = BASE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${baseUrl}/#business`,
    "name": "Salon Concept",
    "legalName": "Salon Concept",
    "description": locale === 'en'
      ? 'Professional hair care brand offering salon-grade products for every hair type.'
      : 'Marca profissional de cuidados capilares com produtos de grau profissional para todos os tipos de cabelo.',
    "url": baseUrl,
    "telephone": "+351915662413",
    "email": "salonconcept@gmail.com",
    "priceRange": "€€",
    "foundingDate": "2020",
    "slogan": locale === 'en' ? 'Where Beauty Meets Excellence' : 'Onde a Beleza Encontra a Excelência',
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Exemplo 12",
      "addressLocality": "Lisboa",
      "addressRegion": "Lisboa",
      "postalCode": "1500-332",
      "addressCountry": "PT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 38.719142,
      "longitude": -9.167943
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+351915662413",
      "contactType": "Customer Service",
      "areaServed": "PT",
      "availableLanguage": ["Portuguese", "English"]
    },
    "sameAs": [
      "https://www.instagram.com/salonconcept",
      "https://www.facebook.com/ParrucchieriLisbona"
    ],
    "image": `${baseUrl}/icon.png`,
    "logo": `${baseUrl}/icon.png`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.9,
      "reviewCount": 229,
      "bestRating": 5,
      "worstRating": 1
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/`,
      "inLanguage": locale
    }
  };
}

export function generatePageSpecificStructuredData(locale: 'en' | 'pt', pageType: string, baseUrl: string = BASE_URL) {
  const businessData = generateMainStructuredData(locale, baseUrl);

  const paths: Record<string, Record<'en' | 'pt', string>> = {
    home:        { en: '',          pt: '' },
    shop:        { en: '/shop',     pt: '/shop' },
    collections: { en: '/collections', pt: '/collections' },
    about:       { en: '/about',    pt: '/about' },
    contact:     { en: '/contact',  pt: '/contacto' },
  };

  const titles: Record<string, Record<'en' | 'pt', string>> = {
    home:        { en: 'Salon Concept – Professional Hair Care',       pt: 'Salon Concept – Cuidados Capilares Profissionais' },
    shop:        { en: 'Shop – Salon Concept',                         pt: 'Loja – Salon Concept' },
    collections: { en: 'Collections – Salon Concept',                  pt: 'Coleções – Salon Concept' },
    about:       { en: 'About Us – Salon Concept',                     pt: 'Sobre Nós – Salon Concept' },
    contact:     { en: 'Contact – Salon Concept',                      pt: 'Contacto – Salon Concept' },
  };

  const descriptions: Record<string, Record<'en' | 'pt', string>> = {
    home:        { en: 'Professional hair care products and brand.',                                 pt: 'Produtos e marca de cuidados capilares profissionais.' },
    shop:        { en: 'Browse our full range of professional hair care products.',                  pt: 'Explore a nossa gama completa de produtos capilares profissionais.' },
    collections: { en: 'Explore our curated product collections for every hair type.',               pt: 'Explore as nossas coleções de produtos para todos os tipos de cabelo.' },
    about:       { en: 'Meet the team behind Salon Concept.',                                        pt: 'Conheça a equipa do Salon Concept.' },
    contact:     { en: 'Get in touch with Salon Concept.',                                          pt: 'Contacte o Salon Concept.' },
  };

  const pagePath = paths[pageType]?.[locale] ?? '';
  const webPageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}/${locale}${pagePath}`,
    "name": titles[pageType]?.[locale] ?? 'Salon Concept',
    "description": descriptions[pageType]?.[locale] ?? '',
    "inLanguage": locale,
    "mainEntity": { "@id": `${baseUrl}/#business` }
  };

  return [webPageData, businessData];
}
