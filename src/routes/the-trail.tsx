import { createFileRoute, Link } from '@tanstack/react-router'
import { MapPin, ArrowRight, Clock, Route as RouteIcon } from 'lucide-react'
import { getHolstonRoadTrail, getHolstonRoadVenues } from '../db/queries'

export const Route = createFileRoute('/the-trail')({
  component: TheTrailPage,
  loader: async ({ context }) => {
    const trail = await getHolstonRoadTrail(context.cloudflare.env.DB)
    const venues = await getHolstonRoadVenues(context.cloudflare.env.DB)
    return { trail, venues }
  },
  head: () => ({
    meta: [
      { title: 'The Trail — The Holston Road' },
      { name: 'description', content: 'Explore the 75-mile driving trail through America\'s First Frontier. 12 historic sites across Northeast Tennessee.' },
    ],
  }),
})

function TheTrailPage() {
  const { trail, venues } = Route.useLoaderData()

  const majorVenues = venues.filter((v) => v.type === 'major')
  const otherVenues = venues.filter((v) => v.type !== 'major')

  return (
    <main>
      <section className="bg-river-900 px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            The Trail
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-river-200">
            {trail?.description || 'A 75-mile driving trail through the places where the frontier became America.'}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-river-300">
            <span className="flex items-center gap-2">
              <RouteIcon className="h-5 w-5" /> {trail?.metadata && typeof trail.metadata === 'object' && 'routeLength' in trail.metadata ? `${(trail.metadata as Record<string, unknown>).routeLength} miles` : '75 miles'}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5" /> {venues.length} sites
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5" /> 1-2 days
            </span>
          </div>
        </div>
      </section>

      {/* Route Overview */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 rounded-2xl border border-stone-200 bg-white p-8">
            <h2 className="mb-4 font-display text-2xl font-bold text-stone-900">The Route</h2>
            <p className="mb-6 text-stone-600">
              The Holston Road follows the Holston River valley and the historic Old Stage Road corridor.
              It is designed as a loop, starting and ending in Kingsport. You can drive it in a day,
              or take your time over a weekend.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {['Kingsport', 'Bristol', 'Piney Flats', 'Elizabethton', 'Johnson City', 'Back to Kingsport'].map((city, i, arr) => (
                <span key={city} className="flex items-center gap-3">
                  <span className="rounded-full bg-river-100 px-3 py-1 text-sm font-medium text-river-800">{city}</span>
                  {i < arr.length - 1 && <ArrowRight className="h-4 w-4 text-stone-300" />}
                </span>
              ))}
            </div>
          </div>

          {/* Major Sites */}
          <h2 className="mb-6 font-display text-2xl font-bold text-stone-900">Anchor Sites</h2>
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {majorVenues.map((venue) => (
              <Link
                key={venue.id}
                to="/sites/$slug"
                params={{ slug: venue.slug }}
                className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-river-100 text-river-700">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-river-700 transition">
                    {venue.name}
                  </h3>
                  <p className="text-sm text-stone-500">
                    {venue.city}{venue.state ? `, ${venue.state}` : ''}
                  </p>
                  <p className="mt-1 text-sm text-stone-600 line-clamp-2">
                    {venue.shortDescription || venue.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Other Sites */}
          {otherVenues.length > 0 && (
            <>
              <h2 className="mb-6 font-display text-2xl font-bold text-stone-900">More Sites</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {otherVenues.map((venue) => (
                  <Link
                    key={venue.id}
                    to="/sites/$slug"
                    params={{ slug: venue.slug }}
                    className="group rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md"
                  >
                    <h3 className="font-display text-base font-bold text-stone-900 group-hover:text-river-700 transition">
                      {venue.name}
                    </h3>
                    <p className="text-xs text-stone-500">
                      {venue.city}{venue.state ? `, ${venue.state}` : ''}
                    </p>
                    <p className="mt-2 text-sm text-stone-600 line-clamp-2">
                      {venue.shortDescription || venue.description}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
