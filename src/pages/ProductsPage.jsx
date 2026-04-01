import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, Phone } from 'lucide-react'
import { siteConfig } from '../utils/seo'
import { supabase } from '../lib/supabase'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '../hooks/useScrollReveal'

const residential = [
  { title: 'Inverter Split AC', desc: 'Energy-efficient inverter technology with variable speed for homes, bedrooms, and small offices. Save up to 60% on electricity.', price: 'From ₹28,990', brands: 'Daikin • Carrier • Mitsubishi • Voltas • Godrej • Midea', image: 'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=600&q=80&auto=format', stars: '3–5 Star', capacity: '1 – 2 Ton' },
  { title: 'Non-Inverter Split AC', desc: 'Fixed-speed split ACs for consistent cooling at an affordable price point. Reliable performance for budget-conscious buyers.', price: 'From ₹22,000', brands: 'Carrier • Godrej • Amstrad • Midea', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format', stars: '3 Star', capacity: '1 – 1.5 Ton' },
  { title: 'Window AC', desc: 'Compact window-mounted ACs ideal for small rooms, server rooms, and cabins. Easy single-unit installation.', price: 'From ₹22,000', brands: 'Carrier • Godrej • Cruise', image: 'https://images.unsplash.com/photo-1631545806609-55deb6e27e2c?w=600&q=80&auto=format', stars: '3–5 Star', capacity: '1 – 1.5 Ton' },
  { title: 'Portable AC', desc: 'Mobile air conditioning units that can be moved from room to room. Perfect for temporary cooling, events, and construction sites.', price: 'From ₹28,000', brands: 'Cruise', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80&auto=format', stars: '3 Star', capacity: '1 – 1.5 Ton' },
]

const commercial = [
  { title: 'Cassette AC', desc: 'Ceiling-mounted cassette units with 360° airflow for offices, showrooms, restaurants, and malls. Invisible design with powerful cooling.', price: 'From ₹75,000', brands: 'Daikin • Carrier • Mitsubishi • Cruise', capacity: '2 – 3 Ton', image: 'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=600&q=80&auto=format' },
  { title: 'Ductable AC', desc: 'Centralized cooling with concealed ductwork for villas, banquet halls, conference rooms, and large commercial spaces.', price: 'Custom Quote', brands: 'Daikin • Carrier • Mitsubishi', capacity: '3 – 20 Ton', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80&auto=format' },
  { title: 'Floor Standing AC', desc: 'Powerful floor-mounted units for halls, auditoriums, lobbies, and large waiting areas requiring high-capacity cooling.', price: 'From ₹1,20,000', brands: 'Daikin • Carrier • Mitsubishi', capacity: '3 – 5 Ton', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80&auto=format' },
  { title: 'VRV / VRF Systems', desc: 'Variable Refrigerant Volume systems for multi-zone cooling in corporate buildings, hotels, and hospitals. 30–50% energy savings.', price: 'Project Based', brands: 'Daikin Exclusive', capacity: '6 – 64 HP', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format' },
]

const industrial = [
  { title: 'Chiller Systems', desc: 'Water-cooled and air-cooled chillers for industries, large buildings, and process cooling requirements.', brands: 'Daikin • Carrier • Blue Star', image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80&auto=format' },
  { title: 'Cold Rooms & Storage', desc: 'Walk-in freezers and temperature-controlled cold storage for food processing, pharma, and restaurants.', brands: 'Daikin • Carrier • Blue Star', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80&auto=format' },
  { title: 'Air Handling Units (AHU)', desc: 'High CFM capacity AHU systems for hospitals, factories, and large commercial centralized HVAC applications.', brands: 'Daikin Exclusive', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80&auto=format' },
  { title: 'Heat Pumps', desc: 'Energy-efficient heating and cooling systems for water heating in hotels, gyms, hospitals, and homes.', brands: 'Daikin • Carrier', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80&auto=format' },
]

const additional = [
  { title: 'Air Purifiers & Water Softeners', brands: 'Daikin • Carrier', price: 'From ₹15,000' },
  { title: 'Water Coolers & Dispensers', brands: 'Usha • Voltas', price: 'From ₹8,000' },
  { title: 'Alkaline RO Systems', brands: 'Zero B • Mitsubishi', price: 'From ₹15,000' },
  { title: 'Deep Freezers', brands: 'Elanpro', price: 'From ₹38,000' },
  { title: 'Solar Water Heaters', brands: 'Inter Solar', price: 'From ₹25,000' },
  { title: 'Ventilation & HRV Systems', brands: 'Daikin • Astberg', price: 'From ₹15,000' },
]

function ProductCard({ product }) {
  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
      <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden h-full hover:shadow-elevated transition-all duration-300">
        <div className="relative h-44 overflow-hidden">
          <img src={product.image_url || product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
          {product.price && (
            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1 rounded-full">{product.price}</span>
          )}
          <h3 className="absolute bottom-3 left-4 text-white font-bold text-lg">{product.title}</h3>
        </div>
        <div className="p-5">
          <p className="text-sm text-slate-500 mb-3 leading-relaxed">{product.desc}</p>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-medium">{product.brands}</span>
            {product.capacity && <span className="text-[11px] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium">{product.capacity}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProductsPage() {
  const [dbProducts, setDbProducts] = useState(null)
  const { ref: resRef, isInView: resInView } = useScrollReveal()
  const { ref: comRef, isInView: comInView } = useScrollReveal()
  const { ref: indRef, isInView: indInView } = useScrollReveal()

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length > 0) setDbProducts(data)
      })
  }, [])

  const resProducts = dbProducts ? dbProducts.filter((p) => p.category === 'residential') : residential
  const comProducts = dbProducts ? dbProducts.filter((p) => p.category === 'commercial') : commercial
  const indProducts = dbProducts ? dbProducts.filter((p) => p.category === 'industrial') : industrial
  const addProducts = dbProducts ? dbProducts.filter((p) => p.category === 'additional') : additional

  return (
    <>
      <Helmet>
        <title>HVAC Products – Split AC, VRV, Cassette, Chillers | Unitech Aircon Bareilly</title>
        <meta name="description" content="Browse inverter split ACs, cassette ACs, VRV systems, chillers, cold rooms & more from Daikin, Carrier, Mitsubishi. Best prices in Bareilly with expert installation." />
        <meta property="og:title" content="HVAC Products & Air Conditioners – Unitech Aircon" />
        <meta property="og:description" content="Complete range of residential, commercial & industrial HVAC products. Authorized dealer for 8+ brands." />
        <link rel="canonical" href={`${siteConfig.url}/products`} />
      </Helmet>

      <PageHero
        subtitle="Our Products"
        title="Complete Range of HVAC Solutions"
        description="From residential split ACs to commercial VRV systems and industrial chillers — find the perfect cooling solution for your space."
        image="https://images.unsplash.com/photo-1631545806609-55deb6e27e2c?w=1920&q=80&auto=format"
      />

      {/* Residential */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <SectionTitle subtitle="Residential" title="Home Air Conditioning" description="Energy-efficient cooling solutions for homes, apartments, and small offices." />
          <motion.div ref={resRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" initial="hidden" animate={resInView ? 'visible' : 'hidden'} variants={staggerContainer}>
            {resProducts.map((p) => <ProductCard key={p.title} product={p} />)}
          </motion.div>
        </Container>
      </section>

      {/* Commercial */}
      <section className="py-20 md:py-28 bg-slate-50">
        <Container>
          <SectionTitle subtitle="Commercial" title="Commercial & VRV Systems" description="High-performance cooling for offices, hotels, hospitals, malls, and large commercial spaces." />
          <motion.div ref={comRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" initial="hidden" animate={comInView ? 'visible' : 'hidden'} variants={staggerContainer}>
            {comProducts.map((p) => <ProductCard key={p.title} product={p} />)}
          </motion.div>
        </Container>
      </section>

      {/* Industrial */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <SectionTitle subtitle="Industrial" title="Industrial Cooling Solutions" description="Heavy-duty HVAC systems for manufacturing, cold storage, and process cooling." />
          <motion.div ref={indRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" initial="hidden" animate={indInView ? 'visible' : 'hidden'} variants={staggerContainer}>
            {indProducts.map((p) => <ProductCard key={p.title} product={p} />)}
          </motion.div>
        </Container>
      </section>

      {/* Additional */}
      <section className="py-16 md:py-20 bg-slate-50">
        <Container>
          <SectionTitle subtitle="More Products" title="Additional Solutions" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addProducts.map((a) => (
              <div key={a.title} className="bg-white rounded-xl p-5 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{a.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{a.brands}</p>
                </div>
                <span className="text-xs font-bold text-primary-600 whitespace-nowrap">{a.price}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary-600">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Can't Find What You Need?</h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">Get expert consultation and competitive pricing on all HVAC products.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="white" size="lg" icon={Phone} href={`tel:${siteConfig.phone}`}>Call for Free Quote</Button>
            <Button variant="outline" size="lg" className="border-white/25 text-white hover:bg-white/10 hover:text-white" href="/contact">Request Quote Online</Button>
          </div>
        </Container>
      </section>
    </>
  )
}
