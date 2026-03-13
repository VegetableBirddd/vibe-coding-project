import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/ui/Header'
import { Footer } from './components/ui/Footer'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { HomeScene } from './components/scenes/HomeScene'
import { About } from './pages/About'
import { Projects } from './pages/Projects'
import { Contact } from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomeScene />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
