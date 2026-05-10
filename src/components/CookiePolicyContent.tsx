'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function CookiePolicyContent() {
  const t = useTranslations('cookies.policy');
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
                <li><a href="#introduction" className="text-primary hover:underline">{t('introduction.title')}</a></li>
                <li><a href="#types" className="text-primary hover:underline">{t('types.title')}</a></li>
                <li><a href="#essential" className="text-primary hover:underline">{t('essential.title')}</a></li>
                <li><a href="#analytics" className="text-primary hover:underline">{t('analytics.title')}</a></li>
                <li><a href="#marketing" className="text-primary hover:underline">{t('marketing.title')}</a></li>
                <li><a href="#third-party" className="text-primary hover:underline">{t('thirdParty.title')}</a></li>
                <li><a href="#management" className="text-primary hover:underline">{t('management.title')}</a></li>
                <li><a href="#browser-controls" className="text-primary hover:underline">{t('browserControls.title')}</a></li>
                <li><a href="#updates" className="text-primary hover:underline">{t('updates.title')}</a></li>
                <li><a href="#contact" className="text-primary hover:underline">{t('contact.title')}</a></li>
              </ol>
            </nav>

            {/* Introduction */}
            <section id="introduction" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('introduction.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('introduction.description')}
              </p>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('introduction.usage')}
              </p>
              <p className="text-foreground-light leading-relaxed">
                {t('introduction.consent')}
              </p>
            </section>

            {/* Types of Cookies */}
            <section id="types" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('types.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('types.description')}
              </p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {tCommon('cookies.categories.essential.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('types.essential')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {tCommon('cookies.categories.analytics.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('types.analytics')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {tCommon('cookies.categories.marketing.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('types.marketing')}
                  </p>
                </div>
              </div>
            </section>

            {/* Essential Cookies */}
            <section id="essential" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('essential.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('essential.description')}
              </p>
              
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-3">
                  {t('essential.examples.title')}
                </h3>
                <ul className="space-y-2 text-foreground-light">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <strong>{t('essential.examples.session')}</strong>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <strong>{t('essential.examples.security')}</strong>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <strong>{t('essential.examples.preferences')}</strong>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <strong>{t('essential.examples.consent')}</strong>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
                <p className="text-foreground text-sm">
                  <strong>{t('essential.note')}</strong>
                </p>
              </div>
            </section>

            {/* Analytics Cookies */}
            <section id="analytics" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('analytics.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('analytics.description')}
              </p>

              <div className="bg-surface border border-border rounded-lg p-6 mb-4">
                <h3 className="text-lg font-medium text-foreground mb-3">
                  {t('analytics.googleAnalytics.title')}
                </h3>
                <p className="text-foreground-light mb-4 text-sm">
                  {t('analytics.googleAnalytics.description')}
                </p>
                <ul className="space-y-2 text-foreground-light text-sm">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <strong>{t('analytics.googleAnalytics.cookies')}</strong>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <strong>{t('analytics.googleAnalytics.retention')}</strong>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <strong>{t('analytics.googleAnalytics.purpose')}</strong>
                  </li>
                </ul>
              </div>
            </section>

            {/* Marketing Cookies */}
            <section id="marketing" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('marketing.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('marketing.description')}
              </p>

              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-3">
                  {t('marketing.facebook.title')}
                </h3>
                <p className="text-foreground-light mb-4 text-sm">
                  {t('marketing.facebook.description')}
                </p>
                <ul className="space-y-2 text-foreground-light text-sm">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <strong>{t('marketing.facebook.cookies')}</strong>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <strong>{t('marketing.facebook.purpose')}</strong>
                  </li>
                </ul>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section id="third-party" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('thirdParty.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('thirdParty.description')}
              </p>

              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-3">
                  {t('thirdParty.services.title')}
                </h3>
                <ul className="space-y-2 text-foreground-light">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('thirdParty.services.google')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('thirdParty.services.facebook')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('thirdParty.services.youtube')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('thirdParty.services.maps')}
                  </li>
                </ul>
              </div>
            </section>

            {/* Cookie Management */}
            <section id="management" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('management.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('management.description')}
              </p>

              <div className="space-y-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('management.consentTool.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('management.consentTool.description')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('management.browserControls.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('management.browserControls.description')}
                  </p>
                </div>
              </div>
            </section>

            {/* Browser Controls */}
            <section id="browser-controls" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('browserControls.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('browserControls.description')}
              </p>

              <div className="bg-surface border border-border rounded-lg p-6">
                <ul className="space-y-3 text-foreground-light">
                  <li>
                    <strong>Chrome:</strong> {t('browserControls.browsers.chrome')}
                  </li>
                  <li>
                    <strong>Firefox:</strong> {t('browserControls.browsers.firefox')}
                  </li>
                  <li>
                    <strong>Safari:</strong> {t('browserControls.browsers.safari')}
                  </li>
                  <li>
                    <strong>Edge:</strong> {t('browserControls.browsers.edge')}
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                <p className="text-foreground text-sm">
                  <strong>{t('browserControls.note')}</strong>
                </p>
              </div>
            </section>

            {/* Updates */}
            <section id="updates" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('updates.title')}
              </h2>
              <p className="text-foreground-light leading-relaxed">
                {t('updates.description')}
              </p>
            </section>

            {/* Contact */}
            <section id="contact" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('contact.description')}
              </p>
              <div className="bg-surface border border-border rounded-lg p-6 space-y-2">
                <p className="text-foreground-light">{t('contact.email')}</p>
                <p className="text-foreground-light">
                  <a href="tel:+351961725650" className="text-primary hover:underline">{t('contact.phone')}</a>
                  <span className="ml-2 text-sm text-foreground-light opacity-80">{tCommon('callCostNote')}</span>
                </p>
                <p className="text-foreground-light">{t('contact.address')}</p>
              </div>
              <p className="text-foreground-light mt-4 text-sm">
                {t('contact.response')}
              </p>
            </section>

            {/* Back to Top */}
            <div className="flex justify-center">
              <a 
                href="#introduction" 
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