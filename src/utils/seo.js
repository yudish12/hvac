export const siteConfig = {
  name: 'Khandelwal Distributors',
  tagline: 'HVAC Contractor & AC Dealer Bareilly',
  description:
    'Authorized dealer for Daikin, Mitsubishi Heavy, Carrier & more in Bareilly, UP. Expert installation, servicing & commercial HVAC projects. 50,000+ AC installations across Uttar Pradesh.',
  url: 'https://www.khandelwaldistributors.com',
  phone: '+91 9429693410',
  whatsapp: '919429693410',
  email: 'info@khandelwaldistributors.com',
  address: {
    street: 'Civil Lines',
    full: 'G-35, MCI Plaza, Civil Lines',
    city: 'Bareilly',
    state: 'Uttar Pradesh',
    zip: '243001',
    country: 'India',
  },
  social: {
    facebook: 'https://facebook.com/khandelwaldistributors',
    instagram: 'https://instagram.com/khandelwaldistributors',
    youtube: 'https://youtube.com/@khandelwaldistributors',
    linkedin: 'https://linkedin.com/company/khandelwal-distributors',
  },
  maps: 'https://maps.app.goo.gl/khandelwaldistributors',
  justdial: 'https://www.justdial.com/Bareilly/Khandelwal-Distributors-Civil-Lines/9999PX581-X581-121206195818-R6C6_BZDET',
  indiamart: 'https://www.indiamart.com/khandelwal-distributors-up',
}

export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.full,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.367,
      longitude: 79.432,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '10:00',
        closes: '17:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '250',
    },
    areaServed: {
      '@type': 'State',
      name: 'Uttar Pradesh',
    },
    brand: [
      { '@type': 'Brand', name: 'Daikin' },
      { '@type': 'Brand', name: 'Mitsubishi Heavy' },
      { '@type': 'Brand', name: 'Carrier' },
      { '@type': 'Brand', name: 'Voltas' },
      { '@type': 'Brand', name: 'Godrej' },
      { '@type': 'Brand', name: 'Midea' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'HVAC Products & Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AC Installation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HVAC System Design' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Annual Maintenance Contract' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Emergency Repair Service' } },
      ],
    },
  }
}
