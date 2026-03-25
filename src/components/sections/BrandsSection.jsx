import { motion } from 'framer-motion'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { useScrollReveal, fadeUp, staggerContainer } from '../../hooks/useScrollReveal'

const brands = [
  {
    name: 'Daikin',
    tagline: 'Premium VRV Systems',
    logo: 'https://companieslogo.com/img/orig/6367.T_BIG-424af662.png?t=1720244490',
    color: 'bg-[#009B3A]/5 border-[#009B3A]/10 hover:border-[#009B3A]/30',
  },
  {
    name: 'Mitsubishi Heavy',
    tagline: 'Heavy Duty Commercial',
    logo: 'https://companieslogo.com/img/orig/7011.T_BIG-4c3d08c9.png?t=1768276988',
    color: 'bg-red-50/50 border-red-100 hover:border-red-200',
  },
  {
    name: 'Carrier',
    tagline: 'Reliable Cooling',
    logo: 'https://companieslogo.com/img/orig/CARR_BIG-5356fab5.png?t=1720244491',
    color: 'bg-blue-50/50 border-blue-100 hover:border-blue-200',
  },
  {
    name: 'Voltas',
    tagline: "India's No.1 AC",
    logo: 'https://companieslogo.com/img/orig/VOLTAS.NS_BIG-497c76bb.png?t=1721129223',
    color: 'bg-orange-50/50 border-orange-100 hover:border-orange-200',
  },
  {
    name: 'Amstrad',
    tagline: 'Quality + Value',
    logo: null,
    fallback: 'AMSTRAD',
    fallbackColor: 'text-purple-700',
    color: 'bg-purple-50/50 border-purple-100 hover:border-purple-200',
  },
  {
    name: 'Midea',
    tagline: 'Economical & Smart',
    logo: 'https://companieslogo.com/img/orig/000333.SZ_BIG-c23d6334.png?t=1720244489',
    color: 'bg-sky-50/50 border-sky-100 hover:border-sky-200',
  },
  {
    name: 'Godrej',
    tagline: "India's Most Economical",
    logo: 'https://companieslogo.com/img/orig/GODREJCP.NS-b269802a.png?t=1720244492',
    color: 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-200',
  },
  {
    name: 'Cruise',
    tagline: 'Portable & Heavy Duty',
    logo: null,
    fallback: 'CRUISE',
    fallbackColor: 'text-indigo-600',
    color: 'bg-indigo-50/50 border-indigo-100 hover:border-indigo-200',
  },
]

export default function BrandsSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <Container>
        <SectionTitle
          subtitle="Authorized Dealer"
          title="Trusted Partners, Genuine Products"
          description="We are proud partners with top air conditioning manufacturers, offering genuine products with full warranty coverage."
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className={`rounded-xl border p-5 md:p-6 text-center transition-all duration-300 cursor-pointer ${brand.color} hover:shadow-card`}
                whileHover={{ y: -3 }}
              >
                <div className="h-12 mx-auto mb-3 flex items-center justify-center px-2">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className={`text-lg font-extrabold tracking-tight ${brand.fallbackColor}`}>
                      {brand.fallback}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{brand.name}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{brand.tagline}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
            Get Brand-Specific Quote →
          </a>
          <a href="#products" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
            View All Products →
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
