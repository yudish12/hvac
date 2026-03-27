import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Puzzle,
  Users,
  Zap,
  Settings,
  Leaf,
  ArrowRight,
} from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'
import { siteConfig } from '../../utils/seo'
import { useScrollReveal, fadeUp, staggerContainer } from '../../hooks/useScrollReveal'

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Authorized Dealer',
    description: 'Official partnerships with Daikin, Mitsubishi Heavy, Carrier & 5+ brands ensure genuine products and valid warranties.',
  },
  {
    icon: Puzzle,
    title: 'Complete Turnkey Solutions',
    description: 'From consultation and system design to installation, commissioning, and after-sales — we handle everything.',
  },
  {
    icon: Users,
    title: '20+ Years Experience',
    description: 'Skilled technicians with decades of hands-on experience in residential, commercial, and industrial HVAC.',
  },
  {
    icon: Zap,
    title: 'Fast Response & Support',
    description: '24/7 emergency hotline, same-day service, and priority response for commercial installations.',
  },
  {
    icon: Settings,
    title: 'Customized Solutions',
    description: 'Tailored cooling designs based on site survey, load calculation, and your specific budget requirements.',
  },
  {
    icon: Leaf,
    title: 'Energy-Efficient Installations',
    description: 'Focus on inverter technology and sustainable solutions that reduce electricity bills by up to 50%.',
  },
]

export default function WhyChooseUs() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary-950/90" />
      </div>

      <Container className="relative z-10">
        <SectionTitle
          subtitle="Why Choose Us"
          title="Why Customers Trust Unitech Aircon"
          description="With 20+ years of expertise, 50,000+ installations, and official brand partnerships — we deliver unmatched HVAC solutions in Bareilly and across UP."
          light
        />

        <motion.div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="group bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 md:p-7 hover:bg-white/[0.12] transition-all duration-300 h-full"
                whileHover={{ y: -4 }}
              >
                <div className="w-11 h-11 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors">
                  <reason.icon className="w-5.5 h-5.5 text-primary-300" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{reason.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Button variant="white" size="lg" icon={ArrowRight} iconPosition="right" href="#contact">
            Schedule Free Consultation
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}
