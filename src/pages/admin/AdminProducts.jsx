import { useState, useEffect, useMemo } from 'react'
import { supabase, getPublicImageUrl } from '../../lib/supabase'
import {
  Plus, Pencil, Trash2, X, Upload, Search, Image as ImageIcon, Layers,
} from 'lucide-react'
import {
  productCategories,
  getCategoryLabel,
  getSubcategoryLabel,
  getSubcategories,
} from '../../constants/productCategories'
import Pagination from '../../components/admin/Pagination'

const DEFAULT_CATEGORY = productCategories[0].slug
const DEFAULT_SUBCATEGORY = productCategories[0].subcategories[0].slug

const emptyProduct = {
  title: '',
  description: '',
  brand: 'Blue Star',
  price: '',
  capacity: '',
  category: DEFAULT_CATEGORY,
  subcategory: DEFAULT_SUBCATEGORY,
  image_url: '',
  features: [],
  sort_order: 0,
  is_active: true,
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState(emptyProduct)
  const [featuresText, setFeaturesText] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [subcategoryFilter, setSubcategoryFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category')
      .order('subcategory')
      .order('sort_order')
    if (!error) setProducts(data || [])
    setLoading(false)
  }

  function openAdd() {
    setEditingProduct(null)
    setForm(emptyProduct)
    setFeaturesText('')
    setImageFile(null)
    setImagePreview('')
    setShowModal(true)
  }

  function openEdit(product) {
    setEditingProduct(product)
    setForm({
      ...emptyProduct,
      ...product,
      features: product.features || [],
    })
    setFeaturesText((product.features || []).join('\n'))
    setImageFile(null)
    setImagePreview(product.image_url || '')
    setShowModal(true)
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleCategoryChange(e) {
    const nextCategory = e.target.value
    const firstSub = getSubcategories(nextCategory)[0]?.slug ?? ''
    setForm((prev) => ({ ...prev, category: nextCategory, subcategory: firstSub }))
  }

  function handleImageSelect(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function uploadImage(file) {
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from('product-images').upload(fileName, file)
    if (error) throw error
    return getPublicImageUrl(fileName)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)

    try {
      let imageUrl = form.image_url
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const features = featuresText
        .split(/\n|,/)
        .map((s) => s.trim())
        .filter(Boolean)

      const productData = {
        title: form.title.trim(),
        description: form.description?.trim() || null,
        brand: form.brand?.trim() || 'Blue Star',
        price: form.price?.trim() || null,
        capacity: form.capacity?.trim() || null,
        category: form.category,
        subcategory: form.subcategory,
        image_url: imageUrl || null,
        features,
        sort_order: parseInt(form.sort_order) || 0,
        is_active: form.is_active,
      }

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('products').insert(productData)
        if (error) throw error
      }

      setShowModal(false)
      fetchProducts()
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this product?')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      alert('Error: ' + error.message)
      return
    }
    fetchProducts()
  }

  async function toggleActive(product) {
    const { error } = await supabase
      .from('products')
      .update({ is_active: !product.is_active })
      .eq('id', product.id)
    if (error) {
      alert('Error: ' + error.message)
      return
    }
    fetchProducts()
  }

  // Reset subcategory filter when category filter changes
  useEffect(() => {
    setSubcategoryFilter('all')
  }, [categoryFilter])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false
      if (subcategoryFilter !== 'all' && p.subcategory !== subcategoryFilter) return false
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
  }, [products, categoryFilter, subcategoryFilter, searchQuery])

  // Reset to first page whenever filters / search / page size change
  useEffect(() => {
    setPage(1)
  }, [categoryFilter, subcategoryFilter, searchQuery, pageSize])

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page, pageSize])

  const formSubcategories = getSubcategories(form.category)
  const filterSubcategories =
    categoryFilter !== 'all' ? getSubcategories(categoryFilter) : []

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-sm text-slate-500">
            {products.length} total · organized across {productCategories.length} categories
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              categoryFilter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Categories
          </button>
          {productCategories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategoryFilter(c.slug)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                categoryFilter === c.slug
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Subcategory chips (when a category is selected) */}
        {filterSubcategories.length > 0 && (
          <div className="flex gap-1.5 flex-wrap border-t border-slate-100 pt-3">
            <button
              onClick={() => setSubcategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                subcategoryFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Sub-categories
            </button>
            {filterSubcategories.map((s) => (
              <button
                key={s.slug}
                onClick={() => setSubcategoryFilter(s.slug)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                  subcategoryFilter === s.slug
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Product</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Sub-category</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Price</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                          {product.image_url ? (
                            <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-4 h-4 text-slate-300" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-slate-900 truncate">{product.title}</div>
                          <div className="text-[11px] text-slate-400">{product.brand || 'Blue Star'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-primary-50 text-primary-700 text-xs font-medium px-2 py-0.5 rounded">
                        {getCategoryLabel(product.category)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-slate-100 text-slate-600 text-xs font-medium px-2 py-0.5 rounded">
                        {getSubcategoryLabel(product.category, product.subcategory)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{product.price || '—'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActive(product)}
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          product.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {product.is_active ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 rounded-lg hover:bg-primary-50 text-slate-400 hover:text-primary-600 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filtered.length > 0 && (
            <Pagination
              page={page}
              pageSize={pageSize}
              totalItems={filtered.length}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <h2 className="text-lg font-bold text-slate-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  placeholder="e.g., Blue Star VRF V Plus 100% Inverter"
                />
              </div>

              {/* Category + Subcategory (cascading) */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Category *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleCategoryChange}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white"
                  >
                    {productCategories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Sub-category *
                  </label>
                  <select
                    name="subcategory"
                    value={form.subcategory}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white"
                  >
                    {formSubcategories.map((s) => (
                      <option key={s.slug} value={s.slug}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Description</label>
                <textarea
                  name="description"
                  value={form.description || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
                  placeholder="Product description..."
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Brand</label>
                  <input
                    name="brand"
                    value={form.brand || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    placeholder="Blue Star"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Price</label>
                  <input
                    name="price"
                    value={form.price || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    placeholder="e.g., Custom Quote"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Capacity</label>
                  <input
                    name="capacity"
                    value={form.capacity || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    placeholder="e.g., 8 – 90 HP"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Features <span className="font-normal text-slate-400">(one per line, or comma-separated)</span>
                </label>
                <textarea
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
                  placeholder={'100% Inverter Compressor\nWide Capacity Range\nLong Refrigerant Piping'}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Sort Order</label>
                <input
                  name="sort_order"
                  type="number"
                  value={form.sort_order}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">Lower numbers appear first within the sub-category.</p>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Product Image</label>
                <div className="flex items-start gap-4">
                  {imagePreview ? (
                    <div className="w-24 h-24 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center shrink-0">
                      <ImageIcon className="w-6 h-6 text-slate-300" />
                    </div>
                  )}
                  <div className="flex-1">
                    <label className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload Image
                      <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                    </label>
                    <p className="text-[11px] text-slate-400 mt-2">Or paste an image URL below:</p>
                    <input
                      name="image_url"
                      value={form.image_url || ''}
                      onChange={(e) => {
                        handleChange(e)
                        setImagePreview(e.target.value)
                      }}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="is_active" className="text-sm text-slate-700">
                  Active (visible on website)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
