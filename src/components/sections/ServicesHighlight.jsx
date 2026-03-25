import { motion } from 'framer-motion'
import { Wrench, ClipboardCheck, Eye, Headphones, ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { useScrollReveal, fadeUp, staggerContainer } from '../../hooks/useScrollReveal'

const services = [
  {
    icon: Wrench,
    title: 'Expert Installation',
    description: 'Professional AC installation by certified technicians with proper commissioning.',
    features: ['Proper sizing calculation', 'Quality copper piping', 'Gas charging & testing'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80&auto=format',
  },
  {
    icon: ClipboardCheck,
    title: 'Maintenance & Repair',
    description: 'Regular servicing, repairs, and AMC contracts to keep your ACs running efficiently.',
    features: ['Deep cleaning service', 'Gas refilling', 'Spare parts replacement'],
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format',
  },
  {
    icon: Eye,
    title: 'Free Site Visit',
    description: 'Complimentary site survey and consultation for all residential and commercial projects.',
    features: ['Load calculation', 'System design', 'Cost estimation'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80&auto=format',
  },
  {
    icon: Headphones,
    title: '24/7 Emergency Service',
    description: 'Round-the-clock support for critical commercial installations and urgent repairs.',
    features: ['Emergency hotline', 'Same-day service', 'Priority response'],
    image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&q=80&auto=format',
  },
]

export default function ServicesHighlight() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section id="services" className="py-20 md:py-28 bg-slate-50">
      <Container>
        <SectionTitle
          subtitle="Professional Services"
          title="Complete HVAC Solutions"
          description="From installation to maintenance, our expert team ensures your comfort with reliable, efficient air conditioning solutions."
        />

        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden h-full hover:shadow-elevated transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-500 text-sm mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
