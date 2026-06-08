import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Initiative from './pages/Initiative'
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

export default function App() {
  return (
    <BrowserRouter>
      <RouteObserver />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/initiative" element={<Initiative />} />
        <Route path="/atobase" element={<Atobase />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
