import { Link } from '@tanstack/react-router'
import { Compass, Instagram, Youtube, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Compass className="h-5 w-5 text-river-700" />
              <span className="text-lg font-bold text-stone-900">The Holston Road</span>
            </div>
            <p className="mb-4 max-w-sm text-sm leading-relaxed text-stone-600">
              A trail through America's First Frontier. From the Holston River to the Old Stage Road,
              from the Watauga Association to the Overmountain Men — we didn't wait for permission.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/theholstonroad" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-river-700 transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com/@theholstonroad" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-river-700 transition">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/theholstonroad" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-river-700 transition">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/the-trail" className="text-sm text-stone-600 hover:text-river-700 transition">The Trail</Link></li>
              <li><Link to="/sites" className="text-sm text-stone-600 hover:text-river-700 transition">Sites</Link></li>
              <li><Link to="/events" className="text-sm text-stone-600 hover:text-river-700 transition">Events</Link></li>
              <li><Link to="/stories" className="text-sm text-stone-600 hover:text-river-700 transition">Stories</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">About</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-stone-600 hover:text-river-700 transition">Our Mission</Link></li>
              <li><Link to="/about" hash="partners" className="text-sm text-stone-600 hover:text-river-700 transition">Partners</Link></li>
              <li><a href="mailto:hello@theholstonroad.org" className="text-sm text-stone-600 hover:text-river-700 transition">Contact</a></li>
              <li><Link to="/" hash="newsletter" className="text-sm text-stone-600 hover:text-river-700 transition">Newsletter</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-200 pt-6 text-center text-xs text-stone-400">
          &copy; {new Date().getFullYear()} The Holston Road. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
