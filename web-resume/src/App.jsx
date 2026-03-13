import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Header } from './components/ui/Header'
import { Footer } from './components/ui/Footer'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { motion, AnimatePresence } from 'framer-motion'

const HomeScene = lazy(() => import('./components/scenes/HomeScene').then(module => ({ default: module.HomeScene })))
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })))
const Projects = lazy(() => import('./pages/Projects').then(module => ({ default: module.Projects })))
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<PageLoader />}>
                <HomeScene />
              </Suspense>
            </motion.div>
          } 
        />
        <Route 
          path="/about" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            </motion.div>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<PageLoader />}>
                <Projects />
              </Suspense>
            </motion.div>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="pt-14 md:pt-16">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
