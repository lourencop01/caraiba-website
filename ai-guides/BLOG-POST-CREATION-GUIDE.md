# Blog Post Creation Guide

This guide provides a comprehensive checklist for creating new blog posts in the Tiago Zattar Hair website. Follow these steps to ensure all necessary files and configurations are updated.

---

## Table of Contents

1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Step-by-Step Guide](#step-by-step-guide)
   - [Step 1: Create Blog Post Page Files](#step-1-create-blog-post-page-files)
   - [Step 2: Add Translation Content](#step-2-add-translation-content)
   - [Step 3: Update Blog Listing Page](#step-3-update-blog-listing-page)
   - [Step 4: Update Sitemap Configuration](#step-4-update-sitemap-configuration)
   - [Step 5: Update Routing Configuration](#step-5-update-routing-configuration)
   - [Step 6: Add Featured Image](#step-6-add-featured-image)
   - [Step 7: Regenerate SEO Files](#step-7-regenerate-seo-files)
4. [Content Template](#content-template)
5. [Quick Reference Checklist](#quick-reference-checklist)

---

## Overview

Creating a blog post requires updates to **7 key areas**:

1. **Blog Post Page Files** - The actual blog post component
2. **Translation Files** - EN/PT translations for all content
3. **Blog Listing Page** - Add post to blog index
4. **Sitemap Configuration** - SEO sitemap entries
5. **Routing Configuration** - i18n routing setup
6. **Featured Image** - Blog post image asset
7. **SEO Generation** - Regenerate sitemap and robots.txt

---

## File Structure

```txt
tiago-zattar-hair/
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       └── blog/
│   │           ├── page.tsx                    # Blog listing page
│   │           ├── {english-slug}/
│   │           │   └── page.tsx               # Main blog post
│   │           └── {portuguese-slug}/
│   │               └── page.tsx               # Portuguese alias
│   └── i18n/
│       └── routing.ts                         # Routing configuration
├── locales/
│   ├── en/
│   │   └── pages.json                         # English translations
│   └── pt/
│       └── pages.json                         # Portuguese translations
├── public/
│   └── {blog-image}.webp                      # Featured image
└── scripts/
    └── generate-sitemap.js                    # Sitemap configuration
```

---

## Step-by-Step Guide

### Step 0: Research Blog Post Topic and Copy

You are an expert SEO strategist and content analyst.

Your job is to:

1. Research Blog Post Topics for this website that will get views and that are not already created in this codebase.
2. Research this topic online and find out what are the 3 top ranking pages for that specific search.

For each of the top 3 pages you find for that particular search, do the following:

1. Summarize the main argument and value proposition of the article.
2. Extract the primary keyword and all secondary/semantic keywords.
3. Identify target audience + search intent (transactional, informational, comparison, etc.).
4. List the article’s structure (H1, H2, H3s).
5. Identify what the article does well (strengths).
6. Identify content gaps, missing angles, weak explanations, or outdated info (weaknesses).

After analyzing all pages, produce the following final output:

**Final Output:**
A. A list of the **best keywords** to target for ranking, including:

- Primary keyword
- Secondary keywords
- Long-tail variants
- Semantic & related concepts people search for

B. A **content outline** for a blog post that can outrank the competitors. The outline must:

- Be more comprehensive
- Be more helpful and actionable
- Be optimized for user experience
- Include H1, H2, H3, and bullet points under each section
- Include a suggested meta title and meta description

C. A section called **“Differentiation Strategy”** explaining:

- How my content should sound
- What unique insights or examples to include
- How to satisfy search intent better than the competitors

### Step 1: Create Blog Post Page Files

#### 1.1 Main Blog Post Page

**Location:** `src/app/[locale]/blog/{english-slug}/page.tsx`

Create the main blog post component with the following structure:

```typescript
import Image from "next/image";
import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Booking from "@/components/Booking";
import Link from 'next/link';
import StructuredData from "@/components/StructuredData";
import { generateBlogPostStructuredData } from "@/lib/structuredData";
import BlogBookingLink from "@/components/BlogBookingLink";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'pages.{blogPostKey}.meta' });
  
  const baseUrl = "https://www.tiagozattarhair.pt";
  
  const blogPostUrls = {
    en: `${baseUrl}/en/blog/{english-slug}`,
    pt: `${baseUrl}/pt/blog/{portuguese-slug}`
  };

  const localizedUrl = blogPostUrls[locale as keyof typeof blogPostUrls];

  return {
    title: t('title'),
    description: t('description'),
    keywords: Array.isArray(t.raw('keywords')) ? t.raw('keywords') : [],
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: localizedUrl,
      siteName: "Tiago Zattar Hair",
      images: [
        {
          url: `${baseUrl}/{featured-image}.webp`,
          width: 1200,
          height: 630,
          alt: t('ogTitle'),
        },
      ],
      locale: locale === 'pt' ? "pt_PT" : "en_US",
      type: "article",
      publishedTime: "{YYYY-MM-DD}T00:00:00.000Z",
      modifiedTime: "{YYYY-MM-DD}T00:00:00.000Z",
      authors: ["{Author Name}"],
      section: t('section'),
      tags: Array.isArray(t.raw('tags')) ? t.raw('tags') : [],
    },
    twitter: {
      card: "summary_large_image",
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [`${baseUrl}/{featured-image}.webp`],
      creator: "@tiagozattarhair",
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
        'pt': blogPostUrls.pt,
        'pt-PT': blogPostUrls.pt,
        'en': blogPostUrls.en,
        'x-default': blogPostUrls.en,
        [locale === 'pt' ? 'pt-PT' : 'en']: localizedUrl,
      },
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'pages.{blogPostKey}.content' });
  
  const publishedDate = "{YYYY-MM-DD}";
  const formattedDate = new Date(publishedDate).toLocaleDateString(locale === 'pt' ? 'pt-PT' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate structured data for the blog post
  const blogStructuredData = generateBlogPostStructuredData(
    locale as 'en' | 'pt',
    {
      title: t('title'),
      description: t('subtitle'),
      author: t('author'),
      publishedDate: "{YYYY-MM-DD}T00:00:00.000Z",
      modifiedDate: "{YYYY-MM-DD}T00:00:00.000Z",
      slug: locale === 'pt' ? "{portuguese-slug}" : "{english-slug}",
      imageUrl: "/{featured-image}.webp",
      imageAlt: t('imageAlt'),
      category: t('category'),
      readTime: t('readTime'),
      content: t('intro') + " " + t('section1.content1'),
      faqQuestions: t.raw('faq.questions').map((faq: {question: string, answer: string}) => ({
        question: faq.question,
        answer: faq.answer
      }))
    }
  );

  return (
    <>
      <StructuredData data={blogStructuredData} />
      <main className="min-h-screen bg-gradient-to-br from-surface via-surface to-surface-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-gradient-to-r from-primary to-primary-dark text-white px-3 py-1 rounded-full text-sm font-medium">
                  {t('category')}
                </span>
                <span className="text-foreground-muted text-sm">{t('readTime')}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                {t('title')}
              </h1>
              
              <div className="flex items-center gap-4 text-foreground-muted mb-6">
                <span>{t('author')}</span>
                <span>•</span>
                <time dateTime={publishedDate}>{formattedDate}</time>
              </div>

              <p className="text-xl text-foreground-light leading-relaxed mb-8">
                {t('subtitle')}
              </p>
            </header>

            {/* Featured Image */}
            <div className="relative w-full h-96 mb-8 rounded-2xl overflow-hidden">
              <Image
                src="/{featured-image}.webp"
                alt={t('imageAlt')}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Introduction */}
            <div className="prose prose-lg max-w-none text-foreground mb-8">
              <p className="text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t('intro') }} />
            </div>

            {/* Table of Contents */}
            <div className="bg-surface-light border border-border rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('toc.title')}</h2>
              <ul className="space-y-2">
                {t.raw('toc.items').map((item: string, index: number) => (
                  <li key={index}>
                    <a 
                      href={`#section-${index + 1}`} 
                      className="text-primary hover:text-primary-dark transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Sections */}
            <div className="prose prose-lg max-w-none text-foreground space-y-12">
              {/* Add your sections here following the pattern from existing blog posts */}
            </div>

            {/* Author Bio */}
            <div className="bg-surface-light border border-border rounded-xl p-6 my-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">{t('authorBio.title')}</h3>
              <p className="text-foreground-light leading-relaxed">{t('authorBio.content')}</p>
            </div>

            {/* FAQ Section */}
            <section className="my-12">
              <h2 className="text-3xl font-bold text-foreground mb-8">{t('faq.title')}</h2>
              <div className="space-y-6">
                {t.raw('faq.questions').map((faq: {question: string, answer: string}, index: number) => (
                  <div key={index} className="bg-surface-light border border-border rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">{faq.question}</h3>
                    <p className="text-foreground-light leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 text-center text-white my-12">
              <h3 className="text-3xl font-bold mb-4">{t('cta.title')}</h3>
              <p className="text-lg mb-6 opacity-90">{t('cta.content')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <BlogBookingLink
                  id="hero-book-button"
                  source="blog_cta"
                  title={t('cta.buttonText')}
                  ariaLabel={t('cta.buttonText')}
                  className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
                >
                  {t('cta.buttonText')}
                </BlogBookingLink>
              </div>
            </div>

            {/* Related Articles Navigation */}
            <div className="border-t border-border pt-8 mt-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {locale === 'pt' ? 'Artigos Relacionados' : 'Related Articles'}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Add related article links here */}
              </div>
            </div>

          </article>
        </div>
        <Booking />
      </main>
    </>
  );
}
```

#### 1.2 Portuguese Alias Page

**Location:** `src/app/[locale]/blog/{portuguese-slug}/page.tsx`

If the Portuguese slug is different from the English slug, create an alias file:

```typescript
// Portuguese route for blog post
export { default, generateMetadata } from '../{english-slug}/page';
```

---

### Step 2: Add Translation Content

#### 2.1 English Translations

**Location:** `locales/en/pages.json`

Add under the `pages` object:

```json
{
  "pages": {
    "{blogPostKey}": {
      "meta": {
        "title": "SEO Title - Keep under 60 characters",
        "description": "SEO meta description - Keep under 160 characters",
        "keywords": [
          "keyword 1",
          "keyword 2",
          "keyword 3",
          "keyword 4",
          "keyword 5"
        ],
        "ogTitle": "Open Graph Title - Can be same as title",
        "ogDescription": "Open Graph Description - Can be same as meta description",
        "section": "Article Category/Section",
        "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
      },
      "content": {
        "category": "Category Name",
        "readTime": "X min read",
        "author": "By Author Name",
        "title": "Main Blog Post Title (H1)",
        "subtitle": "Engaging subtitle or excerpt that summarizes the post",
        "imageAlt": "Detailed description of featured image for accessibility",
        "intro": "Opening paragraph that hooks the reader and introduces the topic. Use **bold** for emphasis.",
        "toc": {
          "title": "Table of Contents",
          "items": [
            "Section 1 Short Title",
            "Section 2 Short Title",
            "Section 3 Short Title",
            "Section 4 Short Title"
          ]
        },
        "section1": {
          "title": "First Main Section Heading (H2)",
          "content1": "First paragraph of content...",
          "content2": "Second paragraph of content...",
          "content3": "Optional subheading text or introduction to a list:",
          "list1": [
            "List item 1",
            "List item 2",
            "List item 3",
            "List item 4"
          ],
          "content4": "Another subheading or text:",
          "list2": [
            "Another list item 1",
            "Another list item 2"
          ]
        },
        "section2": {
          "title": "Second Main Section Heading (H2)",
          "content1": "Content for section 2...",
          "list3": ["Items for section 2"]
        },
        "faq": {
          "title": "Frequently Asked Questions",
          "questions": [
            {
              "question": "First question?",
              "answer": "Detailed answer to the first question."
            },
            {
              "question": "Second question?",
              "answer": "Detailed answer to the second question."
            },
            {
              "question": "Third question?",
              "answer": "Detailed answer to the third question."
            }
          ]
        },
        "authorBio": {
          "title": "About the Author",
          "content": "Brief biography of the author, their expertise, and credentials."
        },
        "cta": {
          "title": "Call-to-Action Heading",
          "content": "Compelling text that encourages the reader to take action.",
          "buttonText": "Button Text",
          "secondaryText": "Optional secondary text or contact info"
        }
      }
    }
  }
}
```

#### 2.2 Portuguese Translations

**Location:** `locales/pt/pages.json`

Add the same structure with Portuguese translations:

```json
{
  "pages": {
    "{blogPostKey}": {
      "meta": {
        "title": "Título SEO - Manter sob 60 caracteres",
        "description": "Descrição meta SEO - Manter sob 160 caracteres",
        "keywords": [
          "palavra-chave 1",
          "palavra-chave 2",
          "palavra-chave 3"
        ],
        "ogTitle": "Título Open Graph",
        "ogDescription": "Descrição Open Graph",
        "section": "Categoria/Secção do Artigo",
        "tags": ["etiqueta1", "etiqueta2", "etiqueta3"]
      },
      "content": {
        "category": "Nome da Categoria",
        "readTime": "X min de leitura",
        "author": "Por Nome do Autor",
        "title": "Título Principal do Blog Post (H1)",
        "subtitle": "Subtítulo envolvente ou excerto que resume o post",
        "imageAlt": "Descrição detalhada da imagem destacada para acessibilidade",
        "intro": "Parágrafo de abertura...",
        "toc": {
          "title": "Índice",
          "items": [
            "Título da Secção 1",
            "Título da Secção 2"
          ]
        },
        "section1": {
          "title": "Primeiro Título de Secção Principal (H2)",
          "content1": "Primeiro parágrafo de conteúdo...",
          "list1": ["Item de lista 1", "Item de lista 2"]
        },
        "faq": {
          "title": "Perguntas Frequentes",
          "questions": [
            {
              "question": "Primeira pergunta?",
              "answer": "Resposta detalhada à primeira pergunta."
            }
          ]
        },
        "authorBio": {
          "title": "Sobre o Autor",
          "content": "Breve biografia do autor..."
        },
        "cta": {
          "title": "Título da Chamada para Ação",
          "content": "Texto convincente...",
          "buttonText": "Texto do Botão",
          "secondaryText": "Texto secundário opcional"
        }
      }
    }
  }
}
```

---

### Step 3: Update Blog Listing Page

**Location:** `src/app/[locale]/blog/page.tsx`

Add a new entry to the `allBlogPosts` array (around line 95):

```typescript
const allBlogPosts: BlogPostProps[] = [
  // Existing posts...
  
  // Your new post
  {
    id: "unique-numeric-id", // Sequential: "1", "2", "3", etc.
    title: locale === 'pt' 
      ? "Portuguese Title" 
      : "English Title",
    excerpt: locale === 'pt' 
      ? "Portuguese excerpt that summarizes the post content..."
      : "English excerpt that summarizes the post content...",
    author: "Author Name",
    publishedDate: "YYYY-MM-DD", // e.g., "2025-01-29"
    readTime: locale === 'pt' ? "X min de leitura" : "X min read",
    category: locale === 'pt' ? "Portuguese Category" : "English Category",
    imageUrl: "/featured-image-filename.webp",
    imageAlt: locale === 'pt' 
      ? "Portuguese alt text for image" 
      : "English alt text for image",
    slug: locale === 'pt' ? "portuguese-slug" : "english-slug"
  },
];
```

---

### Step 4: Update Sitemap Configuration

**Location:** `scripts/generate-sitemap.js`

#### 4.1 Add Route Mapping

In the `routeMappings` object (around line 38):

```javascript
const routeMappings = {
  // ... existing mappings
  
  'blog/{english-slug}': { 
    en: 'blog/{english-slug}', 
    pt: 'blog/{portuguese-slug}' 
  },
};
```

#### 4.2 Add Page Priority

In the `pagePriorities` object (around line 44):

```javascript
const pagePriorities = {
  // ... existing priorities
  
  'blog/{english-slug}': 0.6, // Use 0.6 for blog posts, 0.7 for important pages
};
```

#### 4.3 Add Change Frequency

In the `changeFrequencies` object (around line 69):

```javascript
const changeFrequencies = {
  // ... existing frequencies
  
  'blog/{english-slug}': 'monthly', // or 'weekly' for frequently updated content
};
```

---

### Step 5: Update Routing Configuration

**Location:** `src/i18n/routing.ts`

Add to the `pathnames` object inside the `routing` definition (around line 26):

```typescript
export const routing = defineRouting({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  pathnames: {
    // ... existing pathnames
    
    '/blog/{internal-route-name}': {
      en: '/blog/{english-slug}',
      pt: '/blog/{portuguese-slug}'
    },
  }
});
```

**Note:** The internal route name can be a simplified version, like `/blog/hair-botox-vs-keratin` while the external paths can be longer.

---

### Step 6: Add Featured Image

**Location:** `public/`

Add the featured image file:

#### Image Requirements

- **Format:** `.webp` (preferred) or `.jpg`/`.png`
- **Dimensions:** 1200 x 630 pixels (recommended for OG images)
- **File Size:** Optimize for web (typically < 200KB)
- **Naming:** Use descriptive, SEO-friendly filename
  - Good: `hair-botox-treatment.webp`
  - Bad: `IMG_1234.webp`

#### Optimization Tools

- Online: [Squoosh.app](https://squoosh.app/)
- CLI: `npm install -g sharp-cli` then use `sharp` command
- Photoshop/GIMP: Export for Web

---

### Step 7: Regenerate SEO Files

After updating the sitemap configuration, regenerate the sitemap and robots.txt:

```bash
npm run build:seo
```

This command runs:

- `scripts/generate-sitemap.js` - Creates `public/sitemap.xml`
- `scripts/generate-robots.js` - Creates `public/robots.txt`

Verify the files were updated correctly in the `public/` directory.

---

## Content Template

Use this template to gather all necessary information before creating a blog post:

### Basic Information

```yaml
English Slug: your-blog-post-slug
Portuguese Slug: seu-slug-do-post-blog
Blog Post Key: yourBlogPostKey (for translations)
Internal Route: /blog/internal-route-name
Published Date: YYYY-MM-DD
Author Name: Author Full Name
Category EN: English Category
Category PT: Portuguese Category
Read Time: X min read / X min de leitura
Featured Image: filename.webp
Image Dimensions: 1200x630
Priority: 0.6
Change Frequency: monthly
```

### SEO Metadata

```yaml
# English
Title EN: (max 60 chars)
Description EN: (max 160 chars)
Keywords EN: [keyword1, keyword2, keyword3, keyword4, keyword5]
OG Title EN:
OG Description EN:
Section EN:
Tags EN: [tag1, tag2, tag3]

# Portuguese
Title PT:
Description PT:
Keywords PT:
OG Title PT:
OG Description PT:
Section PT:
Tags PT:
```

### Content Outline

```yaml
# English Content
Main Title EN:
Subtitle EN:
Image Alt EN:
Introduction EN:

Table of Contents EN:
  - Section 1 (must be different from actual heading)
  - Section 2 (must be different from actual heading)
  - Section 3 (must be different from actual heading)

Section 1 EN:
  Title: (actual section heading - should differ from ToC)
  Content 1:
  Content 2:
  List Items: []

Section 2 EN:
  Title:
  Content:
  List Items: []

FAQ EN:
  - Q: Question 1?
    A: Answer 1
  - Q: Question 2?
    A: Answer 2

Author Bio EN:
CTA Title EN:
CTA Content EN:
CTA Button EN:

# Portuguese Content
[Same structure as English]
```

---

## Quick Reference Checklist

Use this checklist to ensure nothing is missed:

### Before Starting

- [ ] Gather all content (EN/PT)
- [ ] Prepare featured image (1200x630, optimized)
- [ ] Choose slugs (EN/PT)
- [ ] Determine publish date
- [ ] Write SEO metadata

### File Creation

- [ ] Create `src/app/[locale]/blog/{english-slug}/page.tsx`
- [ ] Create `src/app/[locale]/blog/{portuguese-slug}/page.tsx` (if different)
- [ ] Add featured image to `public/`

### Configuration Updates

- [ ] Add translations to `locales/en/pages.json`
- [ ] Add translations to `locales/pt/pages.json`
- [ ] Update `src/app/[locale]/blog/page.tsx` (blog listing)
- [ ] Update `scripts/generate-sitemap.js` (3 locations)
- [ ] Update `src/i18n/routing.ts`

### SEO & Testing

- [ ] Run `npm run build:seo`
- [ ] Verify `public/sitemap.xml` was updated
- [ ] Test EN version: `/en/blog/{english-slug}`
- [ ] Test PT version: `/pt/blog/{portuguese-slug}`
- [ ] Verify blog listing shows new post
- [ ] Check metadata in browser dev tools
- [ ] Validate structured data: [Google Rich Results Test](https://search.google.com/test/rich-results)

### Post-Launch

- [ ] Submit updated sitemap to Google Search Console
- [ ] Share on social media (check OG image preview)
- [ ] Monitor analytics

---

## Example: Creating "Summer Hair Trends 2025"

Here's a complete example of creating a new blog post:

### 1. Basic Info

```yaml
English Slug: summer-hair-trends-2025
Portuguese Slug: tendencias-cabelo-verao-2025
Blog Post Key: summerHairTrends2025
Published Date: 2025-02-01
Author: Tiago Zattar
Category EN: Trends
Category PT: Tendências
Read Time: 8 min read / 8 min de leitura
Featured Image: summer-hair-trends-2025.webp
```

### 2. Files to Create

```txt
src/app/[locale]/blog/summer-hair-trends-2025/page.tsx
src/app/[locale]/blog/tendencias-cabelo-verao-2025/page.tsx
public/summer-hair-trends-2025.webp
```

### 3. Configuration Updates

**`scripts/generate-sitemap.js`:**

```javascript
'blog/summer-hair-trends-2025': { 
  en: 'blog/summer-hair-trends-2025', 
  pt: 'blog/tendencias-cabelo-verao-2025' 
}
```

**`src/i18n/routing.ts`:**

```typescript
'/blog/summer-trends': {
  en: '/blog/summer-hair-trends-2025',
  pt: '/blog/tendencias-cabelo-verao-2025'
}
```

### 4. Blog Listing Entry

```typescript
{
  id: "2",
  title: locale === 'pt' 
    ? "Tendências de Cabelo para o Verão 2025" 
    : "Summer Hair Trends 2025",
  excerpt: locale === 'pt'
    ? "Descobre as principais tendências capilares para este verão..."
    : "Discover the hottest hair trends for this summer...",
  author: "Tiago Zattar",
  publishedDate: "2025-02-01",
  readTime: locale === 'pt' ? "8 min de leitura" : "8 min read",
  category: locale === 'pt' ? "Tendências" : "Trends",
  imageUrl: "/summer-hair-trends-2025.webp",
  imageAlt: locale === 'pt' 
    ? "Mulher com penteado de verão moderno" 
    : "Woman with modern summer hairstyle",
  slug: locale === 'pt' 
    ? "tendencias-cabelo-verao-2025" 
    : "summer-hair-trends-2025"
}
```

---

## Tips & Best Practices

### SEO Best Practices

1. **Title Tags:** Keep under 60 characters to avoid truncation in search results
2. **Meta Descriptions:** Keep under 160 characters, make them compelling
3. **Keywords:** Focus on 5-10 relevant keywords, include long-tail variations
4. **Headings:** Use H1 for title, H2 for main sections, H3 for subsections
5. **Alt Text:** Write descriptive, keyword-rich alt text for images
6. **Internal Links:** Link to related blog posts and service pages
7. **URL Structure:** Use clean, descriptive slugs with hyphens
8. **Anchor Text Uniqueness:** Table of contents anchor texts must be different from actual section headings to avoid duplicate anchor text issues. Make ToC items shorter or use alternative phrasing while keeping them understandable.
9. **H1 Keyword Integration:** The main keywords from the H1 heading should naturally appear throughout the rest of the blog post content. This helps search engines understand the topic and improves SEO. Integrate these keywords organically in the introduction, body paragraphs, and conclusion without keyword stuffing.

### Content Best Practices

1. **Introduction:** Hook readers in the first paragraph
2. **Table of Contents:** Helps readers navigate longer posts
   - **Important:** ToC anchor texts MUST be different from section headings
   - Make ToC items shorter, simplified, or use alternative phrasing
   - Example: If section heading is "What does 'damaged hair' mean?", use "Understanding damaged hair" in ToC
   - This prevents duplicate anchor text SEO issues
3. **Formatting:** Use short paragraphs, bullet points, and bold text for readability
4. **Images:** Include relevant images throughout (not just featured image)
5. **FAQ Section:** Helps with SEO and user experience
6. **CTA:** Include clear call-to-action to book appointments
7. **Related Content:** Link to related posts at the bottom
8. **Author Bio:** Builds trust and authority

### Translation Best Practices

1. **Don't Direct Translate:** Adapt content to cultural context
2. **Keyword Research:** Research Portuguese keywords separately
3. **Length Differences:** Portuguese text is typically 15-20% longer
4. **Local Examples:** Use locally relevant examples in each language
5. **Review:** Have native speakers review translations

### Technical Best Practices

1. **Image Optimization:** Always optimize images before uploading
2. **Structured Data:** Ensure FAQ structured data is properly formatted
3. **Mobile Testing:** Test on mobile devices
4. **Loading Speed:** Keep page load time under 3 seconds
5. **Accessibility:** Ensure proper heading hierarchy and alt text

---

## Troubleshooting

### Blog Post Not Showing on Listing

- Check that the post is added to `allBlogPosts` array in `src/app/[locale]/blog/page.tsx`
- Verify the ID is unique
- Check for syntax errors in the JSON

### 404 Error When Accessing Post

- Verify the folder name matches the slug exactly
- Check `src/i18n/routing.ts` has correct pathname mapping
- Ensure `page.tsx` exists in the blog post folder
- Clear Next.js cache: `rm -rf .next` and rebuild

### Translation Keys Not Working

- Verify the namespace matches: `pages.{blogPostKey}.content`
- Check JSON syntax in translation files (commas, quotes)
- Ensure the key path is correct in `getTranslations()`
- Restart dev server after changing translation files

### Duplicate Anchor Text SEO Error

If you get "Some anchor texts are used more than once":

- Check that Table of Contents items are different from actual section headings
- ToC anchors should be shorter or use alternative phrasing
- Example fixes:
  - "What is X?" → "Understanding X"
  - "Main causes of Y" → "Causes of Y"
  - "Essential routine for Z" → "The Z routine"
- Update both EN and PT translation files
- Keep ToC items clear and understandable despite being different

### Sitemap Not Updating

- Ensure you ran `npm run build:seo`
- Check for syntax errors in `scripts/generate-sitemap.js`
- Verify the routeMapping key matches exactly
- Look for console errors when running the script

### Images Not Loading

- Check file extension matches exactly (.webp, .jpg, .png)
- Verify image exists in `public/` directory
- Check for typos in filename (case-sensitive)
- Ensure image path starts with `/`

### Structured Data Errors

- Use [Google Rich Results Test](https://search.google.com/test/rich-results)
- Verify FAQ questions array is properly formatted
- Check all required fields are provided
- Ensure dates are in ISO format

---

## Resources

### Tools

- **Image Optimization:** [Squoosh](https://squoosh.app/)
- **SEO Testing:** [Google Search Console](https://search.google.com/search-console)
- **Rich Results:** [Google Rich Results Test](https://search.google.com/test/rich-results)
- **Meta Tag Preview:** [Meta Tags](https://metatags.io/)
- **Keyword Research:** [Google Keyword Planner](https://ads.google.com/home/tools/keyword-planner/)

### Documentation

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Schema.org BlogPosting](https://schema.org/BlogPosting)
- [Open Graph Protocol](https://ogp.me/)

---

## Questions?

If you encounter any issues not covered in this guide, please:

1. Check the existing blog posts for reference
2. Review the error messages carefully
3. Consult the Next.js and next-intl documentation
4. Test in a development environment before deploying

---

**Last Updated:** October 2025  
**Version:** 1.0
