'use client'
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function ReturnPolicyContent() {
  const t = useTranslations('returnPolicy');
  const tCommon = useTranslations();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-foreground-light mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="hover:text-primary-dark transition-colors" aria-label="Home">
                    {tCommon('navigation.home')}
                  </Link>
                </li>
                <li className="text-foreground-muted">/</li>
                <li className="text-foreground" aria-current="page">
                  {t('title')}
                </li>
              </ol>
            </nav>
            <h1 className="text-4xl font-bold text-foreground mb-4">{t('title')}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none space-y-10">

            <p className="text-foreground-light text-lg leading-relaxed">{t('intro')}</p>

            {/* Purchases */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('purchases.title')}</h2>
              <div className="bg-surface border border-border rounded-lg p-6 space-y-3">
                <p className="text-foreground-light">{t('purchases.content1')}</p>
                <p className="text-foreground-light">{t('purchases.content2')}</p>
              </div>
            </section>

            {/* Exchanges */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('exchanges.title')}</h2>
              <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
                <p className="text-foreground-light">{t('exchanges.intro')}</p>
                <div>
                  <p className="text-foreground font-medium mb-2">{t('exchanges.conditionsTitle')}</p>
                  <ul className="space-y-2">
                    {(t.raw('exchanges.conditions') as string[]).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-foreground-light">
                        <span className="text-primary mt-0.5">✔</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-foreground-light border-t border-border pt-4 flex items-start gap-2">
                  <span>⚠</span>
                  <span>{t('exchanges.note')}</span>
                </p>
              </div>
            </section>

            {/* Returns */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('returns.title')}</h2>
              <div className="bg-surface border border-border rounded-lg p-6 space-y-3">
                <p className="text-foreground-light">{t('returns.content1')}</p>
                <p className="text-foreground-light">{t('returns.content2')}</p>
                <p className="text-foreground-light">{t('returns.content3')}</p>
              </div>
            </section>

            {/* Defective Items */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('defects.title')}</h2>
              <div className="bg-surface border border-border rounded-lg p-6 space-y-3">
                <p className="text-foreground-light">{t('defects.content1')}</p>
                <p className="text-foreground-light">{t('defects.content2')}</p>
              </div>
            </section>

            {/* Shipping Costs */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('shippingCosts.title')}</h2>
              <div className="bg-surface border border-border rounded-lg p-6">
                <ul className="space-y-3">
                  {(t.raw('shippingCosts.items') as string[]).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-foreground-light">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('contact.title')}</h2>
              <div className="bg-surface border border-border rounded-lg p-6 space-y-2">
                <p className="text-foreground-light">{t('contact.description')}</p>
                <p className="text-foreground font-medium">{t('contact.email')}</p>
                <p className="text-foreground font-medium">{t('contact.whatsapp')}</p>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
