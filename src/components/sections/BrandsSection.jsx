import { motion } from 'framer-motion'
import { BadgeCheck, ShieldCheck, Award, Wrench, ArrowRight, Star } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { useScrollReveal, fadeUp, staggerContainer } from '../../hooks/useScrollReveal'

const partnerBenefits = [
  {
    icon: BadgeCheck,
    title: 'Authorized Partner',
    desc: 'Official authorized sales and service partner for Blue Star HVAC systems.',
  },
  {
    icon: ShieldCheck,
    title: '100% Genuine Products',
    desc: 'Every unit, spare, and component supplied comes with full manufacturer warranty.',
  },
  {
    icon: Wrench,
    title: 'Certified Installation',
    desc: 'Trained engineers and technicians following Blue Star installation standards.',
  },
  {
    icon: Award,
    title: 'Trusted Indian Brand',
    desc: "One of India's most trusted names in commercial air-conditioning and cooling.",
  },
]

const productLineup = [
  { label: 'Room Air Conditioners' },
  { label: 'VRF Systems' },
  { label: 'Chillers' },
  { label: 'Ductable & Packaged' },
  { label: 'Cold Rooms' },
  { label: 'Water Coolers' },
]

export default function BrandsSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <Container>
        <SectionTitle
          subtitle="Authorized Partner"
          title="Proud Partners of Blue Star"
          description="We are an authorized partner of Blue Star — delivering genuine products, certified installation, and reliable after-sales service backed by one of India's most trusted HVAC brands."
        />

        <motion.div
          ref={ref}
          className="grid lg:grid-cols-12 gap-8 items-stretch"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {/* Brand Showcase Card */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative h-full rounded-3xl bg-gradient-to-br from-[#0057A8] via-[#003F7D] to-[#001F4D] p-8 md:p-10 overflow-hidden shadow-elevated">
              {/* Decorative glows */}
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />

              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              />

              <div className="relative flex flex-col h-full">
                <div className="inline-flex self-start items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-3 py-1 text-xs font-semibold text-white uppercase tracking-wider mb-6">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Authorized Partner
                </div>

                {/* Logo plate */}
                <div className="bg-white rounded-2xl px-8 py-10 flex items-center justify-center mb-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]">
                  <img
                    src="/bluestar-logo.png"
                    alt="Blue Star — official logo"
                    className="max-h-16 md:max-h-20 w-auto object-contain"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                  Blue Star Limited
                </h3>
                <p className="text-blue-100/90 leading-relaxed text-sm md:text-base mb-6">
                  India's leading air-conditioning and commercial refrigeration company — known for
                  engineering excellence, energy efficiency, and dependable performance across
                  residential, commercial, and industrial applications.
                </p>

                {/* Credibility chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs font-medium text-white">
                    <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                    75+ Years in HVAC
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs font-medium text-white">
                    Made in India
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs font-medium text-white">
                    ISO Certified
                  </span>
                </div>

                <a
                  href="/contact"
                  className="mt-auto inline-flex self-start items-center gap-2 bg-white text-[#003F7D] font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Get a Blue Star Quote
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Partnership Benefits + Product lineup */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {partnerBenefits.map((b) => (
                <motion.div
                  key={b.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -3 }}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-primary-100 hover:shadow-card transition-all"
                >
                  <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                    <b.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1.5">{b.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary-50 via-white to-secondary-50 border border-slate-100 rounded-2xl p-6"
            >
              <p className="text-xs font-semibold tracking-wider uppercase text-primary-600 mb-3">
                Blue Star Product Lineup We Supply & Service
              </p>
              <div className="flex flex-wrap gap-2">
                {productLineup.map((p) => (
                  <span
                    key={p.label}
                    className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-sm font-medium text-slate-700"
                  >
                    <BadgeCheck className="w-3.5 h-3.5 text-primary-600" />
                    {p.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
