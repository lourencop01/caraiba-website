'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { PiArrowRight, PiShieldCheck, PiTruck, PiStar } from 'react-icons/pi';
import { cormorantGaramond } from '@/lib/fonts';

export default function Hero() {
  const t = useTranslations('hero');
  const params = useParams();
  const locale = params.locale as string;

  const trustItems = [
    { icon: <PiTruck className="w-4 h-4" />, label: t('trust1') },
    { icon: <PiShieldCheck className="w-4 h-4" />, label: t('trust2') },
    { icon: <PiStar className="w-4 h-4" />, label: t('trust3') },
  ];

  return (
    <section className="relative bg-surface overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-surface-dark opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[90vh] py-16 lg:py-0">

          {/* ── Left: Content ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="inline-block text-primary-dark text-sm font-semibold uppercase tracking-widest mb-4 px-3 py-1 bg-primary/10 rounded-full">
              {t('eyebrow')}
            </span>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-3 ${cormorantGaramond.className}`}
            >
              {t('title')}
            </h1>

            <p className="text-lg sm:text-lg text-foreground-light max-w-lg mb-8">
              {t('subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
              <Link
                href={`/${locale}/shop`}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 hover:shadow-theme-lg transition-all duration-300 group"
              >
                {t('shopNow')}
                <PiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={`/${locale}/collections`}
                className="flex items-center justify-center gap-2 border-2 border-border text-foreground px-8 py-4 rounded-full font-semibold text-base hover:border-primary hover:text-primary-dark transition-all duration-300"
              >
                {t('exploreCollections')}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-foreground-light">
                  <span className="text-primary">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Image ── */}
          <div className="relative flex items-center justify-center">
            {/* Decorative ring */}
            <div className="absolute w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] rounded-full border border-border/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute w-[340px] h-[340px] sm:w-[430px] sm:h-[430px] rounded-full border border-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* Main image container */}
            <div className="relative w-[300px] h-[400px] sm:w-[380px] sm:h-[500px] rounded-[2.5rem] overflow-hidden shadow-theme-lg border border-border/30">
              <Image
                src="/pexels-2.jpg"
                alt="Professional hair care products"
                fill
                className="object-cover object-[40%_30%] scale-x-[-1]"
                loading="eager"
                fetchPriority="high"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-8 -left-4 sm:left-4 bg-surface border border-border rounded-2xl px-4 py-3 shadow-theme-lg flex items-center gap-3">
              <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <PiStar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-foreground-light leading-none mb-0.5">Google Reviews</p>
                <p className="text-sm font-bold text-foreground">4.9 / 5.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
