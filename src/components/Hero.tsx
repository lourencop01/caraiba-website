'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { PiArrowRight } from 'react-icons/pi';
import { cormorantGaramond } from '@/lib/fonts';

export default function Hero() {
  const t = useTranslations('hero');
  const params = useParams();
  const locale = params.locale as string;

  // const trustItems = [
  //   { icon: <PiTruck className="w-4 h-4" />, label: t('trust1') },
  //   { icon: <PiShieldCheck className="w-4 h-4" />, label: t('trust2') },
  //   { icon: <PiStar className="w-4 h-4" />, label: t('trust3') },
  // ];

  return (
    <section className="relative bg-surface overflow-hidden -mt-16 min-h-[100vh]">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-surface-dark opacity-60 pointer-events-none" />

      {/* Full-bleed background image (all screen sizes) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pexels-2.webp"
          alt={t('backgroundAlt')}
          fill
          className="object-cover object-[40%_45%] scale-x-[-1]"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center min-h-[100vh] py-16">

          {/* Content */}
          <div className="flex flex-col items-center text-center gap-5 w-full">
            <div className="flex flex-col">
              <h1
                className={`text-5xl sm:text-6xl lg:text-8xl font-bold text-surface leading-tight mb-3 ${cormorantGaramond.className} drop-shadow-lg`}
              >
                {t('title')}
              </h1>

              {/* <h2 className="text-surface text-xl drop-shadow-md">
                {t('subtitle')}
              </h2> */}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 w-auto">
              <Link
                href={`/${locale}/shop`}
                className="flex gap-2 border-2 border-border text-surface-dark px-16 py-4 rounded-full font-semibold text-base hover:opacity-90 hover:shadow-theme-lg transition-all duration-300 group"
              >
                {t('shopNow')}
                <PiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
