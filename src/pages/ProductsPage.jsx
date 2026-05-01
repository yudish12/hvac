import { Helmet } from 'react-helmet-async'
import { motion as Motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight, Phone, CheckCircle2, Layers, Search, Image as ImageIcon,
} from 'lucide-react'
import { siteConfig } from '../utils/seo'
import { supabase } from '../lib/supabase'
import PageHero from '../components/ui/PageHero'
import Container from '../components/ui/Container'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'
import {
  productCategories,
  getSubcategoryLabel,
} from '../constants/productCategories'

function ProductCard({ product, index = 0 }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <article className="group bg-white rounded-2xl border border-slate-100 overflow-hidden h-full hover:shadow-elevated hover:border-primary-100 transition-all duration-300 flex flex-col">
        <div className="relative h-48 overflow-hidden bg-slate-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-slate-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-transparent to-transparent" />
          {product.price && (
            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
              {product.price}
            </span>
          )}
          <div className="absolute bottom-3 left-4 right-4">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-white/80 mb-1">
              {getSubcategoryLabel(product.category, product.subcategory)}
            </span>
            <h3 className="text-white font-bold text-lg leading-tight">{product.title}</h3>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          {product.description && (
            <p className="text-sm text-slate-500 mb-4 leading-relaxed line-clamp-3">
              {product.description}
            </p>
          )}

          {product.features?.length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {product.features.slice(0, 3).map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-600 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-medium">
              {product.capacity || product.brand || 'Blue Star'}
            </span>
            <Link
              to={`/products/${product.id}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 group-hover:gap-2 transition-all"
            >
              View Details <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>
    </Motion.div>
  )
}

function CategorySection({ category, products, bgClass }) {
  if (!products.length) return null

  const subcategoryCount = new Set(products.map((p) => p.subcategory)).size

  return (
    <section className={`py-20 md:py-24 ${bgClass}`}>
      <Container>
        <SectionTitle
          subtitle={category.label}
          title={category.tagline}
          description={`${products.length} product${products.length === 1 ? '' : 's'} across ${subcategoryCount} sub-categor${subcategoryCount === 1 ? 'y' : 'ies'}.`}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const activeCategoryParam = searchParams.get('category')
  const activeCategory = productCategories.some((c) => c.slug === activeCategoryParam)
    ? activeCategoryParam
    : 'all'
  const searchQuery = searchParams.get('q') || ''

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('category')
      .order('subcategory')
      .order('sort_order')
      .then(({ data }) => {
        setProducts(data || [])
        setLoading(false)
      })
  }, [])

  const handleCategoryChange = (category) => {
    const nextParams = new URLSearchParams(searchParams)
    if (category === 'all') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', category)
    }
    setSearchParams(nextParams, { replace: true })
  }

  const handleSearchChange = (value) => {
    const nextParams = new URLSearchParams(searchParams)
    const trimmed = value.trim()
    if (trimmed) {
      nextParams.set('q', trimmed)
    } else {
      nextParams.delete('q')
    }
    setSearchParams(nextParams, { replace: true })
  }

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
  }, [products, activeCategory, searchQuery])

  const byCategory = useMemo(() => {
    const map = {}
    for (const cat of productCategories) {
      map[cat.slug] = []
    }
    for (const p of filtered) {
      if (map[p.category]) map[p.category].push(p)
    }
    return map
  }, [filtered])

  return (
    <>
      <Helmet>
        <title>HVAC Products – VRF, Ducted, Chillers & More | Unitech Aircon</title>
        <meta
          name="description"
          content="Browse Blue Star HVAC solutions — VRF Systems, Ducted Systems, Chillers and Condensing Units. Authorized partner with expert installation and service across UP."
        />
        <meta property="og:title" content="HVAC Products – VRF, Ducted, Chillers | Unitech Aircon" />
        <meta
          property="og:description"
          content="Complete Blue Star HVAC lineup — VRF, ducted, chillers, and condensing units. Authorized partner with expert installation."
        />
        <link rel="canonical" href={`${siteConfig.url}/products`} />
      </Helmet>

      <PageHero
        subtitle="Our Products"
        title="Blue Star HVAC Solutions"
        description="From VRF Systems and Ducted Splits to Chillers and Condensing Units — engineered Blue Star solutions tailored to every commercial and industrial need."
        image="https://images.unsplash.com/photo-1631545806609-55deb6e27e2c?w=1920&q=80&auto=format"
      />

      {/* Category navigation + search */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-slate-100 py-4">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex gap-2 flex-wrap flex-1">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                All Products
              </button>
              {productCategories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => handleCategoryChange(c.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                    activeCategory === c.slug
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="relative lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>
          </div>
        </Container>
      </section>

      {loading ? (
        <section className="py-32">
          <Container>
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            </div>
          </Container>
        </section>
      ) : filtered.length === 0 ? (
        <section className="py-24 bg-white">
          <Container className="text-center">
            <div className="max-w-md mx-auto">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
              <p className="text-sm text-slate-500 mb-6">
                Try adjusting your filter or search, or request a custom quote from our team.
              </p>
              <Button href="/contact" variant="primary" icon={ArrowRight} iconPosition="right">
                Request a Custom Quote
              </Button>
            </div>
          </Container>
        </section>
      ) : (
        <>
          {productCategories
            .map((cat) => ({ cat, products: byCategory[cat.slug] || [] }))
            .filter(({ products }) => products.length > 0)
            .map(({ cat, products: catProducts }, i) => (
              <CategorySection
                key={cat.slug}
                category={cat}
                products={catProducts}
                bgClass={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
              />
            ))}
        </>
      )}

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary-600">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Need Help Choosing the Right System?
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Speak with our HVAC engineers for a free consultation, site visit, and custom proposal.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="white" size="lg" icon={Phone} href={`tel:${siteConfig.phone}`}>
              Call for Free Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/25 text-white hover:bg-white/10 hover:text-white"
              href="/contact"
            >
              Request Quote Online
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}

