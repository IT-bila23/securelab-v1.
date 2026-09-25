import { ShieldCheck } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar({ dark = false }) {
  return (
    <header className={dark ? 'nav nav-dark' : 'nav'}>
      <Link to="/" className="brand" aria-label="SecureLab home">
        <span className="brand-icon"><ShieldCheck size={20} /></span>
        <span>SecureLab</span>
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <a href="/#modules">Modules</a>
      </nav>
      <Link className="btn btn-small btn-primary" to="/dashboard">Start learning</Link>
    </header>
  )
}
