'use client';

import GoogleMaps from './GoogleMaps';
import { useTranslations } from 'next-intl';
import { trackGenerateLead } from '../lib/analytics';
import { cormorantGaramond } from '@/lib/fonts';
import { PiMapPin, PiPhone, PiEnvelopeSimple, PiClock } from 'react-icons/pi';

interface ContactProps {
  isHomePage?: boolean;
}

export default function Contact({ isHomePage = false }: ContactProps) {
  const t = useTranslations('contact');
  const telHref = `tel:${t('phoneValue').replace(/\s/g, '')}`;

  const rows = [
    {
      icon: <PiMapPin className="h-5 w-5" aria-hidden />,
      title: t('address'),
      body: <p className="whitespace-pre-line text-foreground-light leading-relaxed">{t('addressValue')}</p>,
    },
    {
      icon: <PiPhone className="h-5 w-5" aria-hidden />,
      title: t('phone'),
      body: (
        <a
          href={telHref}
          onClick={() => trackGenerateLead('contact_phone')}
          className="text-foreground-light transition-colors hover:text-primary-dark"
        >
          {t('phoneValue')}
        </a>
      ),
    },
    {
      icon: <PiEnvelopeSimple className="h-5 w-5" aria-hidden />,
      title: t('email'),
      body: (
        <a
          href={`mailto:${t('emailValue')}`}
          className="text-foreground-light transition-colors hover:text-primary-dark"
        >
          {t('emailValue')}
        </a>
      ),
    },
    {
      icon: <PiClock className="h-5 w-5" aria-hidden />,
      title: t('hours'),
      body: <div className="whitespace-pre-line text-foreground-light leading-relaxed">{t('hoursValue')}</div>,
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            {isHomePage && (
              <header className="max-w-xl">
                <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-primary">
                  {t('heroEyebrow')}
                </span>
                <h2 className={`text-3xl font-bold leading-tight text-foreground sm:text-4xl ${cormorantGaramond.className}`}>
                  {t('title')}
                </h2>
                <p className="mt-3 text-lg font-medium text-foreground-light">{t('subtitle')}</p>
              </header>
            )}

            <div className="rounded-2xl border border-border/50 bg-background p-6 shadow-theme sm:p-8">
              <ul className="divide-y divide-border/60">
                {rows.map(({ icon, title, body }, i) => (
                  <li key={i} className="flex gap-4 py-6 first:pt-0 last:pb-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {icon}
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">{title}</h3>
                      <div className="mt-1.5 text-sm">{body}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="min-h-[min(420px,70vh)] lg:min-h-[28rem]">
            <GoogleMaps />
          </div>
        </div>
      </div>
    </section>
  );
}
