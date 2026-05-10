'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ImpressumContent() {
  const t = useTranslations('impressum');
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
                    className="hover:text-primary transition-colors"
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
            
            <p className="text-foreground-light leading-relaxed">
              {t('subtitle')}
            </p>
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
                <li><a href="#business-information" className="text-primary hover:underline">{t('businessInformation.title')}</a></li>
                <li><a href="#contact-details" className="text-primary hover:underline">{t('contactDetails.title')}</a></li>
                <li><a href="#legal-details" className="text-primary hover:underline">{t('legalDetails.title')}</a></li>
                <li><a href="#responsible-person" className="text-primary hover:underline">{t('responsiblePerson.title')}</a></li>
                <li><a href="#content-disclaimer" className="text-primary hover:underline">{t('contentDisclaimer.title')}</a></li>
                <li><a href="#external-links" className="text-primary hover:underline">{t('externalLinks.title')}</a></li>
                <li><a href="#copyright" className="text-primary hover:underline">{t('copyright.title')}</a></li>
                <li><a href="#data-protection" className="text-primary hover:underline">{t('dataProtection.title')}</a></li>
              </ol>
            </nav>

            {/* Business Information */}
            <section id="business-information" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('businessInformation.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('businessInformation.description')}
              </p>

              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {t('businessInformation.businessName.label')}
                    </h3>
                    <p className="text-foreground-light">
                      {t('businessInformation.businessName.value')}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {t('businessInformation.legalForm.label')}
                    </h3>
                    <p className="text-foreground-light">
                      {t('businessInformation.legalForm.value')}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Details */}
            <section id="contact-details" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('contactDetails.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('contactDetails.description')}
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    {t('contactDetails.address.title')}
                  </h3>
                  <div className="space-y-2 text-foreground-light">
                    <p>{t('contactDetails.address.street')}</p>
                    <p>{t('contactDetails.address.postal')}</p>
                    <p>{t('contactDetails.address.city')}</p>
                    <p>{t('contactDetails.address.country')}</p>
                  </div>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    {t('contactDetails.communication.title')}
                  </h3>
                  <div className="space-y-2 text-foreground-light">
                    <p>
                      <strong>{t('contactDetails.communication.phone.label')}:</strong> 
                      <a href={`tel:${t('contactDetails.communication.phone.value')}`} className="text-primary hover:underline ml-1">
                        {t('contactDetails.communication.phone.value')}
                      </a>
                    </p>
                    <p>
                      <strong>{t('contactDetails.communication.email.label')}:</strong> 
                      <a href={`mailto:${t('contactDetails.communication.email.value')}`} className="text-primary hover:underline ml-1">
                        {t('contactDetails.communication.email.value')}
                      </a>
                    </p>
                    <p>
                      <strong>{t('contactDetails.communication.website.label')}:</strong> 
                      <a href={t('contactDetails.communication.website.value')} className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                        {t('contactDetails.communication.website.value')}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Details */}
            <section id="legal-details" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('legalDetails.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('legalDetails.description')}
              </p>

              <div className="space-y-4">
                {/* <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('legalDetails.vat.title')}
                  </h3>
                  <p className="text-foreground-light">
                    <strong>{t('legalDetails.vat.label')}:</strong> {t('legalDetails.vat.value')}
                  </p>
                  <p className="text-foreground-light text-sm mt-2">
                    {t('legalDetails.vat.note')}
                  </p>
                </div> */}

                {/* <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('legalDetails.register.title')}
                  </h3>
                  <p className="text-foreground-light">
                    <strong>{t('legalDetails.register.label')}:</strong> {t('legalDetails.register.value')}
                  </p>
                  <p className="text-foreground-light text-sm mt-2">
                    {t('legalDetails.register.note')}
                  </p>
                </div> */}

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('legalDetails.license.title')}
                  </h3>
                  <p className="text-foreground-light">
                    {t('legalDetails.license.content')}
                  </p>
                </div>
              </div>
            </section>

            {/* Responsible Person */}
            <section id="responsible-person" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('responsiblePerson.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('responsiblePerson.description')}
              </p>

              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="space-y-3">
                  <p className="text-foreground-light">
                    <strong>{t('responsiblePerson.name.label')}:</strong> {t('responsiblePerson.name.value')}
                  </p>
                  <p className="text-foreground-light">
                    <strong>{t('responsiblePerson.role.label')}:</strong> {t('responsiblePerson.role.value')}
                  </p>
                  <p className="text-foreground-light">
                    <strong>{t('responsiblePerson.contact.label')}:</strong> 
                    <a href={`mailto:${t('responsiblePerson.contact.value')}`} className="text-primary hover:underline ml-1">
                      {t('responsiblePerson.contact.value')}
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Content Disclaimer */}
            <section id="content-disclaimer" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('contentDisclaimer.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('contentDisclaimer.description')}
              </p>

              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('contentDisclaimer.accuracy.title')}
                  </h3>
                  <p className="text-foreground-light text-sm">
                    {t('contentDisclaimer.accuracy.content')}
                  </p>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    {t('contentDisclaimer.liability.title')}
                  </h3>
                  <ul className="space-y-2 text-foreground-light text-sm">
                    {t.raw('contentDisclaimer.liability.items').map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* External Links */}
            <section id="external-links" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('externalLinks.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('externalLinks.description')}
              </p>

              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-3">
                  {t('externalLinks.disclaimer.title')}
                </h3>
                <div className="space-y-3 text-foreground-light text-sm">
                  <p>{t('externalLinks.disclaimer.content1')}</p>
                  <p>{t('externalLinks.disclaimer.content2')}</p>
                  <p>{t('externalLinks.disclaimer.content3')}</p>
                </div>
              </div>
            </section>

            {/* Copyright */}
            <section id="copyright" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('copyright.title')}
              </h2>
              <p className="text-foreground-light mb-6 leading-relaxed">
                {t('copyright.description')}
              </p>

              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-3">
                  {t('copyright.protection.title')}
                </h3>
                <ul className="space-y-2 text-foreground-light text-sm">
                  {t.raw('copyright.protection.items').map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Data Protection */}
            <section id="data-protection" className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('dataProtection.title')}
              </h2>
              <p className="text-foreground-light mb-4 leading-relaxed">
                {t('dataProtection.description')}
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <p className="text-foreground text-sm">
                  {t('dataProtection.reference')}
                </p>
              </div>
            </section>

            {/* Back to Top */}
            <div className="flex justify-center">
              <a 
                href="#business-information" 
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