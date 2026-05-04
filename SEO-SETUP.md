# SEO Setup for Multilingual Hair Salon Website

## Overview

This document describes the comprehensive SEO setup for your multilingual hair salon website, ensuring search engines can properly crawl, index, and understand both English (`/en/`) and Portuguese (`/pt/`) versions of your site.

## Files Generated

### 1. Sitemap.xml (`/public/sitemap.xml`)

**Purpose**: Helps search engines discover all your pages and understand the relationship between different language versions.

**Features**:

- ✅ **Complete URL mapping** for both locales
- ✅ **Hreflang support** for proper international SEO
- ✅ **Priority and change frequency** optimization
- ✅ **Automatic generation** at build time

**Key Benefits**:

- Search engines can discover all 24 URLs across both languages
- Proper hreflang implementation prevents duplicate content issues
- Priority settings help search engines understand page importance
- Change frequencies optimize crawling efficiency

### 2. Robots.txt (`/public/robots.txt`)

**Purpose**: Controls how search engine bots crawl your website and protects sensitive areas.

**Features**:

- ✅ **Allows all locale content** (`/en/`, `/pt/`)
- ✅ **Blocks sensitive paths** (API routes, admin, config files)
- ✅ **Optimized for local business** (Googlebot, Bingbot specific rules)
- ✅ **References sitemap location**

**Security Benefits**:

- Protects development and configuration files
- Prevents crawling of sensitive API endpoints
- Blocks access to build artifacts and environment files

## Technical Implementation

### Build Process Integration

The SEO files are automatically generated during the build process:

```bash
npm run build        # Generates SEO files + builds the site
npm run build:seo    # Generates SEO files only
```

**Build Flow**:

1. `npm run build:seo` runs first
2. Generates sitemap.xml and robots.txt in `/public/`
3. `next build` runs with SEO files already in place

### Route Mapping

The sitemap includes proper mappings between locales:

| English Route | Portuguese Route | Priority | Change Freq |
|---------------|------------------|----------|-------------|
| `/en/` | `/pt/` | 1.0 | weekly |
| `/en/services` | `/pt/servicos` | 0.9 | monthly |
| `/en/services/haircuts` | `/pt/servicos/cortes` | 0.8 | monthly |
| `/en/services/colouring` | `/pt/servicos/coloracao` | 0.8 | monthly |
| `/en/services/balayage` | `/pt/servicos/madeixas` | 0.8 | monthly |
| `/en/services/blowouts` | `/pt/servicos/brushing` | 0.8 | monthly |
| `/en/team` | `/pt/equipa` | 0.7 | monthly |
| `/en/gallery` | `/pt/galeria` | 0.7 | weekly |
| `/en/reviews` | `/pt/testemunhos` | 0.7 | weekly |
| `/en/contact` | `/pt/contacto` | 0.8 | yearly |
| `/en/blog` | `/pt/blog` | 0.7 | weekly |
| `/en/blog/summer-hair-trends-2024` | `/pt/blog/trends-cabelo-verao-2024` | 0.6 | monthly |

### Hreflang Implementation

Each URL includes proper hreflang attributes:

```xml
<url>
  <loc>https://lisbonglamstudio.com/pt/servicos</loc>
  <lastmod>2024-06-11T20:33:19.851Z</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
  <xhtml:link rel="alternate" hreflang="en" href="https://lisbonglamstudio.com/en/services" />
  <xhtml:link rel="alternate" hreflang="pt-PT" href="https://lisbonglamstudio.com/pt/servicos" />
  <xhtml:link rel="alternate" hreflang="x-default" href="https://lisbonglamstudio.com/en/services" />
</url>
```

**Hreflang Codes Used**:

- `en` - English (international)
- `pt-PT` - Portuguese (Portugal)
- `x-default` - Default fallback (points to English)

## Configuration

### Site Configuration (`site.config.js`)

Centralized configuration for easy maintenance:

```javascript
module.exports = {
  siteUrl: 'https://lisbonglamstudio.com',
  siteName: 'Salon Concept',
  locales: ['en', 'pt'],
  defaultLocale: 'en',
  // ... additional config
};
```

### Environment Variables

You can override the site URL using environment variables:

```bash
SITE_URL=https://yourdomain.com npm run build
```

## Scripts Overview

### 1. `scripts/generate-sitemap.js`

- Generates XML sitemap with hreflang support
- Maps route relationships between locales
- Sets priorities and change frequencies
- Outputs to `/public/sitemap.xml`

### 2. `scripts/generate-robots.js`

- Creates robots.txt with locale-specific rules
- Blocks sensitive paths and files
- Includes sitemap reference
- Outputs to `/public/robots.txt`

### 3. `scripts/build-seo.js`

- Orchestrates both generators
- Provides user-friendly output
- Handles error reporting

## SEO Benefits

### For Search Engines

- **Complete site discovery** - All pages mapped and discoverable
- **Language targeting** - Proper hreflang signals for international SEO
- **Crawl optimization** - Priority and frequency hints for efficient crawling
- **Security compliance** - Proper blocking of sensitive areas

### For Users

- **Better language targeting** - Search engines show correct language version
- **Reduced duplicate content** - Proper canonical signals
- **Improved local search** - Optimized for Portuguese market
- **Faster indexing** - Priority pages get crawled first

## Maintenance

### Adding New Pages

To add new pages to the sitemap:

1. Edit `scripts/generate-sitemap.js`
2. Add route mapping to `routeMappings` object:

   ```javascript
   'new-page': { en: 'new-page', pt: 'nova-pagina' }
   ```

3. Add priority in `pagePriorities` object
4. Add change frequency in `changeFrequencies` object
5. Run `npm run build:seo` to regenerate

### Adding New Locales

To support additional languages:

1. Update `site.config.js`:

   ```javascript
   locales: ['en', 'pt', 'es', 'fr']
   ```

2. Add route mappings for new locales
3. Update hreflang codes in the generator

## Verification

### Test Your Setup

1. **Sitemap validation**:
   - Visit `https://yourdomain.com/sitemap.xml`
   - Validate using [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

2. **Robots.txt validation**:
   - Visit `https://yourdomain.com/robots.txt`
   - Test using [Google Search Console](https://search.google.com/search-console/robots-txt-tester)

3. **Hreflang validation**:
   - Use [Hreflang Tags Testing Tool](https://technicalseo.com/tools/hreflang/)
   - Check in Google Search Console

### Monitoring

- Submit sitemap to Google Search Console and Bing Webmaster Tools
- Monitor indexing status and any crawl errors
- Check international targeting reports
- Review hreflang implementation in search console

## Troubleshooting

### Common Issues

1. **Missing URLs in sitemap**:
   - Check route mappings in the generator script
   - Ensure all route variations are included

2. **Hreflang errors**:
   - Verify language codes (en, pt-PT)
   - Ensure reciprocal linking between all versions

3. **Blocked pages**:
   - Review robots.txt rules
   - Check for overly restrictive disallow patterns

4. **Build failures**:
   - Verify site.config.js syntax
   - Check script permissions and paths

---

## Next Steps

1. **Submit to Search Engines**:
   - Google Search Console
   - Bing Webmaster Tools

2. **Monitor Performance**:
   - Check indexing status
   - Monitor international search visibility
   - Track hreflang compliance

3. **Expand**:
   - Consider adding more specific sitemaps (blog, services)
   - Add structured data for local business
   - Implement OpenGraph and Twitter cards

Your multilingual SEO setup is now complete and will help search engines properly understand and index both language versions of your hair salon website! 🎉
