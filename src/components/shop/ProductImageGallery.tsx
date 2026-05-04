'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ShopifyImage } from '@/lib/shopify-api';

interface ProductImageGalleryProps {
  images: ShopifyImage[];
  title: string;
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const active = images[hoveredIndex ?? activeIndex];

  if (!active) return null;

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface border border-border">
        <Image
          key={active.url}
          src={active.url}
          alt={active.altText ?? title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-opacity duration-200"
          priority={activeIndex === 0}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(0, 8).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-square rounded-xl overflow-hidden bg-surface border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                i === (hoveredIndex ?? activeIndex)
                  ? 'border-primary'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? `${title} ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 25vw, 12vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
