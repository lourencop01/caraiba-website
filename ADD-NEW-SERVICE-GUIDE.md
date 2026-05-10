# Complete Guide: Adding a New Service to Studio27 Website

This guide outlines every file and change required when adding a new service to the Tutor Tatiana website.

## Quick Overview: Files to Update

When adding a new service, you'll need to modify these **13 files** across your project:

### Translation Files (4 files)

1. `locales/en/services.json` - English service info
2. `locales/pt/services.json` - Portuguese service info  
3. `locales/en/faqs.json` - English FAQs
4. `locales/pt/faqs.json` - Portuguese FAQs

### Component Files (2 files)

1. `src/components/Services.tsx` - Homepage service cards
2. `src/components/Navbar.tsx` - Navigation menu

### Configuration Files (3 files)

1. `src/i18n/routing.ts` - Route definitions
2. `src/lib/structuredData.ts` - SEO structured data types
3. `scripts/generate-sitemap.js` - Sitemap generation

### Page Files (4 files - 2 created, 2 referenced)

1. `src/app/[locale]/services/[slug]/page.tsx` - English service page ✨ **CREATE NEW**
2. `src/app/[locale]/servicos/[slug]/page.tsx` - Portuguese re-export ✨ **CREATE NEW**

---

## Service Information Required

Before starting, gather the following information about the new service:

1. **Service Name** (English and Portuguese)
2. **Service Slug** (URL-friendly name in both languages)
3. **Service Description** (short and long versions in both languages)
4. **Price** (starting price in EUR)
5. **Icon** (from react-icons/pi library)
6. **Why Choose Us** reasons (6 bullet points in both languages)
7. **Service Packages/Options** (with names and prices)
8. **FAQs** (4-6 questions and answers in both languages)
9. **Meta Description** (SEO description in both languages)
10. **Keywords** (SEO keywords in both languages)
11. **Emoji** (optional, for visual representation)

## Step-by-Step Implementation

### 1. Add Translations to JSON Files

#### File: `locales/en/services.json`

Add the following entries:

```json
{
  "services": {
    // Add service name to the main services object
    "serviceName": "Service Display Name"
  },
  "servicesPage": {
    // Add basic service info for the Services component
    "serviceNameTitle": "Service Title",
    "serviceNameDescription": "Brief description for the service card (1-2 sentences)",
    "serviceNamePrice": "From €XX",
    "serviceNameLearnMore": "More About Service Name",
    
    // Add detailed service info for the service page
    "serviceName": {
      "title": "Full Service Title",
      "subtitle": "Service Subtitle/Tagline",
      // Add specific service properties (see existing examples)
      "propertyName1": "Property Value 1",
      "propertyName2": "Property Value 2"
    },
    
    // Add "Why Choose Us" reasons
    "whyChooseUsReasons": {
      "serviceName": {
        "reason1": "First reason text",
        "reason2": "Second reason text",
        "reason3": "Third reason text",
        "reason4": "Fourth reason text",
        "reason5": "Fifth reason text",
        "reason6": "Sixth reason text"
      }
    }
  }
}
```

#### File: `locales/pt/services.json`

Add the same structure as above but with Portuguese translations.

#### File: `locales/en/faqs.json`

Add FAQ section:

```json
{
  "faqs": {
    "serviceName": {
      "q1": "First question?",
      "a1": "First answer.",
      "q2": "Second question?",
      "a2": "Second answer.",
      "q3": "Third question?",
      "a3": "Third answer.",
      "q4": "Fourth question?",
      "a4": "Fourth answer.",
      // Optional: add q5 and q6 for more comprehensive FAQs
      "q5": "Fifth question?",
      "a5": "Fifth answer.",
      "q6": "Sixth question?",
      "a6": "Sixth answer."
    }
  }
}
```

#### File: `locales/pt/faqs.json`

Add the same FAQ structure with Portuguese translations.

---

### 2. Update Components

#### File: `src/components/Services.tsx`

Add the new service to the `services` array (around line 27):

```typescript
const services = [
  // ... existing services ...
  { 
    name: t('servicesPage.serviceNameTitle'), 
    description: t('servicesPage.serviceNameDescription'), 
    price: t('servicesPage.serviceNamePrice'), 
    icon: <PiIconName />,  // Import the icon at the top of the file
    slug: locale === 'en' ? "service-slug-en" : "service-slug-pt",
    learnMore: t('servicesPage.serviceNameLearnMore')
  }
];
```

**Important:** Also add the icon import at the top of the file:

```typescript
import {
  // ... existing icons ...
  PiIconName  // Add your new icon here
} from "react-icons/pi";
```

#### File: `src/components/Navbar.tsx`

Add the new service to the `services` array (around line 68):

```typescript
const services = [
  // ... existing services ...
  { 
    name: t('services.serviceName'), 
    slug: locale === 'en' ? "service-slug-en" : "service-slug-pt", 
    icon: <PiIconName /> 
  }
];
```

**Important:** Also add the icon import at the top of the file (around line 10-21).

---

### 3. Update Routing Configuration

#### File: `src/i18n/routing.ts`

Add the new service route to the `pathnames` object:

```typescript
export const routing = defineRouting({
  pathnames: {
    // ... existing routes ...
    '/services/service-slug-en': {
      en: '/services/service-slug-en',
      pt: '/servicos/service-slug-pt'
    }
  }
});
```

---

### 4. Update Structured Data

#### File: `src/lib/structuredData.ts`

Add FAQ generation support by updating the `generateFAQStructuredData` function type definition:

```typescript
export function generateFAQStructuredData(
  locale: 'en' | 'pt', 
  serviceType: 'haircuts' | 'colouring' | 'balayage' | 'blowouts' | 'straightening' | 'makeup' | 'serviceName',  // Add your service
  t: (key: string) => string
)
```

**Note:** The function logic should already handle the new service type automatically since it's dynamic.

---

### 5. Create Service Page Files

#### File: `src/app/[locale]/services/service-slug-en/page.tsx`

Create the main service page (use the template below):

```typescript
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { generatePageSpecificStructuredData, generateFAQStructuredData } from "@/lib/structuredData";
import Booking from '@/components/Booking';
import StructuredData from '@/components/StructuredData';
import ServiceBookingLink from '@/components/ServiceBookingLink';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'metadata' });
  const baseUrl = "https://www.tutortatiana.pt";
  
  const enUrl = `${baseUrl}/en/services/service-slug-en/`;
  const ptUrl = `${baseUrl}/pt/servicos/service-slug-pt/`;
  const localizedUrl = locale === 'en' ? enUrl : ptUrl;

  return {
    title: locale === 'en' ? 'Service Name | Tutor Tatiana' : 'Nome do Serviço | Tutor Tatiana',
    description: locale === 'en' 
      ? 'English service description for SEO (150-160 characters)'
      : 'Descrição em português do serviço para SEO (150-160 caracteres)',
    keywords: locale === 'en' 
      ? ['keyword1', 'keyword2', 'keyword3', 'service Lisbon', 'professional service']
      : ['palavra1', 'palavra2', 'palavra3', 'serviço Lisboa', 'serviço profissional'],
    openGraph: {
      title: `${locale === 'en' ? 'Service Name' : 'Nome do Serviço'} - ${t('openGraph.siteName')}`,
      description: locale === 'en' 
        ? 'English service description for social media'
        : 'Descrição em português do serviço para redes sociais',
      url: localizedUrl,
      siteName: t('openGraph.siteName'),
      images: [
        {
          url: `${baseUrl}/service-image.png`,  // Use appropriate image
          width: 1200,
          height: 630,
          alt: "Service Name at Tutor Tatiana",
        },
      ],
      locale: locale === 'pt' ? "pt_PT" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${locale === 'en' ? 'Service Name' : 'Nome do Serviço'} - ${t('twitter.title')}`,
      description: locale === 'en' 
        ? 'English service description for Twitter'
        : 'Descrição em português do serviço para Twitter',
      images: [`${baseUrl}/og-service.jpg`],
      creator: t('twitter.creator'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: localizedUrl,
      languages: {
        'pt': ptUrl,
        'pt-PT': ptUrl,
        'en': enUrl,
        'x-default': enUrl,
        [locale === 'pt' ? 'pt-PT' : 'en']: localizedUrl,
      },
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const businessStructuredData = generatePageSpecificStructuredData(locale as 'en' | 'pt', 'serviceName');
  const t = await getTranslations({ locale });
  const faqStructuredData = generateFAQStructuredData(locale as 'en' | 'pt', 'serviceName', t);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      businessStructuredData,
      faqStructuredData,
      {
        "@type": "Service",
        "name": "Service Name",
        "description": "Detailed service description for structured data",
        "url": locale === 'en' ? "https://www.tutortatiana.pt/en/services/service-slug-en/" : "https://www.tutortatiana.pt/pt/servicos/service-slug-pt/",
        "serviceType": "Service Type",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://www.tutortatiana.pt/#hairsalon"
        },
        "offers": [
          {
            "@type": "Offer",
            "name": "Service Package Name 1",
            "url": locale === 'en' ? "https://www.tutortatiana.pt/en/services/service-slug-en/" : "https://www.tutortatiana.pt/pt/servicos/service-slug-pt/",
            "availability": "https://schema.org/InStock",
            "areaServed": {
              "@type": "Place",
              "name": "Lisbon"
            }
          }
          // Add more service packages/offers as needed
        ],
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": locale === 'en' ? "https://www.tutortatiana.pt/en/services/service-slug-en/" : "https://www.tutortatiana.pt/pt/servicos/service-slug-pt/"
        }
      }
    ]
  };

  // Determine number of FAQs (4 or 6)
  const faqCount = 6; // Change to 4 if service only has 4 FAQs

  return (
    <main className="py-20 bg-background">
      <StructuredData data={serviceSchema} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🎨</div> {/* Use appropriate emoji */}
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {t('servicesPage.serviceNameTitle')}
          </h1>
          <p className="text-xl text-foreground-light max-w-3xl mx-auto">
            {t('servicesPage.serviceName.subtitle')}
          </p>
        </div>

        {/* Service Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              {t('servicesPage.whyChooseUs')}
            </h2>
            <ul className="space-y-4 text-foreground-light">
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>{t('servicesPage.whyChooseUsReasons.serviceName.reason1')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>{t('servicesPage.whyChooseUsReasons.serviceName.reason2')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>{t('servicesPage.whyChooseUsReasons.serviceName.reason3')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>{t('servicesPage.whyChooseUsReasons.serviceName.reason4')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>{t('servicesPage.whyChooseUsReasons.serviceName.reason5')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>{t('servicesPage.whyChooseUsReasons.serviceName.reason6')}</span>
              </li>
            </ul>
          </div>
          
          {/* Pricing Card */}
          <div className="bg-gradient-to-br from-surface to-surface-dark p-8 rounded-2xl border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {t('servicesPage.servicesTable')}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-foreground">
                  {locale === 'en' ? 'Package Name 1' : 'Nome do Pacote 1'}
                </span>
                {/* Price commented out - uncomment if needed */}
                {/* <span className="text-primary font-semibold">€XX</span> */}
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-foreground">
                  {locale === 'en' ? 'Package Name 2' : 'Nome do Pacote 2'}
                </span>
                {/* <span className="text-primary font-semibold">€XX</span> */}
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-foreground">
                  {locale === 'en' ? 'Package Name 3' : 'Nome do Pacote 3'}
                </span>
                {/* <span className="text-primary font-semibold">€XX</span> */}
              </div>
              {/* Add more packages as needed */}
            </div>
            
            <ServiceBookingLink 
              source="service_servicename"
              value={XX}  // Average/starting price value
            />
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {t('faqs.title')}
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {/* FAQ 1 */}
              <div className="bg-gradient-to-br from-surface to-surface-dark p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {t('faqs.serviceName.q1')}
                </h3>
                <p className="text-foreground-light">
                  {t('faqs.serviceName.a1')}
                </p>
              </div>
              
              {/* FAQ 2 */}
              <div className="bg-gradient-to-br from-surface to-surface-dark p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {t('faqs.serviceName.q2')}
                </h3>
                <p className="text-foreground-light">
                  {t('faqs.serviceName.a2')}
                </p>
              </div>
              
              {/* FAQ 3 */}
              <div className="bg-gradient-to-br from-surface to-surface-dark p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {t('faqs.serviceName.q3')}
                </h3>
                <p className="text-foreground-light">
                  {t('faqs.serviceName.a3')}
                </p>
              </div>
              
              {/* FAQ 4 */}
              <div className="bg-gradient-to-br from-surface to-surface-dark p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {t('faqs.serviceName.q4')}
                </h3>
                <p className="text-foreground-light">
                  {t('faqs.serviceName.a4')}
                </p>
              </div>
              
              {/* FAQ 5 - Optional, include if service has 6 FAQs */}
              {faqCount === 6 && (
                <div className="bg-gradient-to-br from-surface to-surface-dark p-6 rounded-xl border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {t('faqs.serviceName.q5')}
                  </h3>
                  <p className="text-foreground-light">
                    {t('faqs.serviceName.a5')}
                  </p>
                </div>
              )}
              
              {/* FAQ 6 - Optional, include if service has 6 FAQs */}
              {faqCount === 6 && (
                <div className="bg-gradient-to-br from-surface to-surface-dark p-6 rounded-xl border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {t('faqs.serviceName.q6')}
                  </h3>
                  <p className="text-foreground-light">
                    {t('faqs.serviceName.a6')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Booking />
    </main>
  );
}
```

#### File: `src/app/[locale]/servicos/service-slug-pt/page.tsx`

Create a re-export file for the Portuguese route:

```typescript
// Portuguese route for service-name service page
export { default, generateMetadata } from '../../services/service-slug-en/page';
```

---

### 6. Update Sitemap Generation Script

#### File: `scripts/generate-sitemap.js`

Add your new service to three objects in the sitemap generation script:

**1. Route Mappings** (around line 26):

```javascript
const routeMappings = {
  // ... existing routes ...
  
  // Service pages
  'services/haircuts': { en: 'services/haircuts', pt: 'servicos/cortes-de-cabelo' },
  'services/hair-coloring': { en: 'services/hair-coloring', pt: 'servicos/coloracao-de-cabelo' },
  // ... other services ...
  'services/service-slug-en': { en: 'services/service-slug-en', pt: 'servicos/service-slug-pt' },  // Add new service
};
```

**Note:** The sitemap generation script automatically adds trailing slashes to all URLs, so you don't need to include them in the route mappings.

**2. Page Priorities** (around line 41):

```javascript
const pagePriorities = {
  // ... existing priorities ...
  
  'services/haircuts': 0.8,
  'services/hair-coloring': 0.8,
  // ... other services ...
  'services/service-slug-en': 0.8,  // Add new service (use 0.8 for service pages)
};
```

**3. Change Frequencies** (around line 64):

```javascript
const changeFrequencies = {
  // ... existing frequencies ...
  
  'services/haircuts': 'monthly',
  'services/hair-coloring': 'monthly',
  // ... other services ...
  'services/service-slug-en': 'monthly',  // Add new service (use 'monthly' for service pages)
};
```

**Important Notes:**

- Use priority `0.8` for all service pages (standard for important service pages)
- Use change frequency `'monthly'` for service pages (they don't change frequently)
- The route key should match the English slug: `'services/service-slug-en'`
- The route mapping must include both English and Portuguese paths

**After updating, regenerate the sitemap:**

```bash
npm run build:seo
```

This will regenerate the sitemap with your new service included. All URLs will automatically include trailing slashes as per the site's configuration.

---

### 7. Summary Checklist

When adding a new service, ensure you've completed all these steps (23 total):

- [ ] Added service name to `locales/en/services.json` → `services` object
- [ ] Added service name to `locales/pt/services.json` → `services` object
- [ ] Added service details to `locales/en/services.json` → `servicesPage` object
- [ ] Added service details to `locales/pt/services.json` → `servicesPage` object
- [ ] Added "Why Choose Us" reasons to both EN/PT services.json files
- [ ] Added FAQs to `locales/en/faqs.json` (4-6 Q&As)
- [ ] Added FAQs to `locales/pt/faqs.json` (4-6 Q&As)
- [ ] Updated `src/components/Services.tsx` services array
- [ ] Added icon import to `src/components/Services.tsx`
- [ ] Updated `src/components/Navbar.tsx` services array
- [ ] Added icon import to `src/components/Navbar.tsx`
- [ ] Added route to `src/i18n/routing.ts` pathnames
- [ ] Updated `src/lib/structuredData.ts` type definition
- [ ] Added route to `scripts/generate-sitemap.js` → `routeMappings`
- [ ] Added priority to `scripts/generate-sitemap.js` → `pagePriorities`
- [ ] Added frequency to `scripts/generate-sitemap.js` → `changeFrequencies`
- [ ] Regenerated sitemap with `npm run build:seo`
- [ ] Created `src/app/[locale]/services/service-slug-en/page.tsx`
- [ ] Created `src/app/[locale]/servicos/service-slug-pt/page.tsx` (re-export)
- [ ] Tested English route: `/en/services/service-slug-en/`
- [ ] Tested Portuguese route: `/pt/servicos/service-slug-pt/`
- [ ] Verified all canonical URLs include trailing slashes (metadata)
- [ ] Verified all structured data URLs include trailing slashes
- [ ] Verified navigation dropdown shows the new service
- [ ] Verified home page services section shows the new service
- [ ] Verified structured data renders correctly
- [ ] Verified metadata/SEO tags are correct

---

## 8. Common Patterns and Notes

### URL Structure and Trailing Slashes

**Important:** All URLs in this project must include trailing slashes to match the `trailingSlash: true` configuration in `next.config.ts`.

- ✅ Correct: `https://www.tutortatiana.pt/en/services/haircuts/`
- ❌ Wrong: `https://www.tutortatiana.pt/en/services/haircuts`

**When creating canonical URLs and structured data:**
- Always include trailing slashes in canonical URLs
- Always include trailing slashes in Open Graph URLs
- Always include trailing slashes in structured data URLs
- The sitemap automatically adds trailing slashes

This ensures:
- Consistent URL structure across the site
- Proper SEO canonicalization
- No duplicate content issues in Google Search Console
- Correct redirect chains (non-www → www, no trailing slash → trailing slash)

### Icon Selection

Choose icons from `react-icons/pi` (Phosphor Icons). Common choices:

- `PiScissors` - Haircuts
- `PiPalette` - Coloring
- `PiPaintBrush` - Balayage
- `PiWind` - Blowouts/Brushing
- `PiFire` - Straightening
- `PiHighlighterCircle` - Makeup
- `PiSparkle` - Treatments
- `PiHairDryer` - Styling

### Slug Naming Convention

- English: Use hyphens, lowercase: `hair-coloring`, `makeup`, `haircuts`
- Portuguese: Use hyphens, lowercase: `coloracao-de-cabelo`, `maquilhagem`, `cortes-de-cabelo`
- Some services share the same slug: `balayage`, `brushing`

### Translation Key Naming

Use camelCase for translation keys: `serviceNameTitle`, `whyChooseUs`, `professionalConsultation`

### Price Formatting

Always use "From €XX" format in English and "A partir de €XX" in Portuguese.

### Structured Data

- Always include business structured data
- Always include FAQ structured data
- Include service-specific schema with offers array
- Each offer should have price, currency, availability, and area served

### Image Requirements

- OpenGraph image: 1200x630px
- Twitter card image: same as OpenGraph
- Use `/studio27logo.png` as fallback or create service-specific image

---

## 9. Testing After Implementation

1. **Development Server**: Run `npm run dev` and test both routes
2. **Build**: Run `npm run build` to ensure no build errors
3. **Navigation**: Check that service appears in navbar dropdown
4. **Home Page**: Verify service card shows on homepage services section
5. **SEO**: Use browser dev tools to inspect meta tags and structured data
6. **Translations**: Test both EN and PT versions thoroughly
7. **Links**: Verify all internal links work correctly
8. **Mobile**: Test responsive design on mobile devices

---

## 10. Additional Considerations

### SEO Best Practices

- Keep meta descriptions between 150-160 characters
- Include location (Lisboa/Lisbon) in keywords
- Use natural language in descriptions
- Ensure titles are unique and descriptive

### Content Writing Tips

- "Why Choose Us" reasons should be specific and valuable
- FAQs should address common customer concerns
- Service descriptions should be clear and benefit-focused
- Include calls-to-action where appropriate

### Accessibility

- Use semantic HTML
- Ensure color contrast meets WCAG standards
- Test with keyboard navigation
- Verify screen reader compatibility

---

## 11. Example: Full Implementation for "Hair Extensions"

### Service Information

- **English Name**: Hair Extensions
- **Portuguese Name**: Extensões de Cabelo
- **English Slug**: `hair-extensions`
- **Portuguese Slug**: `extensoes-de-cabelo`
- **Icon**: `PiSparkle`
- **Starting Price**: €150
- **Emoji**: ✨

### locales/en/services.json

```json
{
  "services": {
    "hairExtensions": "Hair Extensions"
  },
  "servicesPage": {
    "hairExtensionsTitle": "Professional Hair Extensions",
    "hairExtensionsDescription": "Transform your look with premium hair extensions. Add length, volume, and versatility to your style.",
    "hairExtensionsPrice": "From €150",
    "hairExtensionsLearnMore": "More About Hair Extensions",
    "hairExtensions": {
      "title": "Professional Hair Extensions",
      "subtitle": "Add Length, Volume, and Beauty to Your Hair"
    },
    "whyChooseUsReasons": {
      "hairExtensions": {
        "reason1": "Premium quality human hair extensions",
        "reason2": "Expert application techniques for natural look",
        "reason3": "Wide variety of colors and textures",
        "reason4": "Long-lasting results with proper care",
        "reason5": "Personalized consultation and color matching",
        "reason6": "Minimal damage application methods"
      }
    }
  }
}
```

### scripts/generate-sitemap.js

```javascript
const routeMappings = {
  // ... existing routes ...
  'services/hair-extensions': { en: 'services/hair-extensions', pt: 'servicos/extensoes-de-cabelo' }
};

const pagePriorities = {
  // ... existing priorities ...
  'services/hair-extensions': 0.8
};

const changeFrequencies = {
  // ... existing frequencies ...
  'services/hair-extensions': 'monthly'
};
```

---

This guide should provide complete coverage for adding any new service to the Studio27 website.
