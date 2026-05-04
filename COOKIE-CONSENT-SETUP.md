# Cookie Consent Implementation Guide

## Overview

This project includes a comprehensive, GDPR-compliant cookie consent system built with:

- **@use-cookie-consent/react** for consent management
- **next-intl** for multilingual support (English & Portuguese)
- **Tailwind CSS** for styling
- **TypeScript** for type safety

## Features

### ✅ **GDPR Compliance**

- Granular consent categories (Essential, Analytics, Marketing)
- User can accept/reject specific categories
- Consent stored for 180 days
- Easy consent withdrawal

### ✅ **Multilingual Support**

- Fully translated interface (EN/PT)
- RTL-ready design
- Fallback to English if translation missing

### ✅ **Dynamic Script Loading**

- Scripts only load after explicit consent
- Supports Google Analytics, Google Tag Manager, Facebook Pixel
- Prevents tracking before consent

### ✅ **Accessibility**

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatible
- Focus management

### ✅ **User Experience**

- Beautiful modal interface
- Non-intrusive banner
- Manage preferences from footer
- Smooth animations

## Setup Instructions

### 1. **Environment Variables** (Optional)

Create a `.env.local` file if you want to use analytics/marketing tools:

```env
# Analytics & Tracking (Only add if needed)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=1234567890123456
```

### 2. **Cookie Categories**

The system supports three categories:

#### **Essential Cookies** (Always enabled)

- Authentication tokens
- Security preferences
- Language settings
- Theme preferences
- Cart/session data

#### **Analytics Cookies** (Optional)

- Google Analytics
- Google Tag Manager
- Page view tracking
- User behavior analysis

#### **Marketing Cookies** (Optional)

- Facebook Pixel
- Google Ads conversion tracking
- Retargeting pixels
- Social media tracking

### 3. **Integration Status**

The cookie consent system is already integrated into:

- ✅ Root layout (`src/app/layout.tsx`)
- ✅ Footer component (manage cookies button)
- ✅ Translation files (EN/PT)
- ✅ Theme provider (localStorage usage)

## Usage

### **For Users**

1. **First Visit**: Banner appears at bottom of screen
2. **Quick Actions**:
   - "Accept All" - enables all cookies
   - "Reject All" - only essential cookies
   - "Manage Preferences" - opens detailed modal
3. **Manage Later**: Click "Manage Cookies" in footer anytime

### **For Developers**

#### **Check Consent Status**

```typescript
import { useCookieConsent } from '@/contexts/CookieConsentContext';

function MyComponent() {
  const { state } = useCookieConsent();
  
  // Check if user has consented to analytics
  if (state.consent.analytics) {
    // Load analytics code
  }
}
```

#### **Add New Tracking Scripts**

```typescript
import { loadScriptOnce } from '@/lib/scriptLoader';

// Add to loadConsentedScripts function
if (hasConsentFor('marketing')) {
  loadScriptOnce({
    id: 'new-pixel',
    src: 'https://example.com/pixel.js',
    category: 'marketing',
    onLoad: () => {
      // Initialize tracking
    }
  });
}
```

#### **Add New Translations**

Update `locales/en/common.json` and `locales/pt/common.json`:

```json
{
  "cookies": {
    "categories": {
      "newCategory": {
        "title": "New Category",
        "description": "Description...",
        "examples": "Examples..."
      }
    }
  }
}
```

## File Structure

```markdown
src/
├── components/
│   ├── CookieConsentBanner.tsx    # Bottom banner
│   ├── CookieConsentModal.tsx     # Preferences modal
│   └── Footer.tsx                 # Updated with manage button
├── contexts/
│   └── CookieConsentContext.tsx   # React context
├── lib/
│   ├── cookies.ts                 # Cookie utilities
│   └── scriptLoader.ts            # Dynamic script loading
├── types/
│   └── cookies.ts                 # TypeScript types
└── app/
    └── layout.tsx                 # Integration point

locales/
├── en/common.json                 # English translations
└── pt/common.json                 # Portuguese translations
```

## Customization

### **Styling**

All components use Tailwind CSS classes. Customize by:

1. Modifying classes in component files
2. Adding custom CSS for specific elements
3. Using theme variables for consistent colors

### **Adding Languages**

1. Create new locale file: `locales/es/common.json`
2. Add translations for all cookie-related keys
3. Update i18n configuration
4. Test all components in new language

### **Adding Tracking Services**

#### **Example: Adding TikTok Pixel**

```typescript
// In scriptLoader.ts
export function loadTikTokPixel(pixelId: string): Promise<void> {
  return loadScriptOnce({
    id: 'tiktok-pixel',
    src: 'https://analytics.tiktok.com/i18n/pixel/events.js',
    category: 'marketing',
    onLoad: () => {
      ttq.load(pixelId);
      ttq.page();
    }
  });
}

// In loadConsentedScripts function
if (marketingConsent) {
  const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  if (tiktokPixelId) {
    loadTikTokPixel(tiktokPixelId);
  }
}
```

## Legal Compliance

### **GDPR Requirements** ✅

- ✅ Clear consent request
- ✅ Granular categories
- ✅ Easy withdrawal
- ✅ Purpose explanation
- ✅ Data retention period (180 days)

### **CCPA Requirements** ✅

- ✅ Opt-out mechanism
- ✅ Clear privacy notice
- ✅ User control over data

### **Cookie Law Requirements** ✅

- ✅ Non-essential cookies require consent
- ✅ Essential cookies clearly identified
- ✅ Purpose and duration specified

## Testing

### **Manual Testing Checklist**

- [ ] Banner appears on first visit
- [ ] "Accept All" enables all cookies
- [ ] "Reject All" only enables essential
- [ ] Modal opens from "Manage Preferences"
- [ ] Toggle switches work correctly
- [ ] Consent persists across sessions
- [ ] Footer button reopens modal
- [ ] Keyboard navigation works
- [ ] Screen reader accessibility

### **Analytics Testing**

1. Open browser dev tools
2. Go to Network tab
3. Visit site with cleared cookies
4. Reject all cookies
5. Verify no analytics requests
6. Accept analytics cookies
7. Verify analytics requests start

### **Multi-language Testing**

1. Test with `/en/` URLs
2. Test with `/pt/` URLs
3. Verify all text translates correctly
4. Check for missing translation keys

## Troubleshooting

### **Scripts Not Loading**

1. Check console for errors
2. Verify environment variables set
3. Confirm consent given for category
4. Check script URLs are accessible

### **Translations Missing**

1. Verify key exists in both locale files
2. Check for typos in translation keys
3. Ensure fallback to English works

### **Consent Not Persisting**

1. Check browser allows cookies
2. Verify localStorage is available
3. Check for JavaScript errors
4. Confirm cookie expiration settings

### **Styling Issues**

1. Verify Tailwind CSS classes are valid
2. Check for CSS conflicts
3. Test in different browsers
4. Verify responsive design

## Support

For issues with this implementation:

1. Check console for JavaScript errors
2. Verify all required files are present
3. Test with different browsers
4. Check network requests in dev tools

For GDPR compliance questions, consult with legal counsel as requirements may vary by jurisdiction and business type.

## Future Enhancements

Potential improvements:

- [ ] Add more tracking services
- [ ] Implement consent analytics
- [ ] Add cookie scanner
- [ ] Create admin dashboard
- [ ] Add consent expiry notifications
- [ ] Implement consent sync across domains
