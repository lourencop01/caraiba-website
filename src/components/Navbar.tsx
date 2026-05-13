'use client';
import Link from 'next/link';
// import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
// import { trackGenerateLead } from '@/lib/analytics';
import { PiCaretDown, PiArrowRight, PiSealPercent } from 'react-icons/pi';
// import { IoLogoWhatsapp } from 'react-icons/io';
import CartIcon from './shop/CartIcon';
import type { NavShopData } from './NavbarWrapper';
import { cormorantGaramond } from '@/lib/fonts';

interface NavbarProps {
  shopData: NavShopData;
}

export default function Navbar({ shopData }: NavbarProps) {
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = useTranslations();

  const { collections, productTypes, hasSaleItems } = shopData;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const otherLinks = [
    { label: t('navigation.collections'), href: `/${locale}/collections` },
    { label: t('navigation.about'),       href: `/${locale}/about` },
    { label: t('navigation.contact'),     href: locale === 'en' ? `/${locale}/contact` : `/${locale}/contacto` },
  ];

  const shopHref = `/${locale}/shop`;
  const isShopActive = pathname.startsWith(shopHref);

  const isActive = (href: string) =>
    href === `/${locale}`
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(href);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileShopOpen(false);
  };

  const openDropdown = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setIsShopDropdownOpen(true);
  };
  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setIsShopDropdownOpen(false), 120);
  };

  const categoryHref = (canonical: string) =>
    `/${locale}/shop?filter=${encodeURIComponent(JSON.stringify({ productType: canonical }))}`;

  const isHomepage = pathname === `/${locale}` || pathname === `/${locale}/`;
  const isTransparent = isHomepage && !isScrolled;

  const linkBase = 'font-medium transition-colors text-sm py-2';
  const linkColor = isTransparent
    ? 'text-white/85 hover:text-white'
    : 'text-foreground-light hover:text-primary-dark';
  const activeLinkColor = isTransparent ? 'text-white' : 'text-primary-dark';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-background/95 backdrop-blur-sm shadow-theme border-b border-border'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-6">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0" onClick={closeMobileMenu}>
            <div className="w-6 h-6 rounded-full overflow-hidden bg-secondary">
            </div>
            <span
              className={`block lg:hidden xl:block text-lg lg:text-xl font-bold uppercase transition-colors duration-300 ${cormorantGaramond.className} ${
                isTransparent ? 'text-white' : 'text-foreground'
              }`}
            >
              {t('site.name')}
              <sup className="text-sm font-bold ml-px" aria-hidden>
                ®
              </sup>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">

            {/* Home */}
            <Link
              href={`/${locale}`}
              className={`${linkBase} ${isActive(`/${locale}`) ? activeLinkColor : linkColor}`}
            >
              {t('navigation.home')}
            </Link>

            {/* Shop — with mega dropdown */}
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <div className="flex items-center gap-0.5">
                <Link
                  href={shopHref}
                  className={`${linkBase} ${isShopActive ? activeLinkColor : linkColor}`}
                >
                  {t('navigation.shop')}
                </Link>
                <button
                  onClick={() => setIsShopDropdownOpen((v) => !v)}
                  aria-expanded={isShopDropdownOpen}
                  aria-label={t('accessibility.toggleShopMenu')}
                  className={`p-2 focus:outline-none ${isShopActive ? activeLinkColor : linkColor}`}
                >
                  <PiCaretDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isShopDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              {/* Dropdown panel */}
              {isShopDropdownOpen && (
                <div
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-3 overflow-hidden
                    ${ productTypes.length > 0 ? 'w-[560px]' : 'w-[360px]'}
                    ${isTransparent
                      ? 'bg-black/40 backdrop-blur-md border border-white/10'
                      : 'bg-background border border-border shadow-lg'
                    }`}
                >
                  <div className={`grid gap-0 ${
                    isTransparent ? 'divide-x divide-white/10' : 'divide-x divide-border'
                  } ${
                    productTypes.length > 0 ? 'grid-cols-3' : 'grid-cols-2'
                  }`}>

                    {/* ── Quick Links (leftmost) ── */}
                    <div className="p-5">
                      <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
                        isTransparent ? 'text-white/50' : 'text-foreground-muted'
                      }`}>
                        {t('navigation.shop')}
                      </p>
                      <ul className="space-y-1">
                        <li>
                          <Link
                            href={shopHref}
                            onClick={() => setIsShopDropdownOpen(false)}
                            className={`block text-sm py-1 transition-colors hover:underline ${
                              isTransparent
                                ? 'text-white/80 hover:text-white'
                                : 'text-foreground-light hover:text-primary-dark'
                            }`}
                          >
                            {t('navigation.viewAll')}
                          </Link>
                        </li>
                        {hasSaleItems && (
                          <li>
                            <Link
                              href={`/${locale}/shop?onSale=true`}
                              rel="nofollow"
                              onClick={() => setIsShopDropdownOpen(false)}
                              className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 hover:underline py-1 transition-colors"
                            >
                              <PiSealPercent className="w-4 h-4" />
                              {t('navigation.sale')}
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* ── Shop by Category ── */}
                    {productTypes.length > 0 && (
                      <div className="p-5">
                        <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
                          isTransparent ? 'text-white/50' : 'text-foreground-muted'
                        }`}>
                          {t('navigation.shopByCategory')}
                        </p>
                        <ul className="space-y-1">
                          {productTypes.map((type) => (
                            <li key={type.canonical}>
                              <Link
                                href={categoryHref(type.canonical)}
                                onClick={() => setIsShopDropdownOpen(false)}
                                className={`block text-sm py-1 transition-colors hover:underline ${
                                  isTransparent
                                    ? 'text-white/80 hover:text-white'
                                    : 'text-foreground-light hover:text-primary-dark'
                                }`}
                              >
                                {type.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* ── Shop by Collection ── */}
                    <div className="p-5">
                      <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
                        isTransparent ? 'text-white/50' : 'text-foreground-muted'
                      }`}>
                        {t('navigation.shopByCollection')}
                      </p>
                      <ul className="space-y-1">
                        {collections.map((col) => (
                          <li key={col.handle}>
                            <Link
                              href={`/${locale}/collections/${col.handle}`}
                              onClick={() => setIsShopDropdownOpen(false)}
                              className={`block text-sm py-1 transition-colors hover:underline ${
                                isTransparent
                                  ? 'text-white/80 hover:text-white'
                                  : 'text-foreground-light hover:text-primary-dark'
                              }`}
                            >
                              {col.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other links */}
            {otherLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${linkBase} ${isActive(link.href) ? activeLinkColor : linkColor}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Sale link */}
            {hasSaleItems && (
              <Link
                href={`/${locale}/shop?onSale=true`}
                rel="nofollow"
                className={`${linkBase} flex items-center gap-1 font-medium tracking-wide ${
                  isTransparent
                    ? 'text-red-300 hover:text-red-100'
                    : 'text-red-500 hover:text-red-600'
                }`}
              >
                <PiSealPercent className="w-4 h-4" />
                {t('navigation.sale')}
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher isTransparent={isTransparent} />
            <span className="hidden lg:flex">
              <CartIcon isTransparent={isTransparent} />
            </span>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t('accessibility.toggleMobileMenu')}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`w-full h-0.5 transition-all duration-300 ${
                  isTransparent ? 'bg-white' : 'bg-foreground-light'
                } ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <div className={`w-full h-0.5 transition-all duration-300 ${
                  isTransparent ? 'bg-white' : 'bg-foreground-light'
                } ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-full h-0.5 transition-all duration-300 ${
                  isTransparent ? 'bg-white' : 'bg-foreground-light'
                } ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className={`border-t backdrop-blur-sm ${
          isTransparent
            ? 'bg-black/40 border-white/10'
            : 'bg-surface/95 border-border shadow-theme-lg'
        }`}>
          <div className="container mx-auto px-6 py-4 space-y-1">

            {/* Home */}
            <Link
              href={`/${locale}`}
              onClick={closeMobileMenu}
              className={`flex items-center px-4 py-3 font-medium transition-all duration-200 rounded-xl ${
                isTransparent
                  ? isActive(`/${locale}`) ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                  : isActive(`/${locale}`) ? 'text-primary bg-background/70' : 'text-foreground-light hover:text-primary-dark hover:bg-background/70'
              }`}
            >
              {t('navigation.home')}
            </Link>

            {/* Shop — expandable */}
            <div>
              <button
                onClick={() => setIsMobileShopOpen((v) => !v)}
                className={`flex items-center justify-between w-full px-4 py-3 font-medium transition-all duration-200 rounded-xl ${
                  isTransparent
                    ? isShopActive ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                    : isShopActive ? 'text-primary bg-background/70' : 'text-foreground-light hover:text-primary-dark hover:bg-background/70'
                }`}
              >
                <span>{t('navigation.shop')}</span>
                <PiCaretDown className={`w-4 h-4 transition-transform duration-200 ${isMobileShopOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMobileShopOpen && (
                <div className={`ml-4 mt-1 mb-2 border-l-2 pl-4 space-y-1 ${
                  isTransparent ? 'border-white/20' : 'border-border'
                }`}>
                  {productTypes.length > 0 && (
                    <>
                      <p className={`text-xs font-semibold uppercase tracking-widest px-2 pt-2 pb-1 ${
                        isTransparent ? 'text-white/50' : 'text-foreground-muted'
                      }`}>
                        {t('navigation.shopByCategory')}
                      </p>
                      {productTypes.map((type) => (
                        <Link
                          key={type.canonical}
                          href={categoryHref(type.canonical)}
                          onClick={closeMobileMenu}
                          className={`block px-2 py-2 text-sm rounded-lg transition-colors ${
                            isTransparent
                              ? 'text-white/80 hover:text-white hover:bg-white/10'
                              : 'text-foreground-light hover:text-primary-dark'
                          }`}
                        >
                          {type.label}
                        </Link>
                      ))}
                    </>
                  )}

                  <p className={`text-xs font-semibold uppercase tracking-widest px-2 pt-3 pb-1 ${
                    isTransparent ? 'text-white/50' : 'text-foreground-muted'
                  }`}>
                    {t('navigation.shopByCollection')}
                  </p>
                  {collections.map((col) => (
                    <Link
                      key={col.handle}
                      href={`/${locale}/collections/${col.handle}`}
                      onClick={closeMobileMenu}
                      className={`block px-2 py-2 text-sm rounded-lg transition-colors ${
                        isTransparent
                          ? 'text-white/80 hover:text-white hover:bg-white/10'
                          : 'text-foreground-light hover:text-primary-dark'
                      }`}
                    >
                      {col.title}
                    </Link>
                  ))}

                  <Link
                    href={shopHref}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-2 px-2 py-2 text-sm font-semibold hover:underline ${
                      isTransparent ? 'text-white' : 'text-primary'
                    }`}
                  >
                    {t('navigation.viewAll')} <PiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Other links */}
            {otherLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`flex items-center px-4 py-3 font-medium transition-all duration-200 rounded-xl ${
                  isTransparent
                    ? isActive(link.href) ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                    : isActive(link.href) ? 'text-primary bg-background/70' : 'text-foreground-light hover:text-primary-dark hover:bg-background/70'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Sale link */}
            {hasSaleItems && (
              <Link
                href={`/${locale}/shop?onSale=true`}
                rel="nofollow"
                onClick={closeMobileMenu}
                className={`flex items-center gap-2 px-4 py-3 font-medium tracking-wide transition-all duration-200 rounded-xl ${
                  isTransparent
                    ? 'text-red-300 hover:text-red-200 hover:bg-white/10'
                    : 'text-red-500 hover:bg-red-50'
                }`}
              >
                <PiSealPercent className="w-4 h-4" />
                {t('navigation.sale')}
              </Link>
            )}

            {/* Mobile action row */}
            <div className="flex gap-3 px-4 pt-3">
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
