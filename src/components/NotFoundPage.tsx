import { Link } from '@tanstack/react-router'
import { ArrowLeft, MapPin } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <MapPin className="mb-4 h-12 w-12 text-stone-300" />
      <h1 className="mb-2 font-display text-4xl font-bold text-stone-900">Page not found</h1>
      <p className="mb-8 max-w-md text-stone-600">
        Looks like you took a wrong turn on the trail. This page doesn't exist — but the music is still playing.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-burgundy-700 px-6 py-3 font-medium text-white transition hover:bg-burgundy-800"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the trail
        </Link>
        <Link
          to="/sites"
          className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 font-medium text-stone-600 transition hover:bg-stone-100"
        >
          Explore venues
        </Link>
      </div>
    </main>
  )
}
