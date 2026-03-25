import { motion } from 'framer-motion'
import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { useScrollReveal, fadeUp, staggerContainer } from '../../hooks/useScrollReveal'

const industries = [
  {
    title: 'Hotels & Restaurants',
    count: '80+',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80&auto=format',
  },
  {
    title: 'Hospitals & Clinics',
    count: '25+',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=80&auto=format',
  },
  {
    title: 'Corporate Offices',
    count: '200+',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80&auto=format',
  },
  {
    title: 'Retail & Showrooms',
    count: '150+',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80&auto=format',
  },
  {
    title: 'Schools & Colleges',
    count: '50+',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&q=80&auto=format',
  },
  {
    title: 'Industrial & Manufacturing',
    count: '50+',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=500&q=80&auto=format',
  },
  {
    title: 'Residential Homes',
    count: '10,000+',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80&auto=format',
  },
  {
    title: 'Gyms & Fitness Centers',
    count: '40+',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80&auto=format',
  },
]

export default function IndustriesWeServe() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section id="industries" className="py-20 md:py-28 bg-white">
      <Container>
        <SectionTitle
          subtitle="Industries We Serve"
          title="HVAC Solutions Across Sectors"
          description="From residential homes to large commercial projects, we've delivered cooling solutions across diverse industries."
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {industries.map((industry) => (
            <motion.div key={industry.title} variants={fadeUp} transition={{ duration: 0.5 }}>
              <motion.div
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3]"
                whileHover={{ y: -4 }}
              >
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent group-hover:from-primary-900/80 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white/70 text-xs font-bold">{industry.count} projects</span>
                  <h4 className="text-white font-bold text-sm mt-0.5">{industry.title}</h4>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
