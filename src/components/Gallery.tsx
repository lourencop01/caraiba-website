'use client'
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface GalleryProps {
  isHomePage?: boolean;
}

export default function Gallery({ isHomePage = false }: GalleryProps) { 
  const t = useTranslations();

  const galleryItems = [
    { 
      category: t('gallery.trends'), 
      description: t('gallery.trendsDesc'),
      image: '/woman-keratin-treatment.webp'
    },
    { 
      category: t('gallery.bridal'), 
      description: t('gallery.bridalDesc'),
      image: '/women-bride-hairdresser.webp'
    },
    { 
      category: t('gallery.color'), 
      description: t('gallery.colorDesc'),
      image: '/women-blonde-coloring.webp'
    },
    { 
      category: t('gallery.cut'), 
      description: t('gallery.cutDesc'),
      image: '/women-famous-hairdresser.webp'
    },
    { 
      category: t('gallery.balayageGallery'), 
      description: t('gallery.balayageDesc'),
      image: '/women-balayage-haircut.webp'
    },
    { 
      category: t('gallery.styling'), 
      description: t('gallery.stylingDesc'),
      image: '/women-braids-hairdresser.webp'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isHomePage && (
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('gallery.title')}</h2>
            <p className="text-xl font-semibold text-foreground-light max-w-2xl mx-auto">
              {t('gallery.subtitle')}
            </p>
            <p className="text-lg text-foreground-light max-w-2xl mx-auto mt-4">
              {t('gallery.description')}
            </p>
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div key={index} className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer">
              <Image
                src={item.image}
                alt={item.category}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                {/* <div className="text-center text-white p-4">
                  <p className="font-semibold text-lg mb-2">{item.category}</p>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 