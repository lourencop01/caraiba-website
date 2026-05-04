import fs from 'fs';
import path from 'path';
import siteConfig from '../site.config.js';

// Configuration
const SITE_URL = siteConfig.siteUrl;
const SITE_NAME = siteConfig.siteName;

function generateRobots() {
  const robots = `# Robots.txt for ${SITE_NAME}
# Generated automatically at build time

User-agent: *

# Allow all locale-specific content
${siteConfig.locales.map(locale => `Allow: /${locale}/`).join('\n')}

# Allow essential files
Allow: /sitemap.xml
Allow: /robots.txt
Allow: /favicon.ico
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.gif
Allow: /*.svg
Allow: /*.webp
Allow: /_next/static/

# Block sensitive paths
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /dashboard/
Disallow: /private/
Disallow: /temp/
Disallow: /cache/
Disallow: /.env
Disallow: /config/
Disallow: /scripts/

# Block development and build files
Disallow: /.git/
Disallow: /node_modules/
Disallow: /.next/
Disallow: /build/
Disallow: /dist/

# Block common sensitive files
Disallow: /*.env*
Disallow: /*.log
Disallow: /*.json$
Disallow: /package*.json
Disallow: /tsconfig*.json
Disallow: /next.config.*
Disallow: /tailwind.config.*

# Allow specific crawlers optimized for local business
User-agent: Googlebot
${siteConfig.locales.map(locale => `Allow: /${locale}/`).join('\n')}
Allow: /sitemap.xml

User-agent: Bingbot
${siteConfig.locales.map(locale => `Allow: /${locale}/`).join('\n')}
Allow: /sitemap.xml

# Allow OpenAI's search crawler for ChatGPT search
User-agent: OAI-SearchBot
${siteConfig.locales.map(locale => `Allow: /${locale}/`).join('\n')}
Allow: /sitemap.xml

# Crawl delay for other bots (be nice to server)
User-agent: *
Crawl-delay: 1

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Additional sitemaps if you create them in the future
# Sitemap: ${SITE_URL}/sitemap-blog.xml
# Sitemap: ${SITE_URL}/sitemap-services.xml
`;

  // Write robots.txt to public directory
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const robotsPath = path.join(publicDir, 'robots.txt');
  fs.writeFileSync(robotsPath, robots);
  
  console.log(`✅ Robots.txt generated successfully at ${robotsPath}`);
  console.log(`🔗 Sitemap reference: ${SITE_URL}/sitemap.xml`);
  console.log(`🌐 Locales allowed: ${siteConfig.locales.join(', ')}`);
}

export { generateRobots };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateRobots();
} 