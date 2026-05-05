'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { cormorantGaramond } from '@/lib/fonts';

interface GalleryProps {
  isHomePage?: boolean;
}

export default function Gallery({ isHomePage = false }: GalleryProps) {
  const t = useTranslations();

  const galleryItems = [
    {
      category: t('gallery.trends'),
      description: t('gallery.trendsDesc'),
      image: '/pexels-1.jpg',
    },
    {
      category: t('gallery.bridal'),
      description: t('gallery.bridalDesc'),
      image: '/1.jpg',
    },
    {
      category: t('gallery.color'),
      description: t('gallery.colorDesc'),
      image: '/2.jpg',
    },
    {
      category: t('gallery.cut'),
      description: t('gallery.cutDesc'),
      image: '/hero2.png',
    },
    {
      category: t('gallery.poolGallery'),
      description: t('gallery.poolDesc'),
      image: '/3.jpg',
    },
    {
      category: t('gallery.styling'),
      description: t('gallery.stylingDesc'),
      image: '/4.jpg',
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isHomePage && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2
              className={`text-3xl sm:text-4xl font-bold text-foreground mb-3 ${cormorantGaramond.className}`}
            >
              {t('gallery.title')}
            </h2>
            <p className="text-foreground-light text-lg">{t('gallery.subtitle')}</p>
            <p className="text-foreground-muted mt-3 text-base leading-relaxed">{t('gallery.description')}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl aspect-square border border-border/30 bg-background shadow-theme hover:shadow-theme-lg transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={item.category}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                <p className="font-semibold text-white text-lg leading-tight drop-shadow-sm">{item.category}</p>
                <p className="text-sm text-white/85 mt-1.5 leading-snug max-w-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
