'use client'
import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation';

export interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  readTime: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  slug: string;
}

export default function BlogPost({
  title,
  excerpt,
  author,
  publishedDate,
  readTime,
  category,
  imageUrl,
  imageAlt,
  slug
}: BlogPostProps) {
  const params = useParams();
  const locale = params.locale as string;

  const formattedDate = new Date(publishedDate).toLocaleDateString(locale === 'pt' ? 'pt-PT' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="bg-background border border-border rounded-2xl overflow-hidden shadow-theme hover:shadow-theme-lg transition-all duration-300 transform hover:-translate-y-2">
      {/* Image */}
      <div className="relative w-full h-64">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-primary to-primary-dark text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-3 text-sm text-foreground-muted">
          <time dateTime={publishedDate}>{formattedDate}</time>
          <span>•</span>
          <span>{readTime} {locale === 'pt' ? 'de leitura' : 'read'}</span>
        </div>

        <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-3 leading-tight hover:text-primary transition-colors duration-200">
          <Link href={`/${locale}/blog/${slug}`} className="block">
            {title}
          </Link>
        </h2>

        <p className="text-foreground-light leading-relaxed mb-4 overflow-hidden" style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical' as const
        }}>
          {excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground-muted">
            {locale === 'pt' ? 'Por' : 'By'} {author}
          </span>
          <Link 
            href={`/${locale}/blog/${slug}`}
            className="text-primary hover:text-primary-dark font-medium text-sm transition-colors duration-200 flex items-center gap-1"
          >
            {locale === 'pt' ? 'Ler Mais' : 'Read More'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
