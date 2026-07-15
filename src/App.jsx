import { BrowserRouter, Navigate, Routes, Route, useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import BirthdaySplash from './components/BirthdaySplash'
import Home from './pages/Home'
import About from './pages/About'
import Initiative from './pages/Initiative'
import Reports from './pages/Reports'
import ReportDetail from './pages/ReportDetail'
import Atobase from './pages/Atobase'
import Contact from './pages/Contact'
import { initGA, logPageView } from './analytics'

// Initialize Google Analytics (only active if VITE_GA_MEASUREMENT_ID is provided)
initGA();

function RouteObserver() {
  const { pathname, hash } = useLocation()
  
  useEffect(() => {
    // 1. Log page view on route change
    logPageView();

    // 2. Handle scroll to top or hash
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = hash.replace(/^#/, '')
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [pathname, hash])
  
  return null
}

function LegacyReportRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/initiative/impact/${slug}`} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteObserver />
      <BirthdaySplash />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/initiative" element={<Initiative />} />
        <Route path="/initiative/impact" element={<Reports />} />
        <Route path="/initiative/impact/:slug" element={<ReportDetail />} />
        <Route path="/initiative/reports" element={<Navigate to="/initiative/impact" replace />} />
        <Route path="/initiative/reports/:slug" element={<LegacyReportRedirect />} />
        <Route path="/atobase" element={<Atobase />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
