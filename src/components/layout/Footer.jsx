import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowUpRight, Clock } from 'lucide-react'
import Container from '../ui/Container'
import { siteConfig } from '../../utils/seo'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Contact', href: '/contact' },
]

const services = [
  'HVAC Turnkey Projects',
  'VRF System Installation',
  'Central AC & Chiller Systems',
  'Package & Ductable Systems',
  'Annual Maintenance (AMC)',
  'Institutional HVAC Maintenance',
]

const products = [
  'VRF V Plus 100% Inverter',
  'VRF V S – Side Discharge',
  'VRF Lite 100% Inverter',
  'Packaged & Ducted Split AC',
  'Inverter Ducted Hot & Cold',
  'Concealed Split AC',
  'Scroll, Screw & Centrifugal Chillers',
  'Condensing Units',
]

const brands = ['Blue Star']

const socials = [
  { label: 'Facebook', href: siteConfig.social.facebook, path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { label: 'Instagram', href: siteConfig.social.instagram, path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z' },
  { label: 'YouTube', href: siteConfig.social.youtube, path: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z' },
  { label: 'LinkedIn', href: siteConfig.social.linkedin, path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* Main Footer */}
      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-5">
              <img src={siteConfig.logo} alt="Unitech Aircon" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Authorized Blue Star partner delivering HVAC engineering, installation, servicing, and AMC solutions across Lucknow, Ayodhya, Gorakhpur, and Varanasi.
            </p>

            <div className="space-y-3 mb-6">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-sm hover:text-white transition-colors group">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary-400" />
                </div>
                <span className="font-medium">{siteConfig.phone}</span>
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-sm hover:text-white transition-colors group">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary-400" />
                </div>
                <span>{siteConfig.email}</span>
              </a>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary-400" />
                </div>
                <span>{siteConfig.address.full}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary-400" />
                </div>
                <span>Mon–Sat: 9 AM–7 PM | Sun: 10 AM–5 PM</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {socials.map(({ path, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href}
                    className="text-sm hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Products</h4>
            <ul className="space-y-2.5">
              {products.map((product) => (
                <li key={product}>
                  <Link to="/products" className="text-sm hover:text-white transition-colors">{product}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Brands */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5 mb-8">
              {services.map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-sm hover:text-white transition-colors">{service}</Link>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Brands</h4>
            <div className="flex flex-wrap gap-1.5">
              {brands.map((brand) => (
                <span key={brand} className="text-[11px] bg-white/5 px-2.5 py-1 rounded-md">{brand}</span>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <Container className="py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Unitech Aircon. All rights reserved. | HVAC Engineering & Service Company, {siteConfig.address.city}, UP
          </p>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </Container>
      </div>
    </footer>
  )
}
