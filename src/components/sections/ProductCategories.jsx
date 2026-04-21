import { motion } from 'framer-motion'
import { ArrowRight, Snowflake, Wind, Gauge, Package } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { useScrollReveal, fadeUp, staggerContainer } from '../../hooks/useScrollReveal'
import { productCategories } from '../../constants/productCategories'

// Visual presentation metadata mapped onto the hard-coded category taxonomy.
const categoryVisuals = {
  'vrf-systems': {
    icon: Snowflake,
    image: 'https://images.unsplash.com/photo-1621274218049-7e92a1a760db?w=800&q=80&auto=format',
    highlight: 'VRF V Plus · VRF V S · VRF Lite',
  },
  'ducted-systems': {
    icon: Wind,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format',
    highlight: 'Inverter · Hot & Cold · Concealed · Hiper',
  },
  'chillers': {
    icon: Gauge,
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80&auto=format',
    highlight: 'Scroll · Screw · Centrifugal · Process · Data Centre',
  },
  'others': {
    icon: Package,
    image: 'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=800&q=80&auto=format',
    highlight: 'Condensing Units',
  },
}

export default function ProductCategories() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section id="products" className="py-20 md:py-28 bg-white">
      <Container>
        <SectionTitle
          subtitle="Our Product Range"
          title="Blue Star HVAC Solutions"
          description="Explore our full Blue Star product lineup — from multi-zone VRF systems to industrial chillers and condensing units."
        />

        <motion.div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {productCategories.map((cat) => {
            const v = categoryVisuals[cat.slug]
            const Icon = v?.icon ?? Package
            return (
              <motion.div key={cat.slug} variants={fadeUp} transition={{ duration: 0.5 }}>
                <motion.a
                  href="/products"
                  className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden h-full hover:shadow-elevated hover:border-primary-100 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={v?.image}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent" />
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-white/80 mb-1">
                        {cat.subcategories.length} Sub-categor{cat.subcategories.length === 1 ? 'y' : 'ies'}
                      </span>
                      <h3 className="text-white font-bold text-lg leading-tight">{cat.label}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">
                      {v?.highlight || cat.tagline}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-[11px] text-slate-400 font-medium">Blue Star</span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary-600 group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.a>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <a
            href="/products"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 text-sm transition-colors"
          >
            View Full Product Catalog <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
