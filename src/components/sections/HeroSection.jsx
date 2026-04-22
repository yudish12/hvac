import { motion } from 'framer-motion'
import { ArrowRight, Phone, CheckCircle2, Star, MapPin } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { siteConfig } from '../../utils/seo'

const trustBadges = [
  'Free Site Visit & Consultation',
  'Expert Installation Team',
  'Pan Uttar Pradesh Service',
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 min-h-[92vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80&auto=format"
          alt="Modern commercial HVAC systems"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-primary-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
      </div>

      <Container className="relative z-10 py-20 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-accent-400 fill-accent-400" />
                <span className="text-accent-400 font-bold">4.8</span>
              </span>
              <span className="w-px h-4 bg-white/20" />
              <span>Trusted by 250+ Clients across Lucknow, Ayodhya, Gorakhpur & Varanasi</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-white leading-[1.08] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Professional{' '}
              <span className="text-gradient">HVAC Solutions</span>{' '}
              & Air Conditioning Services
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Authorized partner of <strong className="text-white">Blue Star</strong>. Expert HVAC installation, servicing & turnkey commercial projects across Lucknow, Ayodhya, Gorakhpur & Varanasi.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button size="lg" href={`tel:${siteConfig.phone}`} icon={Phone}>
                Call Now – Free Consultation
              </Button>
              <Button variant="outline" size="lg" href="#products" icon={ArrowRight} iconPosition="right"
                className="border-white/25 text-white hover:bg-white/10 hover:text-white"
              >
                View Products
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {trustBadges.map((badge) => (
                <span key={badge} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Stats Card */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-8 md:p-10">
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { value: '50,000+', label: 'AC Installations' },
                  { value: '412+', label: 'Projects Completed' },
                  { value: '20+', label: 'Years Experience' },
                  { value: '24/7', label: 'Support Available' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <div className="text-2xl md:text-3xl font-extrabold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Contact */}
              <div className="space-y-3">
                <a href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Immediate Response</p>
                    <p className="text-white font-bold">{siteConfig.phone}</p>
                  </div>
                </a>
                <a href={`https://wa.me/${siteConfig.whatsapp}`}
                  className="flex items-center gap-3 p-3.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.523 5.857L0 24l6.335-1.652A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.97 0-3.837-.528-5.447-1.49l-.39-.232-3.762.982.999-3.648-.254-.404A9.71 9.71 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] text-green-300/70 font-medium uppercase tracking-wide">Quick Quotes</p>
                    <p className="text-green-300 font-bold">WhatsApp Us</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
