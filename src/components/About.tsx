'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { cormorantGaramond } from '@/lib/fonts';
import {
  PiLeaf,
  PiCertificate,
  PiHeart,
  PiArrowRight,
} from 'react-icons/pi';

interface AboutProps {
  isHomePage?: boolean;
}

export default function About({ isHomePage = false }: AboutProps) {
  const t = useTranslations('about');
  const params = useParams();
  const locale = params.locale as string;

  const values = [
    {
      icon: <PiCertificate className="w-6 h-6" />,
      title: t('value1Title'),
      desc: t('value1Desc'),
    },
    {
      icon: <PiLeaf className="w-6 h-6" />,
      title: t('value2Title'),
      desc: t('value2Desc'),
    },
    {
      icon: <PiHeart className="w-6 h-6" />,
      title: t('value3Title'),
      desc: t('value3Desc'),
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Image side ── */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-theme-lg">
              <Image
                src="/4.jpg"
                alt="Brand story"
                fill
                className="object-cover object-[40%_20%]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 sm:right-4 bg-surface border border-border rounded-2xl px-5 py-4 shadow-theme-lg">
              <p className={`text-3xl font-bold text-foreground ${cormorantGaramond.className}`}>
                {t('statValue')}
              </p>
              <p className="text-sm text-foreground-light mt-0.5">{t('statLabel')}</p>
            </div>
          </div>

          {/* ── Content side ── */}
          <div className="order-1 lg:order-2 flex flex-col gap-6">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              {t('eyebrow')}
            </span>

            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight ${cormorantGaramond.className}`}
            >
              {t('title')}
            </h2>

            <p className="text-foreground-light text-lg leading-relaxed">
              {t('story')}
            </p>

            {/* Values */}
            <div className="grid sm:grid-cols-3 gap-4 mt-2">
              {values.map((v, i) => (
                <div key={i} className="flex flex-col gap-2 p-4 rounded-2xl bg-surface border border-border/50">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    {v.icon}
                  </div>
                  <p className="font-semibold text-foreground text-sm">{v.title}</p>
                  <p className="text-foreground-light text-xs leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

            {isHomePage && (
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all group w-fit mt-2"
              >
                {t('cta')}
                <PiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
