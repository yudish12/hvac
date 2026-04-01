import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { siteConfig } from '../utils/seo'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '../hooks/useScrollReveal'

const industries = [
  {
    title: 'Hotels & Restaurants',
    desc: 'Guest comfort with exceptional energy efficiency. VRV systems with individual room control, heat recovery for hot water, and premium guest experiences.',
    solutions: ['VRV / VRF multi-zone systems', 'Kitchen ventilation & exhaust', 'Cold rooms for food storage', 'Heat pumps for hot water', 'Centralized BMS control'],
    projects: '80+', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80&auto=format',
  },
  {
    title: 'Hospitals & Healthcare',
    desc: 'Precise temperature and air quality control for OTs, ICUs, patient wards, and pharmacies. HEPA filtration and infection control compliant systems.',
    solutions: ['Modular OT with laminar airflow', 'Precision cooling for labs', 'Ward-wise temperature zoning', 'Chiller plants for large facilities', 'Air handling units with HEPA'],
    projects: '25+', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=80&auto=format',
  },
  {
    title: 'Corporate Offices & IT Parks',
    desc: 'Optimized climate control for productivity and comfort. Centralized systems with zonal control, energy monitoring, and smart automation.',
    solutions: ['VRV systems for multi-floor offices', 'Cassette & ductable ACs', 'Fresh air ventilation (HRV)', 'Server room precision cooling', 'Energy management systems'],
    projects: '200+', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80&auto=format',
  },
  {
    title: 'Retail & Showrooms',
    desc: 'Comfortable shopping environments with reliable, aesthetic cooling systems that blend into modern retail interiors.',
    solutions: ['Cassette ACs for open layouts', 'Floor standing units for large areas', 'Split ACs for individual sections', 'Energy-efficient inverter systems', 'AMC for uninterrupted operation'],
    projects: '150+', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80&auto=format',
  },
  {
    title: 'Educational Institutions',
    desc: 'Zone-wise climate control for classrooms, auditoriums, labs, and administrative blocks. Operate only occupied areas for maximum savings.',
    solutions: ['Classroom-wise split AC systems', 'VRV for multi-building campuses', 'Auditorium ductable cooling', 'Lab precision temperature control', 'Smart scheduling & control'],
    projects: '50+', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=80&auto=format',
  },
  {
    title: 'Industrial & Manufacturing',
    desc: 'Heavy-duty cooling for production floors, warehouses, and process-critical environments requiring precise temperature management.',
    solutions: ['Chiller systems for process cooling', 'Cold rooms & walk-in freezers', 'AHU systems for large spaces', 'Ventilation for hazardous areas', 'Temperature monitoring systems'],
    projects: '50+', image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=700&q=80&auto=format',
  },
  {
    title: 'Residential Homes',
    desc: 'Energy-efficient cooling for homes and apartments of all sizes. From single-room split ACs to whole-home VRV systems.',
    solutions: ['Inverter split ACs (1–2 Ton)', 'VRV Home for luxury villas', 'Air purifiers & water softeners', 'Annual maintenance contracts', 'Smart thermostat integration'],
    projects: '10,000+', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80&auto=format',
  },
  {
    title: 'Gyms & Fitness Centers',
    desc: 'High-capacity cooling for workout areas, swimming pool dehumidification, and locker room ventilation.',
    solutions: ['High-capacity ductable ACs', 'Fresh air ventilation systems', 'Dehumidification solutions', 'Heat pumps for pool heating', 'Energy-efficient operation'],
    projects: '40+', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=80&auto=format',
  },
]

export default function IndustriesPage() {
  const { ref, isInView } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>Industries We Serve – Hotels, Hospitals, Offices, Factories | Unitech Aircon</title>
        <meta name="description" content="HVAC solutions for hotels, hospitals, offices, retail, schools, factories & homes. 50,000+ installations across Uttar Pradesh. Industry-specific expertise." />
        <meta property="og:title" content="Industries We Serve – Unitech Aircon" />
        <link rel="canonical" href={`${siteConfig.url}/industries`} />
      </Helmet>

      <PageHero
        subtitle="Industries"
        title="HVAC Solutions Across Sectors"
        description="From residential homes to industrial cold storage — our expertise spans across every sector that needs reliable climate control."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&auto=format"
      />

      <section className="py-20 md:py-28 bg-white">
        <Container>
          <motion.div ref={ref} className="space-y-12" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}>
            {industries.map((ind, i) => (
              <motion.div key={ind.title} variants={fadeUp} transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-5 gap-8 items-center bg-slate-50 rounded-2xl overflow-hidden border border-slate-100`}
              >
                <div className={`lg:col-span-2 h-64 lg:h-full ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img src={ind.image} alt={ind.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className={`lg:col-span-3 p-6 md:p-8 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-slate-900">{ind.title}</h3>
                    <span className="text-[11px] bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-bold">{ind.projects} projects</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed">{ind.desc}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {ind.solutions.map((s) => (
                      <span key={s} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" /> {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="py-16 md:py-20 bg-primary-600">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Have a Project in Mind?</h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">Tell us about your industry and requirements — we'll design the perfect HVAC solution.</p>
          <Button variant="white" size="lg" href="/contact">Discuss Your Project</Button>
        </Container>
      </section>
    </>
  )
}
