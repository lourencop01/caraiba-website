import fs from 'fs';
import path from 'path';
import siteConfig from '../site.config.js';

const SITE_URL = siteConfig.siteUrl;
const locales = siteConfig.locales;

// Routes shared by locale segment (Next.js [locale] router)
const routeMappings = {
  '': { en: '', pt: '' },
  shop: { en: 'shop', pt: 'shop' },
  collections: { en: 'collections', pt: 'collections' },
  about: { en: 'about', pt: 'about' },
  contact: { en: 'contact', pt: 'contacto' },
  'privacy-policy': { en: 'privacy-policy', pt: 'politica-privacidade' },
  'cookie-policy': { en: 'cookie-policy', pt: 'politica-cookies' },
  'terms-conditions': { en: 'terms-conditions', pt: 'termos-condicoes' },
  impressum: { en: 'impressum', pt: 'aviso-legal' },
  'return-policy': { en: 'return-policy', pt: 'politica-devolucao' },
};

const pagePriorities = {
  '': 1.0,
  shop: 0.9,
  collections: 0.9,
  about: 0.8,
  contact: 0.8,
  'privacy-policy': 0.4,
  'cookie-policy': 0.4,
  'terms-conditions': 0.4,
  impressum: 0.4,
  'return-policy': 0.5,
};

const changeFrequencies = {
  '': 'weekly',
  shop: 'weekly',
  collections: 'weekly',
  about: 'monthly',
  contact: 'yearly',
  'privacy-policy': 'yearly',
  'cookie-policy': 'yearly',
  'terms-conditions': 'yearly',
  impressum: 'yearly',
  'return-policy': 'yearly',
};

export function generateSitemap() {
  const currentDate = new Date().toISOString();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  Object.keys(routeMappings).forEach((routeKey) => {
    const routes = routeMappings[routeKey];
    const priority = pagePriorities[routeKey] || 0.5;
    const changefreq = changeFrequencies[routeKey] || 'monthly';

    locales.forEach((locale) => {
      const localizedPath = routes[locale];
      const url = `${SITE_URL}/${locale}${localizedPath ? '/' + localizedPath : ''}/`;

      sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
`;

      locales.forEach((altLocale) => {
        const altPath = routes[altLocale];
        const hrefLang = altLocale === 'pt' ? 'pt-PT' : 'en';
        const altUrl = `${SITE_URL}/${altLocale}${altPath ? '/' + altPath : ''}/`;
        sitemap += `    <xhtml:link rel="alternate" hreflang="${hrefLang}" href="${altUrl}" />\n`;
      });

      const defaultUrl = `${SITE_URL}/en${routes.en ? '/' + routes.en : ''}/`;
      sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />
  </url>
`;
    });
  });

  sitemap += `</urlset>`;

  const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outPath, sitemap, 'utf8');
  console.log('Sitemap written to', outPath);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}
