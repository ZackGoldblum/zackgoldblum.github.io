import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Starfield from './components/Starfield'
import Bookshelf from './pages/Bookshelf'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Projects from './pages/Projects'
import Research from './pages/Research'
import Timeline from './pages/Timeline'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()

  return (
    <>
      <Starfield />
      <div className="site">
        <Nav />
        <main className="site__main">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/research" element={<Research />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/about" element={<Navigate to="/timeline" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* Homepage is a single self-contained viewport — no footer */}
        {pathname !== '/' && <Footer />}
      </div>
    </>
  )
}
