import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-cyan-400">
          Portfolio
        </Link>
        <ul className="flex gap-6">
          <li>
            <Link to="/" className="text-white hover:text-cyan-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-cyan-400 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link to="/projects" className="text-white hover:text-cyan-400 transition-colors">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-cyan-400 transition-colors">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
