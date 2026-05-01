import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, MapPin, Clock, ChevronRight, ChevronDown } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import { siteConfig } from '../../utils/seo'
import { productCategories } from '../../constants/productCategories'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Contact', href: '/contact' },
]

const tickerItems = [
  { text: '✦ Authorized Blue Star Partner', highlight: true },
  { text: 'VRF V Plus 100% Inverter' },
  { text: 'Blue Star' },
  { text: 'Ducted Split Systems' },
  { text: 'Scroll & Screw Chillers' },
  { text: '✦ 20+ Years of HVAC Excellence', highlight: true },
  { text: 'Centrifugal Chillers' },
  { text: 'Condensing Units' },
  { text: 'Annual Maintenance Contracts' },
  { text: 'Turnkey HVAC Projects' },
  { text: '✦ Serving Lucknow · Ayodhya · Gorakhpur · Varanasi', highlight: true },
  { text: 'Concealed Split AC' },
  { text: 'Data Centre Chillers' },
]

function TickerBar() {
  return (
    <div className="bg-primary-950 text-white text-xs py-1.5 overflow-hidden">
      <div className="marquee flex whitespace-nowrap">
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span
            key={i}
            className={`mx-6 inline-flex items-center gap-1 ${
              item.highlight ? 'text-accent-400 font-semibold' : 'text-slate-300'
            }`}
          >
            {!item.highlight && <span className="w-1 h-1 rounded-full bg-primary-500 mr-1" />}
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}

function TopBar() {
  return (
    <div className="bg-primary-900 text-white text-sm py-2 hidden lg:block">
      <Container className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 hover:text-primary-200 transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span>{siteConfig.phone}</span>
          </a>
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-primary-200 transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span>{siteConfig.email}</span>
          </a>
          <span className="flex items-center gap-2 text-primary-300">
            <MapPin className="w-3.5 h-3.5" />
            <span>{siteConfig.address.short}, UP</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-primary-300">
          <Clock className="w-3.5 h-3.5" />
          <span>Mon–Sat: 9 AM – 7 PM | Sun: 10 AM – 5 PM</span>
        </div>
      </Container>
    </div>
  )
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsMobileProductsOpen(false)
  }

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu()
      return
    }
    setIsMobileMenuOpen(true)
  }

  return (
    <header className="sticky top-0 z-50">
      <TickerBar />
      <TopBar />
      <Motion.nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft'
            : 'bg-white border-b border-slate-100'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Container className="flex items-center justify-between h-16 lg:h-[72px]">
          <Link to="/" className="shrink-0">
            <img src={siteConfig.logo} alt="Unitech Aircon" className="h-12 w-auto object-contain" />
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              link.href === '/products' ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setIsProductsMenuOpen(true)}
                  onMouseLeave={() => setIsProductsMenuOpen(false)}
                >
                  <Link
                    to={link.href}
                    className={`px-3.5 py-2 text-[13px] font-semibold rounded-lg transition-all duration-200 tracking-wide uppercase inline-flex items-center gap-1 ${
                      location.pathname === link.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-slate-600 hover:text-primary-600 hover:bg-primary-50/80'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Link>

                  <AnimatePresence>
                    {isProductsMenuOpen && (
                      <Motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full mt-1.5 w-72 rounded-xl border border-slate-200 bg-white shadow-elevated overflow-hidden"
                      >
                        <div className="py-1.5">
                          {productCategories.map((category) => (
                            <Link
                              key={category.slug}
                              to={`/products?category=${category.slug}`}
                              className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                              onClick={() => setIsProductsMenuOpen(false)}
                            >
                              <span>{category.label}</span>
                              <ChevronRight className="w-4 h-4 text-slate-300" />
                            </Link>
                          ))}
                        </div>
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-3.5 py-2 text-[13px] font-semibold rounded-lg transition-all duration-200 tracking-wide uppercase ${
                    location.pathname === link.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-slate-600 hover:text-primary-600 hover:bg-primary-50/80'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2.5">
            <Button variant="ghost" size="sm" icon={Phone} href={`tel:${siteConfig.phone}`}>
              {siteConfig.phone}
            </Button>
            <Button size="sm" href="/contact">
              Get Free Quote
            </Button>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </Container>
      </Motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <Motion.div
            className="fixed inset-0 top-[106px] z-40 bg-white lg:hidden overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Container className="py-6">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  link.href === '/products' ? (
                    <div
                      key={link.label}
                      className="rounded-xl border border-slate-200/90 bg-slate-50/70 overflow-hidden"
                    >
                      <button
                        type="button"
                        className={`w-full flex items-center justify-between px-4 py-3.5 text-base font-medium transition-colors ${
                          location.pathname === link.href
                            ? 'text-primary-600 bg-primary-50'
                            : 'text-slate-700 hover:text-primary-600'
                        }`}
                        onClick={() => setIsMobileProductsOpen((prev) => !prev)}
                        aria-expanded={isMobileProductsOpen}
                        aria-label="Toggle products categories"
                      >
                        <Motion.span
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          {link.label}
                        </Motion.span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isMobileProductsOpen ? 'rotate-180 text-primary-600' : 'text-slate-400'
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isMobileProductsOpen && (
                          <Motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-slate-200 bg-white"
                          >
                            <div className="p-3">
                              <Link
                                to="/products"
                                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                                onClick={closeMobileMenu}
                              >
                                <span>All Products</span>
                                <ChevronRight className="w-4 h-4 text-slate-300" />
                              </Link>
                              <div className="mt-2 grid gap-1">
                                {productCategories.map((category) => (
                                  <Link
                                    key={category.slug}
                                    to={`/products?category=${category.slug}`}
                                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                                    onClick={closeMobileMenu}
                                  >
                                    <span>{category.label}</span>
                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </Motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className={`flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                        location.pathname === link.href
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-slate-700 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      <Motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                        {link.label}
                      </Motion.span>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </Link>
                  )
                ))}
              </nav>
              <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-slate-100">
                <Button variant="outline" href="/contact" onClick={closeMobileMenu}>
                  Get Free Quote
                </Button>
                <Button icon={Phone} href={`tel:${siteConfig.phone}`} onClick={closeMobileMenu}>
                  Call Now
                </Button>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-sm text-slate-500">
                <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 hover:text-primary-600">
                  <Phone className="w-4 h-4" /> {siteConfig.phone}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-primary-600">
                  <Mail className="w-4 h-4" /> {siteConfig.email}
                </a>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {siteConfig.address.full}, {siteConfig.address.city}
                </p>
              </div>
            </Container>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
