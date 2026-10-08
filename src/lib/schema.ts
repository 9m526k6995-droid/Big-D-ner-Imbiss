import { site } from '../config/site';
import { socialLinks } from './site-helpers';

const dayMap = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/** Restaurant-JSON-LD – ausschließlich aus site.ts gespeist, keine erfundenen Daten. */
export function restaurantSchema() {
  const url = site.siteUrl.replace(/\/$/, '');
  const openingHoursSpecification = site.hours
    .map((h, i) => (h.open && h.close ? { '@type': 'OpeningHoursSpecification', dayOfWeek: dayMap[i], opens: h.open, closes: h.close } : null))
    .filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${url}/#restaurant`,
    name: site.name,
    url,
    image: `${url}/og.jpg`,
    logo: `${url}${site.logo.src}`,
    telephone: site.phone.tel,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: site.address.countryCode,
    },
    openingHoursSpecification,
    priceRange: site.schema.priceRange,
    servesCuisine: site.schema.servesCuisine,
    hasMenu: `${url}/speisekarte`,
    acceptsReservations: false,
    sameAs: socialLinks.map((s) => s.url),
    ...(site.google.includeRatingInSchema
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: site.google.rating, reviewCount: site.google.reviewCount, bestRating: 5 } }
      : {}),
  };
}
