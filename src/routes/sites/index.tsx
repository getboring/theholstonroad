import { createFileRoute, Link } from '@tanstack/react-router'
import { format, isAfter, startOfDay } from 'date-fns'
import { Calendar, MapPin } from 'lucide-react'
import { z } from 'zod'
import { getHolstonRoadEvents, getHolstonRoadVenues } from '../../db/queries'
import { formatVenueTypeLabel, getVenueCapacity, getVenueEvents, enrichEvents } from '../../logic/planning'
import { getDbBinding } from '../../lib/db-binding'
import VenuePlaceholder from '../../components/VenuePlaceholder'
import { createPageHead } from '../../lib/seo'

const sitesSearchSchema = z.object({
	city: z.string().default('all'),
	type: z.enum(['all', 'major', 'affiliated', 'festival', 'wayside', 'virtual']).default('all'),
	eventful: z.enum(['all', 'recurring', 'upcoming']).default('all'),
})

export const Route = createFileRoute('/sites/')({
	validateSearch: sitesSearchSchema,
	component: SitesPage,
	loader: async (loaderArgs) => {
		const [venues, events] = await Promise.all([
			getHolstonRoadVenues(getDbBinding(loaderArgs)),
			getHolstonRoadEvents(getDbBinding(loaderArgs)),
		])

		return { venues, events }
	},
	head: () =>
		createPageHead({
			title: 'Venues — The Holston Road',
			description:
				'Explore the venues and music stops on The Holston Road, from anchor destinations to smaller rooms across Northeast Tennessee.',
			path: '/sites',
		}),
})

function SitesPage() {
	const { venues, events } = Route.useLoaderData()
	const search = Route.useSearch()
	const today = startOfDay(new Date())
	const eventDetails = enrichEvents(events, venues)
	const cityOptions = Array.from(
		new Set(venues.map((venue) => venue.city).filter((city): city is string => Boolean(city))),
	).sort((left, right) => left.localeCompare(right))
	const planningByVenue = new Map(
		venues.map((venue) => {
			const relatedEvents = getVenueEvents(venue, eventDetails)
			const recurringEvents = relatedEvents.filter(({ event }) => event.isRecurring)
			const upcomingEvents = relatedEvents
				.filter(
					({ event }) =>
						!event.isRecurring &&
						isAfter(new Date(event.endDate ?? event.startDate), today),
				)
				.sort(
					(left, right) =>
						new Date(left.event.startDate).getTime() - new Date(right.event.startDate).getTime(),
				)

			return [
				venue.id,
				{
					relatedEvents,
					recurringEvents,
					upcomingEvents,
				},
			]
		}),
	)
	const filteredVenues = venues.filter((venue) => {
		const planning = planningByVenue.get(venue.id)
		const matchesCity = search.city === 'all' || venue.city === search.city
		const matchesType = search.type === 'all' || venue.type === search.type
		const matchesEventful =
			search.eventful === 'all' ||
			(search.eventful === 'recurring' && (planning?.recurringEvents.length ?? 0) > 0) ||
			(search.eventful === 'upcoming' && (planning?.upcomingEvents.length ?? 0) > 0)

		return matchesCity && matchesType && matchesEventful
	})
	const groupedByCity = filteredVenues.reduce(
		(accumulator, venue) => {
			const group = venue.city || 'Around the region'
			if (!accumulator[group]) {
				accumulator[group] = []
			}
			accumulator[group].push(venue)
			return accumulator
		},
		{} as Record<string, typeof filteredVenues>,
	)

	return (
		<main>
			<section className="bg-burgundy-900 px-4 py-20 text-white sm:py-28">
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
						Venues
					</h1>
					<p className="mx-auto max-w-2xl text-lg leading-relaxed text-burgundy-200">
						The places currently featured on The Holston Road. Browse by city, narrow to
						the kind of stop you want, and see which venues already have regular or
						upcoming happenings tied to them.
					</p>
				</div>
			</section>

			<section className="border-b border-stone-200 bg-stone-50 px-4 py-8">
				<div className="mx-auto flex max-w-5xl flex-col gap-6">
					<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-700">
								Plan by place
							</p>
							<h2 className="font-display text-2xl font-bold text-stone-900">
								Start with the city, then tighten the list.
							</h2>
						</div>
						<p className="text-sm text-stone-600">
							Showing {filteredVenues.length} of {venues.length} venues
						</p>
					</div>

					<div className="flex flex-col gap-3">
						<div className="flex flex-col gap-2">
							<p className="text-sm font-medium text-stone-700">City</p>
							<div className="flex flex-wrap gap-2">
								{['all', ...cityOptions].map((city) => (
									<Link
										key={city}
										to="/sites"
										search={(previous) => ({
											...previous,
											city,
										})}
										className={`rounded-full px-3 py-1.5 text-sm transition ${
											search.city === city
												? 'bg-burgundy-700 text-white'
												: 'bg-white text-stone-700 hover:bg-stone-100'
										}`}
									>
										{city === 'all' ? 'All cities' : city}
									</Link>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<p className="text-sm font-medium text-stone-700">Venue type</p>
							<div className="flex flex-wrap gap-2">
								{[
									{ value: 'all', label: 'All types' },
									{ value: 'major', label: 'Anchor venues' },
									{ value: 'affiliated', label: 'Road stops' },
									{ value: 'festival', label: 'Festivals' },
									{ value: 'wayside', label: 'Waysides' },
									{ value: 'virtual', label: 'Virtual' },
								].map((option) => (
									<Link
										key={option.value}
										to="/sites"
										search={(previous) => ({
											...previous,
											type: option.value as (typeof search.type),
										})}
										className={`rounded-full px-3 py-1.5 text-sm transition ${
											search.type === option.value
												? 'bg-burgundy-700 text-white'
												: 'bg-white text-stone-700 hover:bg-stone-100'
										}`}
									>
										{option.label}
									</Link>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<p className="text-sm font-medium text-stone-700">Planning utility</p>
							<div className="flex flex-wrap gap-2">
								{[
									{ value: 'all', label: 'All venues' },
									{ value: 'recurring', label: 'Has recurring music' },
									{ value: 'upcoming', label: 'Has upcoming dated event' },
								].map((option) => (
									<Link
										key={option.value}
										to="/sites"
										search={(previous) => ({
											...previous,
											eventful: option.value as (typeof search.eventful),
										})}
										className={`rounded-full px-3 py-1.5 text-sm transition ${
											search.eventful === option.value
												? 'bg-burgundy-700 text-white'
												: 'bg-white text-stone-700 hover:bg-stone-100'
										}`}
									>
										{option.label}
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="px-4 py-16">
				<div className="mx-auto max-w-5xl space-y-12">
					{filteredVenues.length === 0 && (
						<div className="rounded-2xl border border-stone-200 bg-white p-10 text-center">
							<h2 className="font-display text-2xl font-bold text-stone-900">
								No venues match those filters yet
							</h2>
							<p className="mt-2 text-stone-600">
								Try a broader city or switch back to all venue types.
							</p>
						</div>
					)}

					{Object.entries(groupedByCity)
						.sort(([left], [right]) => left.localeCompare(right))
						.map(([city, cityVenues]) => (
							<div key={city}>
								<div className="mb-4 flex items-center justify-between gap-4">
									<div>
										<h2 className="font-display text-2xl font-bold text-stone-900">{city}</h2>
										<p className="text-sm text-stone-600">
											{cityVenues.length} stop{cityVenues.length === 1 ? '' : 's'} in this part of
											the road
										</p>
									</div>
									<span className="rounded-full bg-stone-200 px-2.5 py-0.5 text-xs text-stone-600">
										{cityVenues.length}
									</span>
								</div>

								<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
									{cityVenues.map((venue) => {
										const planning = planningByVenue.get(venue.id)
										const capacity = getVenueCapacity(venue)
										const nextUpcomingEvent = planning?.upcomingEvents[0]

										return (
											<Link
												key={venue.id}
												to="/sites/$slug"
												params={{ slug: venue.slug }}
												className="group block overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
											>
												<VenuePlaceholder
													name={venue.name}
													type={venue.type}
													className="h-40 w-full"
												/>
												<div className="flex flex-col gap-4 p-5">
													<div>
														<div className="mb-2 flex items-center gap-2">
															<MapPin className="h-4 w-4 text-burgundy-600" />
															<span className="text-xs font-medium uppercase tracking-wide text-stone-500">
																{venue.city}
																{venue.state ? `, ${venue.state}` : ''}
															</span>
														</div>
														<h3 className="mb-2 font-display text-base font-bold text-stone-900 transition group-hover:text-burgundy-700">
															{venue.name}
														</h3>
														<p className="line-clamp-3 text-sm text-stone-600">
															{venue.shortDescription || venue.description}
														</p>
													</div>

													<div className="flex flex-wrap gap-1.5">
														<span className="rounded-full bg-burgundy-50 px-2 py-0.5 text-xs font-medium text-burgundy-800">
															{formatVenueTypeLabel(venue.type)}
														</span>
														{capacity && (
															<span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600">
																About {capacity} capacity
															</span>
														)}
														{venue.features?.slice(0, 2).map((feature) => (
															<span
																key={feature}
																className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600"
															>
																{feature}
															</span>
														))}
													</div>

													{planning && planning.relatedEvents.length > 0 && (
														<div className="rounded-xl bg-stone-50 p-3">
															<p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
																Planning notes
															</p>
															<div className="mt-2 flex flex-col gap-2 text-sm text-stone-700">
																{planning.recurringEvents.length > 0 && (
																	<p>
																		{planning.recurringEvents.length} recurring music
																		night{planning.recurringEvents.length === 1 ? '' : 's'} linked here
																	</p>
																)}
																{nextUpcomingEvent && (
																	<p className="flex items-center gap-2">
																		<Calendar className="h-4 w-4 text-burgundy-600" />
																		Next dated event{' '}
																		{format(new Date(nextUpcomingEvent.event.startDate), 'MMM d, yyyy')}
																	</p>
																)}
															</div>
														</div>
													)}
												</div>
											</Link>
										)
									})}
								</div>
							</div>
						))}
				</div>
			</section>
		</main>
	)
}
