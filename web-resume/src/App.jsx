import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/ui/Header'
import { Footer } from './components/ui/Footer'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { HomeScene } from './components/scenes/HomeScene'
import { About } from './pages/About'
import { Projects } from './pages/Projects'
import { Contact } from './pages/Contact'
import { motion, AnimatePresence } from 'framer-motion'

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
              <HomeScene />
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
              <About />
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
              <Projects />
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
              <Contact />
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
        <main className="pt-16">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
