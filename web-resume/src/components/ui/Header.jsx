import { Link, useLocation } from 'react-router-dom'

function NavLink({ to, children }) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link 
      to={to} 
      className={`transition-colors ${
        isActive 
          ? 'text-cyan-400 font-semibold' 
          : 'text-white hover:text-cyan-400'
      }`}
    >
      {children}
    </Link>
  )
}

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-bold text-cyan-400">
          Portfolio
        </Link>
        <ul className="flex gap-3 md:gap-6 text-sm md:text-base">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
