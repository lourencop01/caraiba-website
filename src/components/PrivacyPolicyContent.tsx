'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function PrivacyPolicyContent() {
  const t = useTranslations('privacy');
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
                <li><a href="#data-controller" className="text-primary hover:underline">{t('dataController.title')}</a></li>
                <li><a href="#data-collection" className="text-primary hover:underline">{t('dataCollection.title')}</a></li>
                <li><a href="#legal-basis" className="text-primary hover:underline">{t('legalBasis.title')}</a></li>
                <li><a href="#data-use" className="text-primary hover:underline">{t('dataUse.title')}</a></li>
                <li><a href="#data-sharing" className="text-primary hover:underline">{t('dataSharing.title')}</a></li>
                <li><a href="#data-retention" className="text-primary hover:underline">{t('dataRetention.title')}</a></li>
                <li><a href="#international-transfers" className="text-primary hover:underline">{t('internationalTransfers.title')}</a></li>
                <li><a href="#your-rights" className="text-primary hover:underline">{t('yourRights.title')}</a></li>
                <li><a href="#cookies" className="text-primary hover:underline">{t('cookiesSection.title')}</a></li>
                <li><a href="#security" className="text-primary hover:underline">{t('security.title')}</a></li>
                <li><a href="#minors" className="text-primary hover:underline">{t('minors.title')}</a></li>
                <li><a href="#changes" className="text-primary hover:underline">{t('changes.title')}</a></li>
                <li><a href="#contact" className="text-primary hover:underline">{t('contact.title')}</a></li>
                <li><a href="#authority" className="text-primary hover:underline">{t('authority.title')}</a></li>
              </ol>
            </nav>

            {/* Introduction */}
            <section id="introduction" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('introduction.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('introduction.content')}
              </p>
              <p className="text-foreground-light leading-relaxed">
                {t('introduction.contact')}
              </p>
            </section>

            {/* Data Controller */}
            <section id="data-controller" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('dataController.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('dataController.content')}
              </p>
              <div className="bg-surface border border-border rounded-lg p-4 space-y-2">
                <p className="font-medium text-foreground">{t('dataController.name')}</p>
                <p className="text-foreground-light">{t('dataController.address')}</p>
                <p className="text-foreground-light">{t('dataController.email')}</p>
                <p className="text-foreground-light">
                  <a href="tel:+351961725650" className="text-primary hover:underline">{t('dataController.phone')}</a>
                  <span className="ml-2 text-sm text-foreground-light opacity-80">{tCommon('callCostNote')}</span>
                </p>
              </div>
            </section>

            {/* Data Collection */}
            <section id="data-collection" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('dataCollection.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('dataCollection.description')}
              </p>

              <div className="space-y-6">
                {/* Contact Forms */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('dataCollection.contactForms.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('dataCollection.contactForms.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Website Usage */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('dataCollection.websiteUsage.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('dataCollection.websiteUsage.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cookies */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('dataCollection.cookies.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('dataCollection.cookies.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social Media */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('dataCollection.socialMedia.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('dataCollection.socialMedia.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Legal Basis */}
            <section id="legal-basis" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('legalBasis.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('legalBasis.description')}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('legalBasis.consent.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('legalBasis.consent.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('legalBasis.contract.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('legalBasis.contract.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('legalBasis.legitimateInterest.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('legalBasis.legitimateInterest.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('legalBasis.legal.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('legalBasis.legal.content')}
                  </p>
                </div>
              </div>
            </section>

            {/* Data Use */}
            <section id="data-use" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('dataUse.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('dataUse.description')}
              </p>

              <div className="space-y-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('dataUse.serviceProvision.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('dataUse.serviceProvision.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('dataUse.businessOperations.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('dataUse.businessOperations.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('dataUse.marketing.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('dataUse.marketing.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('dataUse.websiteImprovement.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('dataUse.websiteImprovement.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section id="data-sharing" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('dataSharing.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('dataSharing.description')}
              </p>

              <div className="space-y-6">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('dataSharing.serviceProviders.title')}
                  </h3>
                  <p className="text-foreground-light mb-4">
                    {t('dataSharing.serviceProviders.content')}
                  </p>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('dataSharing.serviceProviders.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('dataSharing.legal.title')}
                  </h3>
                  <p className="text-foreground-light mb-4">
                    {t('dataSharing.legal.content')}
                  </p>
                  <ul className="space-y-2 text-foreground-light">
                    {t.raw('dataSharing.legal.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('dataSharing.businessTransfer.title')}
                  </h3>
                  <p className="text-foreground-light">
                    {t('dataSharing.businessTransfer.content')}
                  </p>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="text-foreground font-medium">
                    {t('dataSharing.noSelling')}
                  </p>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section id="data-retention" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('dataRetention.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('dataRetention.description')}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('dataRetention.customerData.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('dataRetention.customerData.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('dataRetention.marketingData.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('dataRetention.marketingData.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('dataRetention.websiteData.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('dataRetention.websiteData.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('dataRetention.legal.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('dataRetention.legal.content')}
                  </p>
                </div>
              </div>
            </section>

            {/* International Transfers */}
            <section id="international-transfers" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('internationalTransfers.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('internationalTransfers.description')}
              </p>
              <ul className="space-y-2 text-foreground-light">
                {t.raw('internationalTransfers.items').map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Your Rights */}
            <section id="your-rights" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('yourRights.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('yourRights.description')}
              </p>

              <div className="space-y-4">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('yourRights.access.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('yourRights.access.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('yourRights.rectification.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('yourRights.rectification.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('yourRights.erasure.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('yourRights.erasure.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('yourRights.restrict.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('yourRights.restrict.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('yourRights.portability.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('yourRights.portability.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('yourRights.object.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('yourRights.object.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('yourRights.withdraw.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('yourRights.withdraw.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {t('yourRights.complaint.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('yourRights.complaint.content')}
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-6">
                <p className="text-foreground font-medium">
                  {t('yourRights.exercising')}
                </p>
              </div>
            </section>

            {/* Cookies Section */}
            <section id="cookies" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('cookiesSection.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('cookiesSection.description')}
              </p>

              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-4">
                  {t('cookiesSection.types.title')}
                </h3>
                <ul className="space-y-2 text-foreground-light">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('cookiesSection.types.essential')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('cookiesSection.types.analytics')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('cookiesSection.types.marketing')}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {t('cookiesSection.types.preferences')}
                  </li>
                </ul>
              </div>

              <p className="text-foreground-light mt-4 leading-relaxed">
                {t('cookiesSection.control')}
              </p>
            </section>

            {/* Security */}
            <section id="security" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('security.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('security.description')}
              </p>
              <ul className="space-y-2 text-foreground-light mb-4">
                {t.raw('security.measures').map((measure: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {measure}
                  </li>
                ))}
              </ul>
              <p className="text-foreground-light text-sm italic">
                {t('security.disclaimer')}
              </p>
            </section>

            {/* Minors */}
            <section id="minors" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('minors.title')}
              </h2>
              <p className="text-foreground-light leading-relaxed">
                {t('minors.content')}
              </p>
            </section>

            {/* Changes */}
            <section id="changes" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('changes.title')}
              </h2>
              <p className="text-foreground-light leading-relaxed">
                {t('changes.content')}
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
            </section>

            {/* Authority */}
            <section id="authority" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('authority.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('authority.description')}
              </p>
              <div className="bg-surface border border-border rounded-lg p-6 space-y-2">
                <p className="text-foreground-light">{t('authority.portugal')}</p>
                <p className="text-foreground-light">
                  <a 
                    href="https://www.cnpd.pt/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {t('authority.website')}
                  </a>
                </p>
                <p className="text-foreground-light">
                  <a 
                    href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {t('authority.eu')}
                  </a>
                </p>
              </div>
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