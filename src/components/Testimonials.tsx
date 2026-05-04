'use client'
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const TestimonialCard = ({ testimonial, t }: { testimonial: { name: string; review: string; rating: number }, t: (key: string) => string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 200;
  const needsTruncation = testimonial.review.length > characterLimit;
  const displayText = needsTruncation && !isExpanded 
    ? testimonial.review.slice(0, characterLimit) + '...'
    : testimonial.review;

  return (
    <div className="flex flex-col bg-background p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-border">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-secondary-light to-secondary rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-sm">{testimonial.name[0]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-foreground truncate">{testimonial.name}</span>
          <div className="text-warning text-sm">
            {'★'.repeat(testimonial.rating)}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-foreground-light leading-relaxed">&ldquo;{displayText}&rdquo;</p>
        {needsTruncation && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-primary hover:text-primary-dark text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded"
          >
            {isExpanded ? t('readLess') : t('readMore')}
          </button>
        )}
      </div>
    </div>
  );
};

interface TestimonialsProps {
  isHomePage?: boolean;
}

export default function Testimonials({ isHomePage = false }: TestimonialsProps) { 
  const t = useTranslations('testimonials');
  const [showAll, setShowAll] = useState(false);

  const testimonials = [
    {
      name: "Soraya Ventura",
      review: "Everyone at this salon is so friendly and always has a smile on their faces. It's really easy to spend time there, getting your hair done, being treated so well by everyone, and sometimes I even bring my dog (who, it's worth noting, is also very well received)... Salon Concept's good humor and her wonderful blowouts, the affection and patience of 'my love', Ju's stories, and Glauber's talent make every visit to this hairdresser a memorable one! Every time I see him, he's spot on; he clearly loves what he does and always has a smile on his face. The staff is wonderful, everyone is absolutely caring, and the end result created by Salon Concept and her entire team will surely be brilliant!",
      rating: 5
    },
    {
      name: "Luisa P.",
      review: "Maria did my wedding hair and it was absolutely perfect! She made me feel so beautiful on my special day. The team is incredibly talented and professional.",
      rating: 5
    },
    {
      name: "Kikas Maria",
      review: "The best hairdresser in Lisbon! 😊🩷 Salon Concept really understands what the client wants and does color like no one else! 😊 I recommend it! ⭐️⭐️⭐️⭐️⭐️",
      rating: 5
    },
    {
      name: "Renée LeBlanc",
      review: "I absolutely love this salon it is a GEM - Salon Concept and her team are amazing. I went in for the first time with no recommendation but I got exactly what I asked for and wanted. I am so happy to have found them! (Honestly my little dog found them first, she peaked her little face in so many times I just had to make an appointment and she was right!)",
      rating: 5
    },
    {
      name: "Lalita Kakanadan",
      review: "I had an absolutely fantastic experience at this salon! From the moment I walked in, the entire team was incredibly friendly, warm, and welcoming. Salon Concept was not only highly professional but also wonderfully jovial and easy to talk to. She really took the time to understand what I wanted and gave me a haircut that I'm genuinely thrilled with.\n What impressed me even more was that they managed to fit me in on such short notice—such great customer service! It's clear they care deeply about their clients and love what they do. This is hands down my new favorite hair salon, and I'll definitely be coming back. Highly recommended",
      rating: 5
    },
    {
      name: "Joana Garrido",
      review: "I loved the final result! Salon Concept is incredible, I recommend her 100%!",
      rating: 5
    },
    {
      name: "Angela",
      review: "My new hairdresser in Lisbon. 100% professional ❤️",
      rating: 5
    },
    {
      name: "Lana",
      review: "I am so pleased with my blonde highlights, will definitely book another appointment, besides this they have a 10/10 costumer service and handle their customers sooo well!",
      rating: 5
    },
    {
      name: "Silvia Vita",
      review: "The best salon in Lisbon. The only one that satisfies me with curly hair.\nTop coloring",
      rating: 5
    }
  ];

  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 6);

  return (
    <section className="py-20 bg-gradient-to-br from-surface to-surface-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isHomePage && (
          <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('title')}</h2>
              <p className="text-lg text-foreground-light mb-6 text-center">{t('subtitle')}</p>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-warning text-xl">★★★★★</span>
              <span className="text-foreground-light">{t('googleRating')}</span>
            </div>
          </div>
        )}

        {/* Single responsive grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} t={t} />
          ))}
        </div>

        {testimonials.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {showAll ? t('showLess') : t('seeMore')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
} 