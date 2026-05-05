'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function TermsConditionsContent() {
  const t = useTranslations('terms');
  const tCommon = useTranslations();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-foreground-light mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link 
                    href="/" 
                    className="hover:text-primary-dark transition-colors"
                    aria-label="Home"
                  >
                    {tCommon('navigation.home')}
                  </Link>
                </li>
                <li className="text-foreground-muted">/</li>
                <li className="text-foreground" aria-current="page">
                  {t('title')}
                </li>
              </ol>
            </nav>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('title')}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-foreground-light">
              <time dateTime="2024-01-01">
                {t('lastUpdated')}
              </time>
              <span className="hidden sm:block">•</span>
              <time dateTime="2024-01-01">
                {t('effective')}
              </time>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            
            {/* Table of Contents */}
            <nav className="bg-surface border border-border rounded-lg p-6 mb-8" aria-labelledby="toc-heading">
              <h2 id="toc-heading" className="text-xl font-semibold text-foreground mb-4">
                Table of Contents
              </h2>
              <ol className="space-y-2 text-sm">
                <li><a href="#acceptance" className="text-primary hover:underline">{t('acceptance.title')}</a></li>
                <li><a href="#services" className="text-primary hover:underline">{t('services.title')}</a></li>
                <li><a href="#user-obligations" className="text-primary hover:underline">{t('userObligations.title')}</a></li>
                <li><a href="#intellectual-property" className="text-primary hover:underline">{t('intellectualProperty.title')}</a></li>
                <li><a href="#content-liability" className="text-primary hover:underline">{t('contentLiability.title')}</a></li>
                <li><a href="#third-party-services" className="text-primary hover:underline">{t('thirdPartyServices.title')}</a></li>
                <li><a href="#promotions" className="text-primary hover:underline">{t('promotions.title')}</a></li>
                <li><a href="#gift-cards" className="text-primary hover:underline">{t('giftCards.title')}</a></li>
                <li><a href="#referrals" className="text-primary hover:underline">{t('referrals.title')}</a></li>
                <li><a href="#limitation-liability" className="text-primary hover:underline">{t('limitationLiability.title')}</a></li>
                <li><a href="#indemnification" className="text-primary hover:underline">{t('indemnification.title')}</a></li>
                <li><a href="#termination" className="text-primary hover:underline">{t('termination.title')}</a></li>
                <li><a href="#governing-law" className="text-primary hover:underline">{t('governingLaw.title')}</a></li>
                <li><a href="#changes" className="text-primary hover:underline">{t('changes.title')}</a></li>
                <li><a href="#contact" className="text-primary hover:underline">{t('contact.title')}</a></li>
              </ol>
            </nav>

            {/* Acceptance of Terms */}
            <section id="acceptance" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('acceptance.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('acceptance.content')}
              </p>
              <p className="text-foreground-light leading-relaxed">
                {t('acceptance.agreement')}
              </p>
            </section>

            {/* Description of Services */}
            <section id="services" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('services.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('services.description')}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('services.website.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('services.website.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('services.blog.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('services.blog.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('services.contact.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('services.contact.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('services.promotions.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('services.promotions.content')}
                  </p>
                </div>
              </div>
            </section>

            {/* User Obligations */}
            <section id="user-obligations" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('userObligations.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('userObligations.description')}
              </p>

              <div className="space-y-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('userObligations.contactForms.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('userObligations.contactForms.rules').map((rule: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('userObligations.prohibited.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('userObligations.prohibited.activities').map((activity: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-foreground font-medium">
                    {t('userObligations.consequences')}
                  </p>
                </div>
              </div>
            </section>

            {/* Intellectual Property Rights */}
            <section id="intellectual-property" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('intellectualProperty.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('intellectualProperty.description')}
              </p>

              <div className="space-y-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('intellectualProperty.owned.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('intellectualProperty.owned.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('intellectualProperty.restrictions.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('intellectualProperty.restrictions.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-foreground text-sm">
                    <strong>{t('intellectualProperty.note')}</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Content and Blog Disclaimer */}
            <section id="content-liability" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('contentLiability.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('contentLiability.description')}
              </p>

              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('contentLiability.blog.title')}
                  </h3>
                  <p className="text-foreground-light text-sm mb-3">
                    {t('contentLiability.blog.disclaimer')}
                  </p>
                  <ul className="space-y-2 text-foreground-light text-sm">
                    {t.raw('contentLiability.blog.limitations').map((limitation: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('contentLiability.professional.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('contentLiability.professional.advice')}
                  </p>
                </div>
              </div>
            </section>

            {/* Third-Party Services */}
            <section id="third-party-services" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('thirdPartyServices.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('thirdPartyServices.description')}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('thirdPartyServices.analytics.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('thirdPartyServices.analytics.description')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('thirdPartyServices.email.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('thirdPartyServices.email.description')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('thirdPartyServices.cookies.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('thirdPartyServices.cookies.description')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('thirdPartyServices.hosting.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('thirdPartyServices.hosting.description')}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg p-4 mt-6">
                <p className="text-foreground text-sm">
                  <strong>{t('thirdPartyServices.disclaimer')}</strong>
                </p>
              </div>
            </section>

            {/* Promotions and Offers */}
            <section id="promotions" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('promotions.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('promotions.description')}
              </p>

              <div className="space-y-4">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('promotions.terms.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('promotions.terms.conditions').map((condition: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <p className="text-foreground text-sm">
                    <strong>{t('promotions.modification')}</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Gift Cards */}
            <section id="gift-cards" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('giftCards.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('giftCards.description')}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('giftCards.validity.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('giftCards.validity.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('giftCards.redemption.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('giftCards.redemption.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('giftCards.transfer.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('giftCards.transfer.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('giftCards.refund.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('giftCards.refund.content')}
                  </p>
                </div>
              </div>
            </section>

            {/* Client Referrals */}
            <section id="referrals" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('referrals.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('referrals.description')}
              </p>

              <div className="space-y-4">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('referrals.program.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('referrals.program.rules').map((rule: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-foreground text-sm">
                    <strong>{t('referrals.note')}</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section id="limitation-liability" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('limitationLiability.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('limitationLiability.description')}
              </p>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-3">
                  {t('limitationLiability.exclusions.title')}
                </h3>
                <ul className="space-y-2 text-foreground-light">
                  {t.raw('limitationLiability.exclusions.items').map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">⚠</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Indemnification */}
            <section id="indemnification" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('indemnification.title')}
              </h2>
              <p className="text-foreground-light leading-relaxed">
                {t('indemnification.content')}
              </p>
            </section>

            {/* Termination */}
            <section id="termination" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('termination.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('termination.description')}
              </p>
              <p className="text-foreground-light leading-relaxed">
                {t('termination.effect')}
              </p>
            </section>

            {/* Governing Law */}
            <section id="governing-law" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('governingLaw.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('governingLaw.content')}
              </p>
              <p className="text-foreground-light leading-relaxed">
                {t('governingLaw.jurisdiction')}
              </p>
            </section>

            {/* Changes to Terms */}
            <section id="changes" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('changes.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('changes.content')}
              </p>
              <p className="text-foreground-light leading-relaxed">
                {t('changes.notification')}
              </p>
            </section>

            {/* Contact Information */}
            <section id="contact" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('contact.content')}
              </p>

              <div className="bg-surface border border-border rounded-lg p-6 space-y-2">
                <p className="text-foreground-light">
                  <strong>Salon Concept</strong>
                </p>
                <p className="text-foreground-light">
                  <a href="mailto:salonconcept@gmail.com" className="text-primary hover:underline">{t('contact.email')}</a>
                </p>
                <p className="text-foreground-light">
                  <a href="tel:+351915662413" className="text-primary hover:underline">{t('contact.phone')}</a>
                  <span className="ml-2 text-sm text-foreground-light opacity-80">{tCommon('callCostNote')}</span>
                </p>
                <p className="text-foreground-light">
                  {t('contact.address')}
                </p>
              </div>
            </section>

            {/* Back to Top */}
            <div className="flex justify-center">
              <a 
                href="#acceptance" 
                className="inline-flex items-center px-4 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                ↑ Back to Top
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 