import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/ui/ScrollToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ServicesPage from './pages/ServicesPage'
import IndustriesPage from './pages/IndustriesPage'
import ContactPage from './pages/ContactPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import AdminProducts from './pages/admin/AdminProducts'
import AdminEnquiries from './pages/admin/AdminEnquiries'

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Public website */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminProducts />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
