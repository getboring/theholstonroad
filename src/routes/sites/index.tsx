import { createFileRoute, Link } from '@tanstack/react-router'
import { MapPin, ArrowRight } from 'lucide-react'
import { getHolstonRoadVenues } from '../../db/queries'

export const Route = createFileRoute('/sites/')({
  component: SitesPage,
  loader: async ({ context }) => {
    const venues = await getHolstonRoadVenues(context.cloudflare.env.DB)
    return { venues }
  },
  head: () => ({
    meta: [
      { title: 'Sites — The Holston Road' },
      { name: 'description', content: 'Explore historic sites along The Holston Road. Anchor sites, road stops, and present-day venues across Northeast Tennessee.' },
    ],
  }),
})

function SitesPage() {
  const { venues } = Route.useLoaderData()

  const grouped = venues.reduce(
    (acc, venue) => {
      const type = venue.type
      if (!acc[type]) acc[type] = []
      acc[type].push(venue)
      return acc
    },
    {} as Record<string, typeof venues>,
  )

  const typeLabels: Record<string, string> = {
    major: 'Anchor Sites',
    affiliated: 'Road Stops',
    festival: 'Festivals',
    wayside: 'Wayside Exhibits',
    virtual: 'Virtual Exhibits',
  }

  return (
    <main>
      <section className="bg-river-900 px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">Sites</h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-river-200">
            The places where the frontier story comes alive. Historic sites, living history farms,
            museums, and outdoor spaces across the Tri-Cities.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl space-y-12">
          {Object.entries(grouped).map(([type, typeVenues]) => (
            <div key={type}>
              <h2 className="mb-4 font-display text-xl font-bold text-stone-900">
                {typeLabels[type] || type}
                <span className="ml-2 rounded-full bg-stone-200 px-2.5 py-0.5 text-xs text-stone-600">
                  {typeVenues.length}
                </span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {typeVenues.map((venue) => (
                  <Link
                    key={venue.id}
                    to="/sites/$slug"
                    params={{ slug: venue.slug }}
                    className="group block rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-river-600" />
                      <span className="text-xs font-medium uppercase tracking-wide text-stone-500">
                        {venue.city}{venue.state ? `, ${venue.state}` : ''}
                      </span>
                    </div>
                    <h3 className="mb-2 font-display text-base font-bold text-stone-900 group-hover:text-river-700 transition">
                      {venue.name}
                    </h3>
                    <p className="text-sm text-stone-600 line-clamp-3">
                      {venue.shortDescription || venue.description}
                    </p>
                    {venue.features && venue.features.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {venue.features.slice(0, 3).map((f) => (
                          <span key={f} className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600">
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
