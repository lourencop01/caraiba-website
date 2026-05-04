'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import { trackGenerateLead } from '@/lib/analytics';
import { PiPhone, PiCaretDown, PiArrowRight } from 'react-icons/pi';
import { IoLogoWhatsapp } from 'react-icons/io';
import CartIcon from './shop/CartIcon';
import type { NavShopData } from './NavbarWrapper';

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
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = useTranslations();

  const { collections, productTypes } = shopData;

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

  return (
    <nav className="bg-background/95 backdrop-blur-sm shadow-theme sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-6">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0" onClick={closeMobileMenu}>
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/valentina-hair-concept.jpg"
                alt={t('navigation.logoAlt')}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="block lg:hidden xl:block text-lg lg:text-xl text-foreground font-medium"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              {t('site.name')}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">

            {/* Home */}
            <Link
              href={`/${locale}`}
              className={`font-medium transition-colors text-sm ${
                isActive(`/${locale}`) ? 'text-primary' : 'text-foreground-light hover:text-primary'
              }`}
            >
              {t('navigation.home')}
            </Link>

            {/* Shop — with mega dropdown */}
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button
                onClick={() => setIsShopDropdownOpen((v) => !v)}
                aria-expanded={isShopDropdownOpen}
                className={`flex items-center gap-1 font-medium transition-colors text-sm focus:outline-none ${
                  isShopActive ? 'text-primary' : 'text-foreground-light hover:text-primary'
                }`}
              >
                {t('navigation.shop')}
                <PiCaretDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isShopDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown panel */}
              {isShopDropdownOpen && (
                <div
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[480px] bg-background border border-border rounded-2xl shadow-theme-lg overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-0">

                    {/* ── Shop by Category ── */}
                    {productTypes.length > 0 && (
                      <div className="p-5">
                        <p className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-3">
                          {t('navigation.shopByCategory')}
                        </p>
                        <ul className="space-y-1">
                          {productTypes.map((type) => (
                            <li key={type.canonical}>
                              <Link
                                href={categoryHref(type.canonical)}
                                onClick={() => setIsShopDropdownOpen(false)}
                                className="block text-sm text-foreground-light hover:text-primary hover:bg-surface px-2 py-1.5 rounded-lg transition-colors"
                              >
                                {type.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* ── Shop by Collection ── */}
                    <div className={`p-5 ${productTypes.length === 0 ? 'col-span-2' : ''}`}>
                      <p className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-3">
                        {t('navigation.shopByCollection')}
                      </p>
                      <ul className="space-y-1">
                        {collections.map((col) => (
                          <li key={col.handle}>
                            <Link
                              href={`/${locale}/collections/${col.handle}`}
                              onClick={() => setIsShopDropdownOpen(false)}
                              className="block text-sm text-foreground-light hover:text-primary hover:bg-surface px-2 py-1.5 rounded-lg transition-colors"
                            >
                              {col.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* View All */}
                  <div className="border-t border-border px-5 py-3 bg-surface">
                    <Link
                      href={shopHref}
                      onClick={() => setIsShopDropdownOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
                    >
                      {t('navigation.viewAll')}
                      <PiArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Other links */}
            {otherLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors text-sm ${
                  isActive(link.href) ? 'text-primary' : 'text-foreground-light hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <CartIcon />
            <LanguageSwitcher />

            <a
              href="tel:+351915662413"
              title={t('accessibility.callSalon')}
              aria-label={t('accessibility.callSalon')}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white hover:opacity-90 transition-opacity"
              onClick={() => trackGenerateLead('navbar_desktop')}
            >
              <PiPhone className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/915662413"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              aria-label="Contact via WhatsApp"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity"
              onClick={() => trackGenerateLead('navbar_desktop_whatsapp')}
            >
              <IoLogoWhatsapp className="w-4 h-4" />
            </a>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t('accessibility.toggleMobileMenu')}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`w-full h-0.5 bg-foreground-light transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <div className={`w-full h-0.5 bg-foreground-light transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-full h-0.5 bg-foreground-light transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
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
        <div className="bg-surface/95 backdrop-blur-sm border-t border-border shadow-theme-lg">
          <div className="container mx-auto px-6 py-4 space-y-1">

            {/* Home */}
            <Link
              href={`/${locale}`}
              onClick={closeMobileMenu}
              className={`flex items-center px-4 py-3 font-medium transition-all duration-200 rounded-xl ${
                isActive(`/${locale}`) ? 'text-primary bg-background/70' : 'text-foreground-light hover:text-primary hover:bg-background/70'
              }`}
            >
              {t('navigation.home')}
            </Link>

            {/* Shop — expandable */}
            <div>
              <button
                onClick={() => setIsMobileShopOpen((v) => !v)}
                className={`flex items-center justify-between w-full px-4 py-3 font-medium transition-all duration-200 rounded-xl ${
                  isShopActive ? 'text-primary bg-background/70' : 'text-foreground-light hover:text-primary hover:bg-background/70'
                }`}
              >
                <span>{t('navigation.shop')}</span>
                <PiCaretDown className={`w-4 h-4 transition-transform duration-200 ${isMobileShopOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMobileShopOpen && (
                <div className="ml-4 mt-1 mb-2 border-l-2 border-border pl-4 space-y-1">
                  {productTypes.length > 0 && (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-widest text-foreground-muted px-2 pt-2 pb-1">
                        {t('navigation.shopByCategory')}
                      </p>
                      {productTypes.map((type) => (
                        <Link
                          key={type.canonical}
                          href={categoryHref(type.canonical)}
                          onClick={closeMobileMenu}
                          className="block px-2 py-2 text-sm text-foreground-light hover:text-primary rounded-lg transition-colors"
                        >
                          {type.label}
                        </Link>
                      ))}
                    </>
                  )}

                  <p className="text-xs font-semibold uppercase tracking-widest text-foreground-muted px-2 pt-3 pb-1">
                    {t('navigation.shopByCollection')}
                  </p>
                  {collections.map((col) => (
                    <Link
                      key={col.handle}
                      href={`/${locale}/collections/${col.handle}`}
                      onClick={closeMobileMenu}
                      className="block px-2 py-2 text-sm text-foreground-light hover:text-primary rounded-lg transition-colors"
                    >
                      {col.title}
                    </Link>
                  ))}

                  <Link
                    href={shopHref}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 px-2 py-2 text-sm font-semibold text-primary hover:underline"
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
                  isActive(link.href) ? 'text-primary bg-background/70' : 'text-foreground-light hover:text-primary hover:bg-background/70'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile action row */}
            <div className="flex gap-3 px-4 pt-3">
              <a
                href="tel:+351915662413"
                title={t('accessibility.callSalon')}
                aria-label={t('accessibility.callSalon')}
                className="flex items-center justify-center gap-2 flex-1 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-medium text-sm"
                onClick={() => { trackGenerateLead('navbar_mobile'); closeMobileMenu(); }}
              >
                <PiPhone className="w-4 h-4" />
                {t('navigation.bookNow')}
              </a>
              <a
                href="https://wa.me/915662413"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                aria-label="Contact via WhatsApp"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white"
                onClick={() => { trackGenerateLead('navbar_mobile_whatsapp'); closeMobileMenu(); }}
              >
                <Image src="/whatsapp.webp" alt="WhatsApp" width={22} height={22} className="w-[22px] h-[22px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
