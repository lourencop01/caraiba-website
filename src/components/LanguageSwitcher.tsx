'use client'

import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { useEffect } from 'react';

const SCROLL_POSITION_KEY = 'language_switch_scroll_position';

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = params.locale as string;

  useEffect(() => {
    // Check if we have a scroll position to restore
    const scrollY = sessionStorage.getItem(SCROLL_POSITION_KEY);
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem(SCROLL_POSITION_KEY);
    }
  }, [locale]);

  const handleLanguageSwitch = async (loc: string) => {
    if (loc === locale) return; // Don't switch if it's the same language
    
    // Store current scroll position
    sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
    
    // Navigate to new locale
    await router.replace(pathname, { locale: loc });
  };

  return (
    <div className="flex items-center space-x-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLanguageSwitch(loc)}
          className={`py-1 px-1 text-sm transition-colors border-b-2 ${
            locale === loc
              ? 'border-primary-dark text-foreground'
              : 'border-transparent text-foreground hover:text-primary'
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
} 