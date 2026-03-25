import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { useScrollReveal, fadeUp, staggerContainer } from '../../hooks/useScrollReveal'

const categories = [
  {
    title: 'Inverter Split AC',
    subtitle: 'Homes, bedrooms, offices, retail shops',
    image: 'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=600&q=80&auto=format',
    price: 'From ₹32,000',
    brands: 'Daikin • Carrier • Mitsubishi',
  },
  {
    title: 'Cassette AC',
    subtitle: 'Offices, showrooms, restaurants, malls',
    image: 'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=600&q=80&auto=format',
    price: 'From ₹85,000',
    brands: 'Daikin • Carrier • Cruise',
  },
  {
    title: 'Ductable AC',
    subtitle: 'Villas, banquet halls, conference rooms',
    image: 'https://images.unsplash.com/photo-1631545806609-55deb6e27e2c?w=600&q=80&auto=format',
    price: 'Custom Quote',
    brands: 'All Major Brands',
  },
  {
    title: 'VRV / VRF Systems',
    subtitle: 'Corporate buildings, hotels, hospitals',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80&auto=format',
    price: 'Project Based',
    brands: 'Daikin Exclusive',
  },
  {
    title: 'Chiller Systems',
    subtitle: 'Industries, large buildings, process cooling',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80&auto=format',
    price: 'Custom Quote',
    brands: 'Daikin • Carrier • Blue Star',
  },
  {
    title: 'Cold Rooms & Storage',
    subtitle: 'Food processing, pharma, cold storage',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80&auto=format',
    price: 'Custom Quote',
    brands: 'Multi-Brand',
  },
  {
    title: 'Window AC',
    subtitle: 'Small rooms, server rooms, cabins',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format',
    price: 'From ₹22,000',
    brands: 'Carrier • Godrej • Cruise',
  },
  {
    title: 'Floor Standing AC',
    subtitle: 'Halls, auditoriums, large waiting areas',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80&auto=format',
    price: 'From ₹1,20,000',
    brands: 'Daikin • Carrier • Mitsubishi',
  },
  {
    title: 'Heat Pumps',
    subtitle: 'Water heating for hotels, gyms, homes',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80&auto=format',
    price: 'Custom Quote',
    brands: 'Daikin • Carrier',
  },
]

export default function ProductCategories() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section id="products" className="py-20 md:py-28 bg-white">
      <Container>
        <SectionTitle
          subtitle="Browse by Category"
          title="Explore Our Product Range"
          description="From residential split ACs to commercial VRV systems, find the perfect cooling solution for your space."
        />

        <motion.div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {categories.map((cat) => (
            <motion.div key={cat.title} variants={fadeUp} transition={{ duration: 0.5 }}>
              <motion.a
                href="#contact"
                className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden h-full hover:shadow-elevated transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                      {cat.price}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-white font-bold text-lg">{cat.title}</h3>
                    <p className="text-white/70 text-xs mt-0.5">{cat.subtitle}</p>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">{cat.brands}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary-600 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <a href="#contact" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 text-sm transition-colors">
            View All Products & Get Custom Quote <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
