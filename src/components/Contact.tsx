'use client'
import GoogleMaps from "./GoogleMaps";
import { useTranslations } from 'next-intl';
import { trackGenerateLead } from '../lib/analytics';

interface ContactProps {
  isHomePage?: boolean;
}

export default function Contact({ isHomePage = false }: ContactProps) {
  const t = useTranslations();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            {isHomePage && (
              <>
                <h2 className="text-3xl font-bold text-foreground mb-2">{t('contact.title')}</h2>
                <p className="text-xl font-semibold text-foreground-light mb-6">{t('contact.subtitle')}</p>
              </>
            )}
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-1">
                  <span className="text-accent text-sm">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t('contact.address')}</h3>
                  <p className="text-foreground-light whitespace-pre-line">{t('contact.addressValue')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-1">
                  <span className="text-accent text-sm">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t('contact.phone')}</h3>
                  <a href="tel:+351915562413" onClick={() => trackGenerateLead('contact_phone')} className="text-foreground-light hover:text-accent transition-colors cursor-pointer">
                    {t('contact.phoneValue')}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-1">
                  <span className="text-accent text-sm">✉️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t('contact.email')}</h3>
                  <p className="text-foreground-light">{t('contact.emailValue')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-1">
                  <span className="text-accent text-sm">🕐</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t('contact.hours')}</h3>
                  <div className="text-foreground-light whitespace-pre-line">
                    {t('contact.hoursValue')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <GoogleMaps />
          </div>
        </div>
      </div>
    </section>
  );
} 