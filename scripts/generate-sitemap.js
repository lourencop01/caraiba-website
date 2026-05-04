import fs from 'fs';
import path from 'path';
import siteConfig from '../site.config.js';

// Configuration
const SITE_URL = siteConfig.siteUrl;
const locales = siteConfig.locales;

// Route mappings between locales
const routeMappings = {
  // Main pages
  '': { en: '', pt: '' },
  'services': { en: 'services', pt: 'servicos' },
  'team': { en: 'team', pt: 'equipa' },
  'gallery': { en: 'gallery', pt: 'galeria' },
  'reviews': { en: 'reviews', pt: 'testemunhos' },
  'contact': { en: 'contact', pt: 'contacto' },
  'blog': { en: 'blog', pt: 'blog' },
  
  // Legal and policy pages
  'privacy-policy': { en: 'privacy-policy', pt: 'politica-privacidade' },
  'cookie-policy': { en: 'cookie-policy', pt: 'politica-cookies' },
  'terms-conditions': { en: 'terms-conditions', pt: 'termos-condicoes' },
  'impressum': { en: 'impressum', pt: 'aviso-legal' },
  
  // Service pages
  'services/haircuts': { en: 'services/haircuts', pt: 'servicos/cortes-de-cabelo' },
  'services/hair-coloring': { en: 'services/hair-coloring', pt: 'servicos/coloracao-de-cabelo' },
  'services/balayage': { en: 'services/balayage', pt: 'servicos/balayage' },
  'services/brushing': { en: 'services/brushing', pt: 'servicos/brushing' },
  'services/hair-treatments': { en: 'services/hair-treatments', pt: 'servicos/tratamentos-de-cabelo' },
  'services/hair-straightening': { en: 'services/hair-straightening', pt: 'servicos/alisamento-de-cabelo' },
  'services/hair-extensions': { en: 'services/hair-extensions', pt: 'servicos/extensoes-de-cabelo' },
  'services/wedding-hair-styling': { en: 'services/wedding-hair-styling', pt: 'servicos/penteados-de-casamento' },
  'services/makeup': { en: 'services/makeup', pt: 'servicos/maquilhagem' },
  
  // Blog posts
  'blog/summer-hair-trends-2024': { en: 'blog/summer-hair-trends-2024', pt: 'blog/tendencias-cabelo-verao-2024' },
  'blog/how-to-balayage-hair': { en: 'blog/how-to-balayage-hair', pt: 'blog/como-fazer-balayage-no-cabelo' },
  'blog/short-feminine-haircuts-2025': { en: 'blog/short-feminine-haircuts-2025', pt: 'blog/cortes-de-cabelo-feminino-curto-2025' }
};

// Priority and change frequency for different page types
const pagePriorities = {
  '': 1.0,
  'services': 0.9,
  'services/haircuts': 0.8,
  'services/hair-coloring': 0.8,
  'services/balayage': 0.8,
  'services/brushing': 0.8,
  'services/hair-treatments': 0.8,
  'services/hair-straightening': 0.8,
  'services/hair-extensions': 0.8,
  'services/wedding-hair-styling': 0.8,
  'services/makeup': 0.8,
  'team': 0.7,
  'gallery': 0.7,
  'reviews': 0.7,
  'contact': 0.8,
  'blog': 0.7,
  'blog/summer-hair-trends-2024': 0.6,
  'blog/how-to-balayage-hair': 0.6,
  'blog/short-feminine-haircuts-2025': 0.6,
  'privacy-policy': 0.4,
  'cookie-policy': 0.4,
  'terms-conditions': 0.4,
  'impressum': 0.4
};

const changeFrequencies = {
  '': 'weekly',
  'services': 'monthly',
  'services/haircuts': 'monthly',
  'services/hair-coloring': 'monthly',
  'services/balayage': 'monthly',
  'services/brushing': 'monthly',
  'services/hair-treatments': 'monthly',
  'services/hair-straightening': 'monthly',
  'services/hair-extensions': 'monthly',
  'services/wedding-hair-styling': 'monthly',
  'services/makeup': 'monthly',
  'team': 'monthly',
  'gallery': 'weekly',
  'reviews': 'weekly',
  'contact': 'yearly',
  'blog': 'weekly',
  'blog/summer-hair-trends-2024': 'monthly',
  'blog/how-to-balayage-hair': 'monthly',
  'blog/short-feminine-haircuts-2025': 'monthly',
  'privacy-policy': 'yearly',
  'cookie-policy': 'yearly',
  'terms-conditions': 'yearly',
  'impressum': 'yearly'
};

function generateSitemap() {
  const currentDate = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  // Generate URLs for each route
  Object.keys(routeMappings).forEach(routeKey => {
    const routes = routeMappings[routeKey];
    const priority = pagePriorities[routeKey] || 0.5;
    const changefreq = changeFrequencies[routeKey] || 'monthly';
    
    // For each locale, create a URL entry with hreflang links to all other locales
    locales.forEach(locale => {
      const localizedPath = routes[locale];
      // ✅ Add trailing slash to all URLs
      const url = `${SITE_URL}/${locale}${localizedPath ? '/' + localizedPath : ''}/`;
      
      sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
`;

      // Add hreflang links for all locales
      locales.forEach(hreflangLocale => {
        const hreflangPath = routes[hreflangLocale];
        // ✅ Add trailing slash to all hreflang URLs
        const hreflangUrl = `${SITE_URL}/${hreflangLocale}${hreflangPath ? '/' + hreflangPath : ''}/`;
        const hreflangCode = hreflangLocale === 'pt' ? 'pt-PT' : 'en';
        
        sitemap += `    <xhtml:link rel="alternate" hreflang="${hreflangCode}" href="${hreflangUrl}" />
`;
      });
      
      // Add x-default hreflang (pointing to English version)
      const defaultPath = routes[siteConfig.defaultLocale];
      // ✅ Add trailing slash to x-default URL
      const defaultUrl = `${SITE_URL}/${siteConfig.defaultLocale}${defaultPath ? '/' + defaultPath : ''}/`;
      sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />
`;
      
      sitemap += `  </url>
`;
    });
  });

  sitemap += `</urlset>`;

  // Write sitemap to public directory
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log(`✅ Sitemap generated successfully at ${sitemapPath}`);
  console.log(`📊 Generated ${Object.keys(routeMappings).length * locales.length} URLs across ${locales.length} locales`);
  console.log(`🌍 Site URL: ${SITE_URL}`);
}

export { generateSitemap };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
} 