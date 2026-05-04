// Google Analytics event tracking utilities

/**
 * Track a generate_lead event when a booking button is clicked
 * @param source - The source of the lead (e.g., 'hero_section', 'booking_section', 'navbar')
 * @param value - The estimated value of the lead (default: 50)
 * @param currency - The currency code (default: 'EUR')
 */
export function trackGenerateLead(source: string, value: number = 0, currency: string = 'EUR') {
  // Only track if gtag is available and user has consented to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: currency,
      value: value,
      lead_source: source,
      event_category: 'booking',
      event_label: 'book_now_button'
    });
    
    // Log for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Lead generated:', { source, value, currency });
    }
  }
}

/**
 * Track other custom events if needed
 */
export function trackCustomEvent(
  eventName: string, 
  parameters: Record<string, unknown> = {}
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Custom event tracked:', { eventName, parameters });
    }
  }
} 