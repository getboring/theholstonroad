import { createFileRoute } from '@tanstack/react-router'
import { MapPin, Phone, Globe, Clock, ArrowLeft } from 'lucide-react'
import { getHolstonRoadVenueBySlug } from '../../db/queries'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/sites/$slug')({
  component: SiteDetailPage,
  loader: async ({ params, context }) => {
    const venue = await getHolstonRoadVenueBySlug(context.cloudflare.env.DB, params.slug)
    if (!venue) throw new Error('Site not found')
    return { venue }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.venue.name} — The Holston Road` },
      { name: 'description', content: loaderData.venue.shortDescription || loaderData.venue.description || '' },
    ],
  }),
})

function SiteDetailPage() {
  const { venue } = Route.useLoaderData()

  return (
    <main>
      {/* Hero */}
      <section className="bg-river-800 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/sites"
            className="mb-4 inline-flex items-center gap-1 text-sm text-river-300 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All Sites
          </Link>
          <h1 className="mb-4 font-display text-4xl font-bold sm:text-5xl">{venue.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-river-200">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {venue.city}{venue.state ? `, ${venue.state}` : ''}
            </span>
            {venue.type && (
              <span className="rounded-full bg-river-700 px-3 py-1 text-xs font-medium capitalize">
                {venue.type.replace('-', ' ')}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-stone-200 bg-white p-6">
                <h2 className="mb-4 font-display text-xl font-bold text-stone-900">About</h2>
                <p className="leading-relaxed text-stone-700">
                  {venue.description || venue.shortDescription || 'No description available.'}
                </p>
              </div>

              {venue.features && venue.features.length > 0 && (
                <div className="rounded-2xl border border-stone-200 bg-white p-6">
                  <h2 className="mb-4 font-display text-xl font-bold text-stone-900">Features</h2>
                  <div className="flex flex-wrap gap-2">
                    {venue.features.map((f) => (
                      <span key={f} className="rounded-full bg-river-50 px-3 py-1 text-sm text-river-800">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-stone-200 bg-white p-5">
                <h3 className="mb-3 font-semibold text-stone-900">Visit Information</h3>
                <div className="space-y-3">
                  {venue.address && (
                    <div className="flex items-start gap-2 text-sm text-stone-600">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
                      <span>{venue.address}</span>
                    </div>
                  )}
                  {venue.phone && (
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Phone className="h-4 w-4 shrink-0 text-stone-400" />
                      <a href={`tel:${venue.phone}`} className="hover:text-river-700 transition">{venue.phone}</a>
                    </div>
                  )}
                  {venue.website && (
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Globe className="h-4 w-4 shrink-0 text-stone-400" />
                      <a href={venue.website} target="_blank" rel="noopener noreferrer" className="hover:text-river-700 transition truncate">{venue.website.replace(/^https?:\/\//, '')}</a>
                    </div>
                  )}
                  {venue.metadata && typeof venue.metadata === 'object' && 'hours' in venue.metadata && (
                    <div className="flex items-start gap-2 text-sm text-stone-600">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
                      <span>{(venue.metadata as Record<string, string>).hours}</span>
                    </div>
                  )}
                </div>
              </div>

              {venue.latitude && venue.longitude && (
                <div className="rounded-2xl border border-stone-200 bg-white p-5">
                  <h3 className="mb-2 font-semibold text-stone-900">Location</h3>
                  <a
                    href={`https://maps.google.com/?q=${venue.latitude},${venue.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-river-700 hover:text-river-800 transition"
                  >
                    <MapPin className="h-4 w-4" />
                    Get directions
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
