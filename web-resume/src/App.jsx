import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/ui/Header'
import { Footer } from './components/ui/Footer'
import { HomeScene } from './components/scenes/HomeScene'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="pt-16">
          <HomeScene />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
