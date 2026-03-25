import { motion } from 'framer-motion'
import { Phone, MessageCircle, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { siteConfig } from '../../utils/seo'
import { useScrollReveal, fadeUp } from '../../hooks/useScrollReveal'

const contactMethods = [
  {
    icon: Phone,
    label: 'Call Now',
    sublabel: 'Immediate Response',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
    color: 'bg-blue-500/10 text-blue-400',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    sublabel: 'Quick Quotes',
    value: 'Chat Now',
    href: `https://wa.me/${siteConfig.whatsapp}`,
    color: 'bg-green-500/10 text-green-400',
  },
  {
    icon: Mail,
    label: 'Email Us',
    sublabel: 'Detailed Queries',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    color: 'bg-amber-500/10 text-amber-400',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    sublabel: 'Free Site Visit',
    value: 'Get Directions',
    href: siteConfig.maps,
    color: 'bg-rose-500/10 text-rose-400',
  },
]

export default function CTASection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-50">
      <Container>
        <motion.div
          ref={ref}
          className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-slate-900 rounded-3xl overflow-hidden"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10 px-6 py-14 md:px-12 lg:px-16 md:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight"
                >
                  Ready to Get Started?
                </motion.h2>
                <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
                  className="text-lg text-primary-200 mb-8 max-w-lg"
                >
                  Get your free consultation and customized quote within 24 hours. Our experts are ready to help.
                </motion.p>
                <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex flex-wrap gap-3">
                  <Button variant="white" size="lg" icon={Phone} href={`tel:${siteConfig.phone}`}>
                    Call for Free Site Visit
                  </Button>
                  <Button variant="outline" size="lg"
                    className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    icon={MessageCircle}
                  >
                    WhatsApp Us
                  </Button>
                </motion.div>

                <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
                  className="mt-8 flex items-center gap-4 text-sm text-primary-300"
                >
                  <Clock className="w-4 h-4" />
                  <div>
                    <span className="block">Mon – Sat: 9:00 AM – 7:00 PM</span>
                    <span className="block text-primary-400">Emergency Service: 24/7 Available</span>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                <div className="grid grid-cols-2 gap-3">
                  {contactMethods.map((method) => (
                    <a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-xl p-4 hover:bg-white/[0.12] transition-all group"
                    >
                      <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center mb-3`}>
                        <method.icon className="w-5 h-5" />
                      </div>
                      <p className="text-white font-bold text-sm">{method.label}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{method.sublabel}</p>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
