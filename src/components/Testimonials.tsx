'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cormorantGaramond } from '@/lib/fonts';

const TestimonialCard = ({
  testimonial,
  t,
}: {
  testimonial: { name: string; review: string; rating: number };
  t: (key: string) => string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 200;
  const needsTruncation = testimonial.review.length > characterLimit;
  const displayText =
    needsTruncation && !isExpanded
      ? `${testimonial.review.slice(0, characterLimit)}...`
      : testimonial.review;

  const initial = [...(testimonial.name.trim() || '?')][0] ?? '?';

  return (
    <div className="flex flex-col h-full bg-surface p-6 rounded-2xl border border-border/50 shadow-theme hover:shadow-theme-lg hover:border-border transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 ring-1 ring-primary/15">
          <span className="text-primary font-semibold text-sm">{initial}</span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-foreground truncate block">{testimonial.name}</span>
          <div className="text-primary text-sm tracking-tight mt-0.5">{'★'.repeat(testimonial.rating)}</div>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-foreground-light text-sm leading-relaxed">&ldquo;{displayText}&rdquo;</p>
        {needsTruncation && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-primary-dark hover:text-primary text-sm font-semibold transition-colors"
          >
            {isExpanded ? t('readLess') : t('readMore')}
          </button>
        )}
      </div>
    </div>
  );
};

interface TestimonialsProps {
  isHomePage?: boolean;
}

export default function Testimonials({ isHomePage = false }: TestimonialsProps) {
  const t = useTranslations('testimonials');
  const [showAll, setShowAll] = useState(false);

  const testimonials = [
    { name: t('r1name'), review: t('r1text'), rating: 5 },
    { name: t('r2name'), review: t('r2text'), rating: 5 },
    { name: t('r3name'), review: t('r3text'), rating: 5 },
    { name: t('r4name'), review: t('r4text'), rating: 5 },
    { name: t('r5name'), review: t('r5text'), rating: 5 },
    { name: t('r6name'), review: t('r6text'), rating: 5 },
  ];

  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 6);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isHomePage && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2
              className={`text-3xl sm:text-4xl font-bold text-foreground mb-3 ${cormorantGaramond.className}`}
            >
              {t('title')}
            </h2>
            <p className="text-foreground-light text-lg">{t('subtitle')}</p>
            <div className="flex items-center justify-center gap-2 mt-6 text-foreground-light text-sm">
              <span className="text-primary text-lg leading-none">★★★★★</span>
              <span>{t('googleRating')}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {visibleTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} t={t} />
          ))}
        </div>

        {testimonials.length > 6 && (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-base bg-gradient-to-r from-primary to-primary-dark text-white hover:opacity-90 transition-all duration-300 hover:shadow-theme-lg"
            >
              {showAll ? t('showLess') : t('seeMore')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
