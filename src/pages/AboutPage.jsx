import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Award, Target, Eye, Wrench, Package, Settings, HeartHandshake, Users, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react'
import { siteConfig } from '../utils/seo'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '../hooks/useScrollReveal'

const expertise = [
  { icon: Settings, title: 'HVAC System Design', desc: 'Custom load calculations and system blueprints tailored to your space for optimal airflow and efficiency.' },
  { icon: Package, title: 'Product Distribution', desc: 'Authorized distribution of genuine products from Daikin, Mitsubishi Heavy, Carrier, Voltas, and more.' },
  { icon: Wrench, title: 'Installation & Commissioning', desc: 'Professional installation with quality copper piping, gas charging, testing, and full commissioning.' },
  { icon: HeartHandshake, title: 'Maintenance & Repairs', desc: 'Scheduled servicing, deep cleaning, gas refilling, spare parts, and 24/7 emergency breakdown support.' },
]

const strengths = [
  { value: '20+', label: 'Years of Industry Experience' },
  { value: '50,000+', label: 'Successful Installations' },
  { value: '412+', label: 'Commercial Projects' },
  { value: '8+', label: 'Brand Partnerships' },
]

const values = [
  { icon: Users, title: 'Experienced Workforce', desc: 'Certified HVAC technicians with hands-on expertise across residential, commercial, and industrial projects.' },
  { icon: ShieldCheck, title: 'Strong Brand Partnerships', desc: 'Official authorized dealer for Daikin, Mitsubishi Heavy, Carrier, Voltas, Godrej, Midea, and more.' },
  { icon: TrendingUp, title: 'Proven Track Record', desc: 'Over 50,000 installations and 412+ commercial projects delivered across Uttar Pradesh.' },
  { icon: HeartHandshake, title: 'Customer-First Approach', desc: 'Free site visits, transparent pricing, after-sales support, and 24/7 emergency service.' },
]

export default function AboutPage() {
  const { ref: expRef, isInView: expInView } = useScrollReveal()
  const { ref: valRef, isInView: valInView } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>About Unitech Aircon – Trusted HVAC Experts in Bareilly, UP</title>
        <meta name="description" content="Learn about Unitech Aircon – 20+ years of HVAC expertise in Bareilly. Authorized dealer for Daikin, Mitsubishi, Carrier. 50,000+ installations across Uttar Pradesh." />
        <meta property="og:title" content="About Unitech Aircon – Trusted HVAC Experts" />
        <meta property="og:description" content="20+ years delivering reliable HVAC solutions. Authorized dealer for top brands with 50,000+ installations across UP." />
        <link rel="canonical" href={`${siteConfig.url}/about`} />
      </Helmet>

      <PageHero
        subtitle="About Us"
        title="Your Trusted HVAC Partner Since 2004"
        description="Delivering high-quality cooling solutions tailored to modern residential, commercial, and industrial needs across Uttar Pradesh."
        image="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80&auto=format"
      />

      {/* Our Story */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-3 block">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Built on Expertise, Driven by Trust
              </h2>
              <div className="space-y-4 text-slate-500 leading-relaxed">
                <p>
                  Founded with a vision to simplify climate control for every space, Unitech Aircon has grown from a local AC dealer into one of the most trusted HVAC contractors in Uttar Pradesh. For over two decades, we have been helping homeowners, businesses, hospitals, hotels, and industrial facilities achieve optimal comfort and energy efficiency.
                </p>
                <p>
                  We combine deep technical expertise with genuine brand partnerships — serving as authorized dealers for Daikin, Mitsubishi Heavy Industries, Carrier, Voltas, Godrej, Midea, and more. From initial consultation and system design to professional installation and long-term maintenance, we handle every aspect of the HVAC lifecycle.
                </p>
                <p>
                  Today, with over <strong className="text-slate-700">50,000 successful installations</strong> and <strong className="text-slate-700">412+ commercial projects</strong>, we remain committed to delivering solutions that are efficient, reliable, and built to last.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {strengths.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="bg-primary-50 rounded-2xl p-6 text-center border border-primary-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-3xl font-extrabold text-primary-600 mb-1">{s.value}</div>
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-slate-50">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white rounded-2xl p-8 md:p-10 border border-slate-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-500 leading-relaxed">
                To provide efficient, reliable, and sustainable cooling solutions backed by expert service, genuine products, and continuous innovation — ensuring every client experiences comfort they can depend on.
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-2xl p-8 md:p-10 border border-slate-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-secondary-50 rounded-xl flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-500 leading-relaxed">
                To become a leading HVAC solutions provider across India — setting benchmarks in quality, energy efficiency, service excellence, and technology adoption for residential and commercial climate control.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Our Expertise */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <SectionTitle subtitle="What We Do" title="Our Core Expertise" description="End-to-end HVAC capabilities from design to long-term maintenance." />
          <motion.div
            ref={expRef}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate={expInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {expertise.map((item) => (
              <motion.div key={item.title} variants={fadeUp} transition={{ duration: 0.5 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-card transition-shadow"
              >
                <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Our Strengths */}
      <section className="py-20 md:py-28 bg-slate-50">
        <Container>
          <SectionTitle subtitle="Why Us" title="Our Strengths" description="What sets Unitech Aircon apart from the rest." />
          <motion.div
            ref={valRef}
            className="grid sm:grid-cols-2 gap-6"
            initial="hidden"
            animate={valInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeUp} transition={{ duration: 0.5 }}
                className="flex gap-4 bg-white rounded-2xl p-6 border border-slate-100"
              >
                <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                  <v.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{v.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary-600">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">Get a free consultation and site visit from our HVAC experts.</p>
          <Button variant="white" size="lg" href="/contact">Schedule Free Consultation</Button>
        </Container>
      </section>
    </>
  )
}
