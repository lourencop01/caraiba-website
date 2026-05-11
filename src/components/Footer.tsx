'use client'
// import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useCookieConsent } from '@/contexts/CookieConsentContext'
import { Link } from '@/i18n/routing'
import {
  AiFillInstagram,
  AiFillPhone,
} from 'react-icons/ai'
import { IoLogoWhatsapp } from 'react-icons/io'
import { trackGenerateLead } from '../lib/analytics'
import { cormorantGaramond } from '@/lib/fonts'

export default function Footer() {
  const t = useTranslations()
  const { showModal } = useCookieConsent()

  return (
    <footer className="bg-foreground text-background">
      {/* Main multi-column section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Col 1: Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-secondary">
                {/* <Image
                  src="/logo.jpeg"
                  alt={t('site.name')}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                /> */}
              </div>
              <span
                className={`text-xl font-medium text-background uppercase ${cormorantGaramond.className}`}
              >
                {t('site.name')}
                <sup className="text-sm font-bold ml-px" aria-hidden>
                  ®
                </sup>
              </span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-6 max-w-xs">
              {t('site.tagline')}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/caraiba_biquinis"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <AiFillInstagram className="w-4 h-4 text-background" />
              </a>
              <a
                href="https://wa.me/961725650"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                onClick={() => trackGenerateLead('footer_whatsapp')}
                className="w-9 h-9 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <IoLogoWhatsapp className="w-4 h-4 text-background" />
              </a>
              <a
                href="tel:+351961725650"
                aria-label="Phone"
                onClick={() => trackGenerateLead('footer_phone')}
                className="w-9 h-9 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
              >
                <AiFillPhone className="w-4 h-4 text-background" />
              </a>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div>
            <h3 className="text-background font-semibold text-sm uppercase tracking-wider mb-4">
              {t('footer.shopTitle')}
            </h3>
            <ul className="space-y-3 text-sm text-background/60">
              <li>
                <Link href="/shop" className="hover:text-primary-light transition-colors">
                  {t('footer.shopAll')}
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-primary-light transition-colors">
                  {t('footer.collections')}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-primary-light transition-colors">
                  {t('footer.newArrivals')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h3 className="text-background font-semibold text-sm uppercase tracking-wider mb-4">
              {t('footer.companyTitle')}
            </h3>
            <ul className="space-y-3 text-sm text-background/60">
              <li>
                <Link href="/about" className="hover:text-primary-light transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-light transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div>
            <h3 className="text-background font-semibold text-sm uppercase tracking-wider mb-4">
              {t('footer.supportTitle')}
            </h3>
            <ul className="space-y-3 text-sm text-background/60">
              <li>
                <Link href="/return-policy" className="hover:text-primary-light transition-colors">
                  {t('footer.shipping')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-light transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/60">
            <p>{t('footer.copyright')}</p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={showModal}
                className="hover:text-primary-light transition-colors underline"
                aria-label={t('cookies.footer.manageCookies')}
              >
                {t('cookies.footer.manageCookies')}
              </button>
              <Link href="/privacy-policy" className="hover:text-primary-light transition-colors underline">
                {t('cookies.footer.privacyPolicy')}
              </Link>
              <Link href="/cookie-policy" className="hover:text-primary-light transition-colors underline">
                {t('cookies.footer.cookiePolicy')}
              </Link>
              <Link href="/terms-conditions" className="hover:text-primary-light transition-colors underline">
                {t('cookies.footer.termsConditions')}
              </Link>
              <Link href="/impressum" className="hover:text-primary-light transition-colors underline">
                {t('cookies.footer.impressum')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
