import { motion } from 'framer-motion'
import { Star, Quote, MapPin } from 'lucide-react'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { useScrollReveal, fadeUp, staggerContainer } from '../../hooks/useScrollReveal'

const testimonials = [
  {
    name: 'Rajesh Gupta',
    role: 'Hotel Owner',
    location: 'Lucknow',
    text: 'Unitech Aircon installed Blue Star VRF systems across our entire hotel. The team was professional, delivery was on time, and the after-sales support has been exceptional. Highly recommend for commercial projects.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format',
    project: 'VRF System – 45 Room Hotel',
  },
  {
    name: 'Priya Sharma',
    role: 'Branch Manager',
    location: 'Hazratganj, Lucknow',
    text: 'Unitech Aircon handled the HVAC setup and AMC for our bank branch. The engineers were punctual, documentation was thorough, and the systems have been running smoothly ever since.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format',
    project: 'Ducted AC + Annual Maintenance',
  },
  {
    name: 'Ankit Agarwal',
    role: 'IT Company Director',
    location: 'Gomti Nagar, Lucknow',
    text: 'We chose Unitech Aircon for our office central AC project. From site survey to final commissioning, everything was handled smoothly. Their AMC service keeps our systems running perfectly year-round.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80&auto=format',
    project: 'Ductable AC – 5000 sq ft Office',
  },
  {
    name: 'Dr. Vivek Mishra',
    role: 'Hospital Administrator',
    location: 'Ayodhya',
    text: 'They designed and installed the complete HVAC solution for our hospital including the modular OT. The air quality standards are met perfectly. Responsive 24/7 support gives us peace of mind.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80&auto=format',
    project: 'Hospital HVAC + Modular OT',
  },
]

const platforms = [
  {
    name: 'Google Reviews',
    rating: '4.8',
    reviews: '250+',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'JustDial',
    rating: '4.7',
    reviews: '400+',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    name: 'IndiaMART',
    rating: '4.9',
    reviews: 'Trusted Seller',
    color: 'text-blue-800',
    bgColor: 'bg-blue-50',
  },
]

export default function TestimonialsSection() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <Container>
        <SectionTitle
          subtitle="Customer Reviews"
          title="Trusted by 10,000+ Clients"
          description="From residential homes to large commercial projects, see what our customers say about our service."
        />

        {/* Platform Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className={`${platform.bgColor} rounded-xl px-5 py-3 flex items-center gap-3 border border-slate-100`}
            >
              <div>
                <p className={`text-sm font-bold ${platform.color}`}>{platform.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{platform.rating} • {platform.reviews}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 gap-5"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 h-full hover:shadow-card transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-100"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                      <p className="text-xs text-slate-500">{t.role}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5" /> {t.location}
                      </p>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-primary-100" />
                </div>

                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-4">{t.text}</p>

                <div className="pt-3 border-t border-slate-50">
                  <span className="text-[11px] font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">
                    {t.project}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
