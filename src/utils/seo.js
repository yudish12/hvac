export const siteConfig = {
  name: 'Unitech Aircon',
  tagline: 'HVAC Engineering & Service Company – Lucknow',
  description:
    'Professionally managed HVAC engineering and service company in Lucknow with 20+ years of experience. Authorized Blue Star partner delivering VRF, ducted, chiller, and AMC solutions across Lucknow, Ayodhya, Gorakhpur & Varanasi.',
  url: 'https://www.unitechaircon.com',
  phone: '+91 9429693410',
  whatsapp: '919429693410',
  email: 'info@unitechaircon.com',
  logo: '/logo.webp',
  address: {
    street: 'Hanumant Vihar, Hasiamau',
    full: 'House No. 05, Kh No. 550, Hanumant Vihar, Hasiamau',
    short: 'Hanumant Vihar, Hasiamau, Lucknow',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    zip: '226002',
    country: 'India',
    lat: 26.7866467,
    lng: 80.9902149,
  },
  social: {
    facebook: 'https://facebook.com/unitechaircon',
    instagram: 'https://instagram.com/unitechaircon',
    youtube: 'https://youtube.com/@unitechaircon',
    linkedin: 'https://linkedin.com/company/unitech-aircon',
  },
  maps: 'https://www.google.com/maps/place/Unitech+Aircon/@26.7866467,80.9902149,17z/data=!4m6!3m5!1s0x399be5553afc64a3:0x7155018ee0792bb0!8m2!3d26.7866467!4d80.9902149',
  justdial: '#',
  indiamart: '#',
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
      latitude: siteConfig.address.lat,
      longitude: siteConfig.address.lng,
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
      { '@type': 'Brand', name: 'Blue Star' },
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
