# Fast Origin Transfer Usage Fix Guide

## 🔍 Problem Identified

Your Vercel Fast Origin Transfer usage suddenly increased due to:

1. **Middleware running on every request** - Including static images
2. **Large unoptimized images** - Up to 1.5MB per image
3. **No caching headers** - Every request invokes functions
4. **Multiple images per page** - Blog posts load 7+ images each

## ✅ Fixes Applied

### 1. Middleware Matcher Updated ✓
**File:** `src/middleware.ts`

The middleware matcher now excludes:
- All files with extensions (using `.*\\..*` pattern)
  - Images: .webp, .png, .jpg, .jpeg, .gif, .svg, etc.
  - Styles: .css
  - Scripts: .js
  - Fonts: .woff, .woff2, .ttf, .eot
  - Any other static files
- robots.txt and sitemap.xml
- _next/static and _next/image
- API routes

**Pattern used:** `'/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*|api/).*)'`

This ensures middleware ONLY runs on actual page routes (like `/en/`, `/pt/blog/`, etc.) and not on any static assets.

**Impact:** Reduces function invocations by ~80-90%

### 2. Cache-Control Headers Added ✓
**File:** `next.config.ts`

Added caching headers:
- Static assets: 1 year cache (immutable)
- HTML pages: 1 hour cache with stale-while-revalidate

**Impact:** Reduces repeated function calls for the same content

## 🚀 Additional Optimizations Needed

### 3. Optimize Large Images (MANUAL STEP REQUIRED)

The following images are too large and should be compressed:

```bash
# Images over 500KB:
women-balayage-lisbon.webp          - 1.5MB  ⚠️ CRITICAL
female-hairdresser-lisbon-balayage.webp - 932KB  ⚠️ HIGH
female-hairdresser-italian.webp     - 472KB  ⚠️ MEDIUM
```

#### Option A: Use Online Tools
1. Go to https://squoosh.app/
2. Upload each large image
3. Use WebP format with quality 80-85
4. Download and replace the original

#### Option B: Use ImageMagick (if installed)
```bash
# Install ImageMagick (if not installed)
brew install imagemagick

# Compress images
cd public/
magick women-balayage-lisbon.webp -quality 85 -define webp:method=6 women-balayage-lisbon-optimized.webp
magick female-hairdresser-lisbon-balayage.webp -quality 85 -define webp:method=6 female-hairdresser-lisbon-balayage-optimized.webp
magick female-hairdresser-italian.webp -quality 85 -define webp:method=6 female-hairdresser-italian-optimized.webp

# Replace originals
mv women-balayage-lisbon-optimized.webp women-balayage-lisbon.webp
mv female-hairdresser-lisbon-balayage-optimized.webp female-hairdresser-lisbon-balayage.webp
mv female-hairdresser-italian-optimized.webp female-hairdresser-italian.webp
```

#### Option C: Use Sharp (Node.js)
```bash
# Install sharp
npm install --save-dev sharp

# Create optimization script
node scripts/optimize-images.js
```

### 4. Add Loading Priority to Images

For blog posts with many images, ensure only the hero image uses `priority`:

```tsx
// Hero image (above fold) - KEEP priority
<Image src="..." alt="..." priority />

// Other images (below fold) - USE lazy loading
<Image src="..." alt="..." loading="lazy" />
```

**Already done correctly in most components!** ✓

### 5. Consider Next.js Image Optimization

Next.js automatically optimizes images through the `next/image` component, but this also uses Fast Origin Transfer. To reduce costs:

- Use appropriately sized source images (not larger than needed)
- Set proper `sizes` attribute for responsive images
- Consider using a CDN for images

## 📊 Expected Impact

| Fix | Expected Reduction |
|-----|-------------------|
| Middleware matcher fix | 80-90% of image-related FOT |
| Cache-Control headers | 50-70% of repeat requests |
| Image optimization | 60-80% of image transfer size |
| **Total Expected Savings** | **70-85% reduction** |

## 🔍 Monitoring

After deploying these changes:

1. Go to Vercel Dashboard → Your Project → Usage
2. Monitor "Fast Origin Transfer" metric
3. Check "Top Paths" to see which paths still have high usage
4. Look at the breakdown by:
   - Incoming vs Outgoing
   - By project
   - By region

## 🚨 If Usage is Still High

If you're still seeing high usage after these fixes:

1. **Check for bot traffic:**
   - Look at Vercel Analytics for unusual traffic patterns
   - Consider adding rate limiting

2. **Review API routes:**
   - Check if any API routes are sending large responses
   - Add caching to API responses where appropriate

3. **Consider ISR (Incremental Static Regeneration):**
   - For blog posts and static content
   - Reduces function invocations significantly

4. **Enable Vercel Data Cache:**
   - Automatically caches function responses
   - Reduces Fast Origin Transfer usage

## 📝 Next Steps

1. ✅ Deploy the middleware and cache header changes
2. ⏳ Optimize the 3 largest images (see section 3 above)
3. ⏳ Monitor usage for 24-48 hours
4. ⏳ If needed, implement additional optimizations

## 🔗 Resources

- [Vercel Fast Origin Transfer Docs](https://vercel.com/docs/manage-cdn-usage#fast-origin-transfer)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Vercel Caching](https://vercel.com/docs/edge-network/caching)

