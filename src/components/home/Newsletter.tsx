'use client'
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PiCheckCircle, PiEnvelopeSimple } from 'react-icons/pi';

export default function Newsletter() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate a brief delay — connect to your email provider here
    await new Promise((res) => setTimeout(res, 600));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-6">
            <PiEnvelopeSimple className="w-6 h-6 text-primary" />
          </div>

          <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-3 block">
            {t('eyebrow')}
          </span>

          <h2
            className="text-3xl sm:text-4xl font-bold text-background leading-tight mb-4"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            {t('title')}
          </h2>

          <p className="text-background/70 text-lg mb-8">
            {t('subtitle')}
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 text-background">
              <PiCheckCircle className="w-6 h-6 text-primary" />
              <span className="text-lg font-medium">{t('success')}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')}
                required
                className="flex-1 px-5 py-4 rounded-full bg-background/10 border border-background/20 text-background placeholder-background/40 focus:outline-none focus:border-primary transition-colors text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 hover:shadow-theme-lg disabled:opacity-60 whitespace-nowrap text-sm"
              >
                {loading ? '...' : t('button')}
              </button>
            </form>
          )}

          <p className="text-background/40 text-xs mt-4">{t('disclaimer')}</p>
        </div>
      </div>
    </section>
  );
}
