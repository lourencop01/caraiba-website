import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import {
  PiLeaf,
  PiCertificate,
  PiHeart,
  PiArrowRight,
  PiStar,
  PiUsers,
  PiPackage,
} from 'react-icons/pi';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.about.meta' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('ogTitle'), description: t('ogDescription') },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const values = [
    {
      icon: <PiCertificate className="w-7 h-7" />,
      title: t('value1Title'),
      desc: t('value1DescFull'),
    },
    {
      icon: <PiLeaf className="w-7 h-7" />,
      title: t('value2Title'),
      desc: t('value2DescFull'),
    },
    {
      icon: <PiHeart className="w-7 h-7" />,
      title: t('value3Title'),
      desc: t('value3DescFull'),
    },
  ];

  const stats = [
    { icon: <PiUsers className="w-6 h-6" />, value: t('stat1Value'), label: t('stat1Label') },
    { icon: <PiPackage className="w-6 h-6" />, value: t('stat2Value'), label: t('stat2Label') },
    { icon: <PiStar className="w-6 h-6" />, value: t('stat3Value'), label: t('stat3Label') },
  ];

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative bg-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/valentina_background.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">
            {t('eyebrow')}
          </span>
          <h1
            className="text-4xl sm:text-6xl font-bold text-background leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            {t('heroTitle')}
          </h1>
          <p className="text-background/60 text-lg sm:text-xl mt-6 max-w-xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* ── Mission Statement ── */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 block">
            {t('missionEyebrow')}
          </span>
          <blockquote
            className="text-3xl sm:text-4xl font-bold text-foreground leading-snug"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            &ldquo;{t('mission')}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-theme-lg">
              <Image
                src="/female-hairdresser-italian.png"
                alt="Our story"
                fill
                className="object-cover object-[50%_10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-6">
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">
                {t('storyEyebrow')}
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground leading-tight"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                {t('storyTitle')}
              </h2>
              <p className="text-foreground-light text-lg leading-relaxed">
                {t('storyParagraph1')}
              </p>
              <p className="text-foreground-light text-lg leading-relaxed">
                {t('storyParagraph2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  {s.icon}
                </div>
                <p
                  className="text-4xl font-bold text-background"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  {s.value}
                </p>
                <p className="text-background/60 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-3 block">
              {t('valuesEyebrow')}
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              {t('valuesTitle')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 p-8 bg-background rounded-3xl border border-border/50 hover:shadow-theme-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">{v.title}</h3>
                <p className="text-foreground-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            {t('ctaTitle')}
          </h2>
          <p className="text-foreground-light text-lg mb-8 max-w-lg mx-auto">
            {t('ctaSubtitle')}
          </p>
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 hover:shadow-theme-lg transition-all duration-300 group"
          >
            {t('ctaButton')}
            <PiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

    </main>
  );
}
