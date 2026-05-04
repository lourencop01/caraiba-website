import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { PiArrowRight } from 'react-icons/pi';

interface PromoBannerProps {
  locale: string;
}

export default async function PromoBanner({ locale }: PromoBannerProps) {
  const t = await getTranslations('promoBanner');

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl min-h-[420px] flex flex-col lg:flex-row">
          {/* Image side */}
          <div className="relative lg:w-1/2 min-h-[280px] lg:min-h-0 flex-shrink-0">
            <Image
              src="/women-blonde-coloring.webp"
              alt="Promotional collection"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40 lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
          </div>

          {/* Content side */}
          <div className="lg:w-1/2 bg-foreground flex flex-col justify-center px-8 sm:px-12 py-12 lg:py-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 inline-block">
              {t('eyebrow')}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-background leading-tight mb-5"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              {t('title')}
            </h2>
            <p className="text-background/70 text-lg leading-relaxed mb-8 max-w-md">
              {t('subtitle')}
            </p>
            <Link
              href={`/${locale}/shop`}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-theme-lg group w-fit"
            >
              {t('cta')}
              <PiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
