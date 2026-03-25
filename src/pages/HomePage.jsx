import { Helmet } from 'react-helmet-async'
import { generateStructuredData, siteConfig } from '../utils/seo'
import HeroSection from '../components/sections/HeroSection'
import StatsSection from '../components/sections/StatsSection'
import BrandsSection from '../components/sections/BrandsSection'
import ServicesHighlight from '../components/sections/ServicesHighlight'
import AboutPreview from '../components/sections/AboutPreview'
import ProductCategories from '../components/sections/ProductCategories'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import IndustriesWeServe from '../components/sections/IndustriesWeServe'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTASection from '../components/sections/CTASection'

export default function HomePage() {
  const structuredData = generateStructuredData()

  return (
    <>
      <Helmet>
        <title>{siteConfig.name} – {siteConfig.tagline} | Daikin, Mitsubishi, Carrier</title>
        <meta name="description" content={siteConfig.description} />
        <meta property="og:title" content={`${siteConfig.name} – ${siteConfig.tagline}`} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${siteConfig.name} – ${siteConfig.tagline}`} />
        <meta name="twitter:description" content={siteConfig.description} />
        <link rel="canonical" href={siteConfig.url} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <HeroSection />
      <StatsSection />
      <BrandsSection />
      <ServicesHighlight />
      <AboutPreview />
      <ProductCategories />
      <WhyChooseUs />
      <IndustriesWeServe />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
