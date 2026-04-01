import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Wrench, ClipboardCheck, AlertTriangle, FileCheck, Eye, Headphones, CheckCircle2, ArrowRight } from 'lucide-react'
import { siteConfig } from '../utils/seo'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '../hooks/useScrollReveal'

const services = [
  {
    icon: Wrench,
    title: 'AC Installation',
    desc: 'Professional installation by certified HVAC technicians with proper commissioning and testing.',
    features: ['Site inspection & load calculation', 'Custom system design & layout', 'Quality copper piping & fittings', 'Gas charging, leak testing & commissioning', 'Electrical wiring & safety checks'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80&auto=format',
  },
  {
    icon: ClipboardCheck,
    title: 'Maintenance & Servicing',
    desc: 'Regular servicing to keep your HVAC systems running at peak efficiency all year round.',
    features: ['Deep cleaning of filters & coils', 'Gas pressure & refrigerant checks', 'Performance optimization', 'Electrical connection inspection', 'Condensate drain cleaning'],
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format',
  },
  {
    icon: AlertTriangle,
    title: 'Repair & Breakdown',
    desc: 'Quick fault detection and repair services to minimize downtime and restore comfort.',
    features: ['Same-day diagnostics', 'Compressor & motor repair', 'PCB & sensor replacement', 'Refrigerant leak repair', 'Genuine spare parts'],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80&auto=format',
  },
  {
    icon: FileCheck,
    title: 'Annual Maintenance Contract (AMC)',
    desc: 'Comprehensive AMC plans for worry-free HVAC operation with priority support and cost savings.',
    features: ['Scheduled preventive maintenance', 'Reduced breakdown risk', 'Priority emergency response', 'Discounted spare parts', 'Dedicated account manager'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80&auto=format',
  },
  {
    icon: Eye,
    title: 'Free Site Visit & Consultation',
    desc: 'Complimentary on-site survey, load calculation, and system recommendation for any project.',
    features: ['Space & requirement assessment', 'Heat load calculation', 'System design & recommendation', 'Cost estimation & timeline', 'No-obligation consultation'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format',
  },
  {
    icon: Headphones,
    title: '24/7 Emergency Support',
    desc: 'Round-the-clock support for critical commercial installations and urgent breakdown situations.',
    features: ['Emergency hotline', 'Same-day dispatch', 'Priority for AMC customers', 'Critical system recovery', 'Minimal downtime guarantee'],
    image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&q=80&auto=format',
  },
]

export default function ServicesPage() {
  const { ref, isInView } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>HVAC Services – Installation, AMC, Repair | Unitech Aircon Bareilly</title>
        <meta name="description" content="Professional AC installation, annual maintenance contracts, repair services & 24/7 emergency support. Certified HVAC technicians in Bareilly, UP." />
        <meta property="og:title" content="HVAC Services – Unitech Aircon" />
        <meta property="og:description" content="Complete HVAC services from installation to maintenance. Free site visits, AMC plans, and 24/7 emergency support." />
        <link rel="canonical" href={`${siteConfig.url}/services`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          provider: { '@type': 'LocalBusiness', name: siteConfig.name },
          serviceType: 'HVAC Installation and Maintenance',
          areaServed: { '@type': 'State', name: 'Uttar Pradesh' },
        })}</script>
      </Helmet>

      <PageHero
        subtitle="Our Services"
        title="Professional HVAC Services"
        description="From installation to maintenance, our certified team delivers reliable, efficient air conditioning solutions with 24/7 support."
        image="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80&auto=format"
      />

      <section className="py-20 md:py-28 bg-white">
        <Container>
          <motion.div ref={ref} className="space-y-16" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}>
            {services.map((service, i) => (
              <motion.div key={service.title} variants={fadeUp} transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative rounded-2xl overflow-hidden shadow-card">
                    <img src={service.image} alt={service.title} className="w-full h-64 md:h-80 object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-500 mb-5 leading-relaxed">{service.desc}</p>
                  <ul className="space-y-2.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="py-16 md:py-20 bg-primary-600">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Need HVAC Service?</h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">Get a free site visit and consultation from our certified technicians.</p>
          <Button variant="white" size="lg" icon={ArrowRight} iconPosition="right" href="/contact">Book Free Site Visit</Button>
        </Container>
      </section>
    </>
  )
}
