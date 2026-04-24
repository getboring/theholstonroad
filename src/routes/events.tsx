import { createFileRoute } from '@tanstack/react-router'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { getHolstonRoadEvents } from '../db/queries'
import { format } from 'date-fns'

export const Route = createFileRoute('/events')({
  component: EventsPage,
  loader: async ({ context }) => {
    const events = await getHolstonRoadEvents(context.cloudflare.env.DB)
    return { events }
  },
  head: () => ({
    meta: [
      { title: 'Events — The Holston Road' },
      { name: 'description', content: 'Annual events, reenactments, and festivals along The Holston Road.' },
    ],
  }),
})

function EventsPage() {
  const { events } = Route.useLoaderData()

  const recurring = events.filter((e) => e.isRecurring)
  const special = events.filter((e) => !e.isRecurring)

  return (
    <main>
      <section className="bg-river-900 px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">Events</h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-river-200">
            Reenactments, festivals, and living history events along the trail. Experience the frontier
            story where it happened.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Recurring Events */}
          {recurring.length > 0 && (
            <div>
              <h2 className="mb-6 font-display text-xl font-bold text-stone-900">
                Recurring Events
                <span className="ml-2 rounded-full bg-stone-200 px-2.5 py-0.5 text-xs text-stone-600">{recurring.length}</span>
              </h2>
              <div className="grid gap-4">
                {recurring.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-river-50 text-river-700">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold text-stone-900">{event.name}</h3>
                      <p className="mt-1 text-sm text-stone-600">{event.description}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-stone-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {event.recurrenceRule?.frequency === 'weekly' && 'Every week'}
                          {event.recurrenceRule?.frequency === 'monthly' && 'Monthly'}
                          {event.recurrenceRule?.frequency === 'yearly' && 'Annual'}
                        </span>
                        {event.admission && (
                          <span className="text-green-700 font-medium">{event.admission}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Events */}
          {special.length > 0 && (
            <div>
              <h2 className="mb-6 font-display text-xl font-bold text-stone-900">
                Upcoming Events
                <span className="ml-2 rounded-full bg-stone-200 px-2.5 py-0.5 text-xs text-stone-600">{special.length}</span>
              </h2>
              <div className="grid gap-4">
                {special.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-5">
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-stone-100">
                      <span className="text-xs font-bold text-stone-600">
                        {event.startDate ? format(new Date(event.startDate), 'MMM') : ''}
                      </span>
                      <span className="text-lg font-bold text-stone-900">
                        {event.startDate ? format(new Date(event.startDate), 'd') : ''}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold text-stone-900">{event.name}</h3>
                      <p className="mt-1 text-sm text-stone-600">{event.description}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-stone-500">
                        <span>
                          {event.startDate && format(new Date(event.startDate), 'EEEE, MMMM d, yyyy')}
                        </span>
                        {event.admission && (
                          <span className="text-green-700 font-medium">{event.admission}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {events.length === 0 && (
            <div className="rounded-xl border border-stone-200 bg-white p-12 text-center">
              <Calendar className="mx-auto mb-4 h-10 w-10 text-stone-300" />
              <h3 className="mb-2 font-display text-lg font-bold text-stone-900">No events yet</h3>
              <p className="text-stone-600">Check back soon for upcoming events along The Holston Road.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
