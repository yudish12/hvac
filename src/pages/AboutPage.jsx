import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Target,
  Eye,
  Wrench,
  Settings,
  HeartHandshake,
  Users,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Leaf,
  Warehouse,
  Building2,
  Snowflake,
  Gauge,
  Factory,
  BadgeCheck,
  Compass,
  ArrowRight,
} from 'lucide-react'
import { siteConfig } from '../utils/seo'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'
import { useScrollReveal, fadeUp, staggerContainer } from '../hooks/useScrollReveal'

const missionPoints = [
  'Deliver reliable and efficient HVAC solutions tailored to client requirements.',
  'Maintain the highest standards of quality, safety, and professionalism.',
  'Adopt advanced technologies and energy-efficient systems.',
  'Build long-term partnerships with clients based on trust and transparency.',
]

const strengths = [
  {
    icon: BadgeCheck,
    title: 'Two Decades of Industry Experience',
    desc: 'Proven expertise in HVAC installation, service, and end-to-end project execution.',
  },
  {
    icon: Users,
    title: 'Technical Expertise',
    desc: 'Trained engineers and skilled technicians capable of handling diverse HVAC systems.',
  },
  {
    icon: MapPin,
    title: 'Strong Regional Presence',
    desc: 'Operational coverage across Ayodhya, Lucknow, Gorakhpur, and Varanasi for quick response.',
  },
  {
    icon: Wrench,
    title: 'Reliable Service Network',
    desc: 'Prompt maintenance and operational support you can count on, year after year.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality & Safety Standards',
    desc: 'Strict adherence to industry guidelines, safety regulations, and engineering best practices.',
  },
  {
    icon: HeartHandshake,
    title: 'Client-Centric Approach',
    desc: 'Customized and efficient HVAC solutions designed around your building and operational needs.',
  },
  {
    icon: Building2,
    title: 'Proven Track Record',
    desc: 'Trusted by corporate, banking, institutional, and government clients across the region.',
  },
]

const services = [
  {
    icon: Settings,
    title: 'HVAC Turnkey Projects',
    desc: 'Design, supply, installation, and commissioning of complete HVAC systems.',
  },
  {
    icon: Snowflake,
    title: 'VRF Systems',
    desc: 'Installation and servicing of advanced Variable Refrigerant Flow systems.',
  },
  {
    icon: Gauge,
    title: 'Central AC & Chiller Systems',
    desc: 'Installation and maintenance of chilled water plants and central air-conditioning.',
  },
  {
    icon: Factory,
    title: 'Package Units & Ductable Systems',
    desc: 'Installation and maintenance of packaged and ducted air-conditioning units.',
  },
  {
    icon: Wrench,
    title: 'Annual Maintenance Contracts',
    desc: 'Preventive and corrective maintenance services for all air-conditioning systems.',
  },
  {
    icon: Building2,
    title: 'Institutional HVAC Maintenance',
    desc: 'Specialized HVAC services for banks, offices, and institutional facilities.',
  },
]

const qualityPolicy = [
  'Providing safe working conditions for employees and technicians.',
  'Compliance with industry standards and safety regulations.',
  'Continuous training for staff on safe installation and maintenance practices.',
  'Delivering HVAC solutions that meet quality and reliability benchmarks.',
  'Continuous improvement in operational processes.',
]

const infrastructure = [
  { icon: Users, text: 'Experienced engineering and technical teams.' },
  { icon: Warehouse, text: 'Organized warehouse stocking Ducted, Package, VRF, and Room Reconditioners along with spare parts.' },
  { icon: HeartHandshake, text: 'Organized service and maintenance support system.' },
  { icon: Wrench, text: 'Modern tools, testing equipment, and service resources.' },
  { icon: Gauge, text: 'Efficient manpower deployment and quick response mechanism.' },
  { icon: MapPin, text: 'Regional operational coverage across Lucknow, Ayodhya, Gorakhpur, and Varanasi.' },
]

const sustainability = [
  'Promoting energy-efficient HVAC technologies.',
  'Designing systems that optimize energy consumption and operational efficiency.',
  'Encouraging sustainable engineering practices.',
  'Implementing preventive maintenance strategies to enhance equipment life and performance.',
  'Supporting environmentally responsible solutions for a sustainable future.',
]

const cities = ['Lucknow', 'Ayodhya', 'Gorakhpur', 'Varanasi']

export default function AboutPage() {
  const { ref: strRef, isInView: strInView } = useScrollReveal()
  const { ref: svcRef, isInView: svcInView } = useScrollReveal()
  const { ref: infraRef, isInView: infraInView } = useScrollReveal()

  return (
    <>
      <Helmet>
        <title>About Unitech Aircon – Professional HVAC Engineering & Service Company</title>
        <meta
          name="description"
          content="Unitech Aircon is a professionally managed HVAC engineering and service company with 20+ years of experience delivering reliable, energy-efficient air-conditioning solutions across Lucknow, Ayodhya, Gorakhpur, and Varanasi."
        />
        <meta property="og:title" content="About Unitech Aircon – HVAC Engineering & Service" />
        <meta
          property="og:description"
          content="Two decades of HVAC expertise serving corporate, banking, institutional, and government clients across Uttar Pradesh."
        />
        <link rel="canonical" href={`${siteConfig.url}/about`} />
      </Helmet>

      <PageHero
        subtitle="About Us"
        title="Reliable HVAC Engineering for Over Two Decades"
        description="A professionally managed HVAC engineering and service company delivering energy-efficient, technologically advanced air-conditioning solutions."
        image="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80&auto=format"
      />

      {/* About the Company */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <span className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-3 block">
                About the Company
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Engineering Comfort Through Expertise & Reliability
              </h2>
              <div className="space-y-5 text-slate-500 leading-relaxed">
                <p>
                  <strong className="text-slate-700">Unitech Aircon</strong> is a professionally managed
                  HVAC engineering and service company with more than two decades of experience in
                  delivering reliable, energy-efficient, and technologically advanced air-conditioning
                  solutions.
                </p>
                <p>
                  We specialize in the design, installation, operation, and maintenance of HVAC systems
                  for commercial buildings, banking institutions, industrial facilities, healthcare
                  centres, educational institutions, and government organizations.
                </p>
                <p>
                  Over the years, the company has established a strong reputation for technical
                  competence, dependable service support, and timely execution of projects and
                  maintenance contracts. Our experienced engineers, supervisors, and skilled technicians
                  ensure that each project is executed in accordance with industry standards, safety
                  practices, and client specifications.
                </p>
                <p>
                  With a strong commitment to quality workmanship, modern technology, and customer
                  satisfaction, Unitech Aircon continues to deliver sustainable and cost-effective
                  climate control solutions.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '20+', label: 'Years of HVAC Experience' },
                  { value: '4', label: 'Cities of Operation' },
                  { value: '100%', label: 'Client-Focused Service' },
                  { value: 'Gov+', label: 'Corporate & Institutional Trust' },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="bg-primary-50 rounded-2xl p-6 text-center border border-primary-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="text-3xl font-extrabold text-primary-600 mb-1">{s.value}</div>
                    <p className="text-xs text-slate-500 font-medium leading-snug">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 bg-gradient-to-br from-primary-950 to-primary-800 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Compass className="w-5 h-5 text-primary-200" />
                  <h4 className="font-semibold tracking-wide uppercase text-sm text-primary-200">
                    Regional Presence
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 backdrop-blur px-3 py-1.5 rounded-full text-sm font-medium"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Director's Profile */}
      <section className="py-20 md:py-28 bg-slate-50">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-24 h-24 bg-primary-100 rounded-2xl z-0" />
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-secondary-100 rounded-2xl z-0" />
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-elevated border border-white bg-white">
                  <img
                    src="/director-satyendra-singh.jpeg"
                    alt="Mr. Satyendra Singh, Director of Unitech Aircon"
                    className="w-full h-[460px] md:h-[520px] object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-3 block">
                Director's Profile
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
                Mr. Satyendra Singh
              </h2>
              <p className="text-primary-600 font-semibold mb-6">Director, Unitech Aircon</p>

              <div className="space-y-4 text-slate-500 leading-relaxed">
                <p>
                  Mr. Satyendra Singh is a dynamic entrepreneur with over{' '}
                  <strong className="text-slate-700">20 years of experience</strong> in the HVAC industry.
                </p>
                <p>
                  Under his leadership, the company has steadily expanded its operations and developed a
                  strong reputation for technical expertise, reliable service delivery, and professional
                  project management.
                </p>
                <p>
                  Mr. Singh has successfully led HVAC projects and service operations for corporate
                  clients, financial institutions, and government establishments. His leadership
                  approach focuses on innovation, quality service, and long-term client relationships.
                </p>
                <p>
                  Through his vision and industry insight, the company continues to strengthen its
                  position as a trusted HVAC solutions provider in the region.
                </p>
              </div>

              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {[
                  { label: '20+ Years', sub: 'Industry Experience' },
                  { label: 'Corporate & Govt.', sub: 'Clientele' },
                  { label: 'Vision-Led', sub: 'Leadership Approach' },
                ].map((d) => (
                  <div key={d.label} className="bg-white rounded-xl p-4 border border-slate-100">
                    <p className="text-sm font-extrabold text-slate-900">{d.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{d.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-slate-50 rounded-2xl p-8 md:p-10 border border-slate-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-secondary-50 rounded-xl flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-500 leading-relaxed">
                To become a leading and trusted HVAC solutions provider by delivering innovative,
                energy-efficient, and sustainable air-conditioning systems that create comfortable
                environments while maintaining the highest standards of quality and service.
              </p>
            </motion.div>

            <motion.div
              className="bg-slate-50 rounded-2xl p-8 md:p-10 border border-slate-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <ul className="space-y-3">
                {missionPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-slate-500 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Core Strengths / Why Choose Us */}
      <section className="py-20 md:py-28 bg-slate-50">
        <Container>
          <SectionTitle
            subtitle="Why Choose Us"
            title="Our Core Strengths"
            description="Two decades of engineering excellence, operational reliability, and client trust built across Uttar Pradesh."
          />
          <motion.div
            ref={strRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate={strInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {strengths.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="group bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-card hover:border-primary-100 transition-all"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                  <s.icon className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{s.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Our Key Services */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <SectionTitle
            subtitle="What We Do"
            title="Our Key Services"
            description="End-to-end HVAC capabilities — from design and installation to commissioning and long-term maintenance."
          />
          <motion.div
            ref={svcRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate={svcInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {services.map((svc) => (
              <motion.div
                key={svc.title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-card transition-all"
              >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                    <svc.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{svc.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{svc.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Our Clients & Presence */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary-950 via-primary-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <Container className="relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-sm font-semibold tracking-wider uppercase text-primary-300 mb-3 block">
                Our Clients & Presence
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                Trusted Across Sectors & Cities
              </h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Over the past two decades, Unitech Aircon has served a diverse range of clients across
                  sectors such as <strong className="text-white">banking, corporate offices,
                  institutions, and government organizations</strong>.
                </p>
                <p>
                  Our operational presence across Lucknow, Ayodhya, Gorakhpur, and Varanasi enables us
                  to provide prompt response, reliable service support, and efficient project execution.
                </p>
                <p>
                  Our long-term client relationships are built on{' '}
                  <strong className="text-white">trust, reliability, and consistent service
                  performance</strong>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {cities.map((city, i) => (
                <motion.div
                  key={city}
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <MapPin className="w-6 h-6 text-secondary-300 mb-3" />
                  <p className="font-bold text-white text-lg">{city}</p>
                  <p className="text-xs text-slate-400 mt-1">Service & Project Coverage</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Health, Safety & Quality Policy */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <span className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-3 block">
                HSE & Quality Policy
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Health, Safety & Quality Come First
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                At Unitech Aircon, maintaining high standards of health, safety, and quality is a
                fundamental part of our operations. Our commitment guides every project, contract, and
                service visit we deliver.
              </p>
              <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-primary-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">
                  Every technician is trained and every site is inspected against industry safety
                  regulations before, during, and after execution.
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {qualityPolicy.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex gap-4 bg-slate-50 rounded-xl p-5 border border-slate-100"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center shrink-0 text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-slate-600 leading-relaxed pt-1">{item}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Infrastructure & Service Network */}
      <section className="py-20 md:py-28 bg-slate-50">
        <Container>
          <SectionTitle
            subtitle="Operational Strength"
            title="Infrastructure & Service Network"
            description="A strong operational backbone that enables us to efficiently manage HVAC projects and service contracts at scale."
          />
          <motion.div
            ref={infraRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate={infraInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {infrastructure.map((item) => (
              <motion.div
                key={item.text}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-primary-100 hover:shadow-card transition-all flex gap-4"
              >
                <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary-600" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pt-1.5">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Expertise & Sustainability */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="relative bg-gradient-to-br from-secondary-50 via-primary-50 to-white rounded-3xl p-10 border border-primary-100">
                <Leaf className="w-14 h-14 text-secondary-600 mb-5" />
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
                  Expertise Meets Sustainability
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  With extensive experience in HVAC engineering, Unitech Aircon is committed to
                  delivering energy-efficient and environmentally responsible cooling solutions.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-sm font-semibold tracking-wider uppercase text-primary-600 mb-3 block">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
                Engineering for a Sustainable Future
              </h2>
              <ul className="space-y-4">
                {sustainability.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex gap-4 items-start"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="w-7 h-7 rounded-full bg-secondary-100 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-secondary-700" />
                    </div>
                    <p className="text-slate-600 leading-relaxed">{item}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary-600">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Ready to Work With a Trusted HVAC Partner?
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Talk to our engineers for a free consultation, site visit, or maintenance proposal.
          </p>
          <Button variant="white" size="lg" href="/contact" icon={ArrowRight} iconPosition="right">
            Schedule Free Consultation
          </Button>
        </Container>
      </section>
    </>
  )
}
