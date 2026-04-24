import { Link, useRouterState } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X, Compass } from 'lucide-react'

const navLinks = [
  { to: '/the-trail', label: 'The Trail' },
  { to: '/sites', label: 'Sites' },
  { to: '/events', label: 'Events' },
  { to: '/stories', label: 'Stories' },
  { to: '/about', label: 'About' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouterState()
  const currentPath = router.location.pathname

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-river-700" />
          <span className="text-lg font-bold tracking-tight text-stone-900">
            The Holston Road
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition ${
                currentPath.startsWith(link.to)
                  ? 'text-river-700'
                  : 'text-stone-600 hover:text-river-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="newsletter"
            className="rounded-full bg-river-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-river-800"
          >
            Join the Road
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-stone-700" />
          ) : (
            <Menu className="h-6 w-6 text-stone-700" />
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-stone-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-medium ${
                  currentPath.startsWith(link.to)
                    ? 'text-river-700'
                    : 'text-stone-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/"
              hash="newsletter"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-river-700 px-4 py-2 text-center text-sm font-medium text-white"
            >
              Join the Road
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
