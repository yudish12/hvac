import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { siteConfig } from '../utils/seo'
import { supabase } from '../lib/supabase'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'

const contactInfo = [
  { icon: Phone, label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone}`, color: 'bg-blue-50 text-blue-600' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat on WhatsApp', href: `https://wa.me/${siteConfig.whatsapp}`, color: 'bg-green-50 text-green-600' },
  { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}`, color: 'bg-amber-50 text-amber-600' },
  { icon: MapPin, label: 'Address', value: `${siteConfig.address.full}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`, href: siteConfig.maps, color: 'bg-rose-50 text-rose-600' },
]

const requirementTypes = [
  'New AC Installation',
  'VRV / VRF System',
  'Commercial HVAC Project',
  'AC Repair / Service',
  'Annual Maintenance Contract',
  'Cold Room / Chiller',
  'Other',
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', requirement: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')

    try {
      const { error } = await supabase.from('enquiries').insert({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        requirement: formData.requirement || null,
        message: formData.message || null,
      })
      if (error) throw error

      setSubmitted(true)
      setFormData({ name: '', phone: '', email: '', requirement: '', message: '' })

      const text = `*New Enquiry – Unitech Aircon*%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0ARequirement: ${formData.requirement}%0AMessage: ${formData.message}`
      window.open(`https://wa.me/${siteConfig.whatsapp}?text=${text}`, '_blank')
    } catch (err) {
      setSubmitError('Something went wrong. Please call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <>
      <Helmet>
        <title>Contact Unitech Aircon – Free Consultation & Site Visit | Lucknow, UP</title>
        <meta name="description" content={`Get in touch with Unitech Aircon for free HVAC consultation, quotes, and site visits. Call ${siteConfig.phone} or visit us at ${siteConfig.address.short}.`} />
        <meta property="og:title" content="Contact Unitech Aircon – HVAC Experts Lucknow" />
        <link rel="canonical" href={`${siteConfig.url}/contact`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          mainEntity: {
            '@type': 'LocalBusiness',
            name: siteConfig.name,
            telephone: siteConfig.phone,
            email: siteConfig.email,
            address: { '@type': 'PostalAddress', streetAddress: siteConfig.address.full, addressLocality: siteConfig.address.city, addressRegion: siteConfig.address.state, postalCode: siteConfig.address.zip, addressCountry: 'IN' },
          },
        })}</script>
      </Helmet>

      <PageHero subtitle="Contact Us" title="Get in Touch" description="Have a requirement? Our HVAC experts are ready to help with free consultation and site visits." />

      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Let's Discuss Your Project</h2>
                <p className="text-slate-500 text-sm leading-relaxed">Whether you need a single split AC or a complete commercial HVAC system, our team is here to provide expert guidance and competitive pricing.</p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((c) => (
                  <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary-200 hover:shadow-sm transition-all group"
                  >
                    <div className={`w-10 h-10 ${c.color} rounded-lg flex items-center justify-center shrink-0`}>
                      <c.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{c.label}</p>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-primary-600 transition-colors">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-4 h-4 text-primary-600" />
                  <h4 className="font-bold text-slate-900 text-sm">Business Hours</h4>
                </div>
                <div className="text-sm text-slate-500 space-y-1">
                  <p>Monday – Saturday: 9:00 AM – 7:00 PM</p>
                  <p>Sunday: 10:00 AM – 5:00 PM</p>
                  <p className="text-primary-600 font-medium">Emergency Service: 24/7 Available</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Request a Quote</h3>
                <p className="text-sm text-slate-500 mb-6">Fill the form below and we'll get back to you within 24 hours.</p>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                      placeholder="+91 XXXXXXXXXX" />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    placeholder="email@example.com" />
                </div>

                <div className="mb-4">
                  <label htmlFor="requirement" className="block text-xs font-semibold text-slate-700 mb-1.5">Requirement Type *</label>
                  <select id="requirement" name="requirement" required value={formData.requirement} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                  >
                    <option value="">Select requirement</option>
                    {requirementTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1.5">Message</label>
                  <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
                    placeholder="Tell us about your requirements, space details, budget, etc." />
                </div>

                {submitted ? (
                  <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-xl border border-green-100">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Enquiry submitted successfully!</p>
                      <p className="text-xs text-green-600">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {submitError && <p className="text-red-600 text-sm mb-3">{submitError}</p>}
                    <Button type="submit" size="lg" icon={Send} iconPosition="right" className="w-full" disabled={submitting}>
                      {submitting ? 'Sending...' : 'Send Enquiry'}
                    </Button>
                    <p className="text-[11px] text-slate-400 text-center mt-3">Your enquiry will also be sent via WhatsApp for fastest response.</p>
                  </>
                )}
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="bg-slate-100">
        <iframe
          title="Unitech Aircon Location"
          src={`https://www.google.com/maps?q=${encodeURIComponent(`${siteConfig.address.full}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`)}&output=embed`}
          width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        />
      </section>
    </>
  )
}
