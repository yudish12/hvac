import { Helmet } from 'react-helmet-async'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Download,
  ExternalLink,
  FileText,
  CheckCircle2,
  Gauge,
  Tag,
  Layers,
  Image as ImageIcon,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { siteConfig } from '../utils/seo'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import {
  getCategoryLabel,
  getSubcategoryLabel,
} from '../constants/productCategories'

const DESCRIPTION_LIMIT = 380
const FEATURE_LIMIT = 6

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showAllFeatures, setShowAllFeatures] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle()

      if (!error) setProduct(data)
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  const descriptionText = product?.description || ''
  const needsReadMore = descriptionText.length > DESCRIPTION_LIMIT
  const shownDescription = showFullDescription
    ? descriptionText
    : descriptionText.slice(0, DESCRIPTION_LIMIT)

  const visibleFeatures = useMemo(() => {
    if (!product?.features) return []
    return showAllFeatures ? product.features : product.features.slice(0, FEATURE_LIMIT)
  }, [product, showAllFeatures])

  if (loading) {
    return (
      <section className="py-32 bg-white">
        <Container>
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>
        </Container>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="py-24 bg-white">
        <Container className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Product not found</h1>
          <p className="text-slate-500 mb-8">This product may be unavailable or has been removed.</p>
          <Button href="/products" icon={ArrowLeft}>
            Back to Products
          </Button>
        </Container>
      </section>
    )
  }

  return (
    <>
      <Helmet>
        <title>{product.title} | Unitech Aircon</title>
        <meta
          name="description"
          content={product.description || `${product.title} by Blue Star. Explore specifications, features, and brochure.`}
        />
        <link rel="canonical" href={`${siteConfig.url}/products/${product.id}`} />
      </Helmet>

      {/* Premium Hero */}
      <section className="relative overflow-hidden bg-primary-950 text-white py-14 md:py-20">
        <div className="absolute inset-0 bg-mesh opacity-60" />
        <Container className="relative">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-primary-200 hover:text-white transition-colors mb-7"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-widest text-primary-300 mb-3">
                {getCategoryLabel(product.category)} / {getSubcategoryLabel(product.category, product.subcategory)}
              </p>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-4">
                {product.title}
              </h1>

              <p className="text-slate-200 max-w-3xl leading-relaxed">
                Detailed product information, salient features, brochure access, and technical highlights —
                aligned to your commercial HVAC project needs.
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-xs font-medium">
                  <Tag className="w-3.5 h-3.5" />
                  {product.brand || 'Blue Star'}
                </span>
                {product.capacity && (
                  <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-xs font-medium">
                    <Gauge className="w-3.5 h-3.5" />
                    {product.capacity}
                  </span>
                )}
                {product.price && (
                  <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-xs font-medium">
                    {product.price}
                  </span>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {product.brochure_url && (
                  <a
                    href={product.brochure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Brochure
                  </a>
                )}
                <a
                  href="#product-overview"
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/15 transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/15 transition-colors"
                >
                  Enquire Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/15 shadow-elevated bg-white/5 backdrop-blur">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-[260px] md:h-[320px] object-cover"
                  />
                ) : (
                  <div className="h-[260px] md:h-[320px] flex flex-col items-center justify-center text-white/70">
                    <ImageIcon className="w-10 h-10 mb-2" />
                    <p className="text-sm">Product image coming soon</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section id="product-overview" className="py-16 md:py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7 space-y-7">
              <div className="bg-linear-to-br from-slate-50 to-white rounded-2xl border border-slate-100 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-primary-600" />
                  <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">Product Overview</h2>
                </div>

                <p className="text-slate-600 leading-relaxed">
                  {shownDescription}
                  {!showFullDescription && needsReadMore ? '...' : ''}
                </p>

                {needsReadMore && (
                  <button
                    type="button"
                    onClick={() => setShowFullDescription((v) => !v)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {showFullDescription ? 'Read Less' : 'Read More'}
                    <ArrowRight className={`w-4 h-4 transition-transform ${showFullDescription ? 'rotate-90' : ''}`} />
                  </button>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-soft">
                <div className="flex items-center gap-2 mb-5">
                  <ShieldCheck className="w-4 h-4 text-primary-600" />
                  <h3 className="text-xl font-bold text-slate-900">Salient Features</h3>
                </div>

                {product.features?.length ? (
                  <>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {visibleFeatures.map((feature) => (
                        <li key={feature} className="flex gap-2.5 items-start p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                          <span className="text-sm text-slate-700 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {product.features.length > FEATURE_LIMIT && (
                      <button
                        type="button"
                        onClick={() => setShowAllFeatures((v) => !v)}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {showAllFeatures ? 'Show Less' : 'Read More Features'}
                        <ArrowRight className={`w-4 h-4 transition-transform ${showAllFeatures ? 'rotate-90' : ''}`} />
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-slate-500">Feature list will be updated soon.</p>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 md:p-7 shadow-soft">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Brochure</h3>
                <p className="text-sm text-slate-500 mb-5">
                  Download the brochure for complete technical specifications and model information.
                </p>

                {product.brochure_url ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                      <a
                        href={product.brochure_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                      <a
                        href={product.brochure_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open PDF
                      </a>
                    </div>

                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <iframe
                        src={product.brochure_url}
                        title={`${product.title} brochure preview`}
                        className="w-full h-[420px]"
                      />
                    </div>
                  </>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Brochure will be uploaded soon.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Full Image Section */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-100">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-primary-600" />
              <p className="text-xs uppercase tracking-wider font-semibold text-primary-600">Product Image</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-card">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-[320px] md:h-[480px] object-cover"
                />
              ) : (
                <div className="h-[320px] md:h-[480px] flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon className="w-10 h-10 mb-2" />
                  <p className="text-sm">Product image will be updated soon.</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20 bg-primary-600">
        <Container className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Need Help With This Product?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Talk to our team for technical selection, project sizing, pricing, and installation planning.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="white" size="lg" href="/contact">
              Request Product Enquiry
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/25 text-white hover:bg-white/10 hover:text-white"
              href="/products"
            >
              Browse All Products
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
