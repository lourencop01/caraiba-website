// Site configuration for SEO and metadata
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.caraiba.pt',
  siteName: 'Caraíba',
  siteDescription:
    "Women's fashion for every season — clothing, swimwear, bags, and jewelry for confident, standout style.",

  // Supported locales
  locales: ['en', 'pt'],
  defaultLocale: 'en',

  // Social media and contact
  social: {
    instagram: 'https://www.instagram.com/caraiba_biquinis',
  },

  contact: {
    phone: '+351961725650',
    email: 'caraibalisboa@gmail.com',
    address: {
      street: 'Rua Virgilio Correia 8',
      city: 'Lisboa',
      postalCode: '1600-223',
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
