// Site configuration for SEO and metadata
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.caraiba.pt',
  siteName: 'Caraíba',
  siteDescription:
    "Women's summer fashion — bikinis, bags, and jewelry for confident, sun-soaked style.",

  // Supported locales
  locales: ['en', 'pt'],
  defaultLocale: 'en',

  // Social media and contact
  social: {
    facebook: 'https://www.facebook.com/ParrucchieriLisbona',
    instagram: 'https://www.instagram.com/salonconcept',
  },

  contact: {
    phone: '+351915662413',
    email: 'salonconcept@gmail.com',
    address: {
      street: 'Rua Exemplo 12',
      city: 'Lisboa',
      postalCode: '1500-332',
      country: 'Portugal',
    },
  },

  // Business information
  business: {
    type: 'ClothingStore',
    foundingDate: '2020',
    priceRange: '€€',
    openingHours: ['Tu-Fr 09:30-18:00', 'Sa 09:30-16:00'],
  },
};
