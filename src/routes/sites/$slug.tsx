import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { format, isAfter, startOfDay } from "date-fns";
import { ArrowLeft, Calendar, Clock, Globe, MapPin, Phone } from "lucide-react";
import ErrorPage from "../../components/ErrorPage";
import NotFoundPage from "../../components/NotFoundPage";
import VenuePlaceholder from "../../components/VenuePlaceholder";
import {
	getHolstonRoadEvents,
	getHolstonRoadVenueBySlug,
	getHolstonRoadVenues,
} from "../../db/queries";
import { getDbBinding } from "../../lib/db-binding";
import { createPageHead } from "../../lib/seo";
import {
	enrichEvents,
	formatVenueTypeLabel,
	getVenueCapacity,
	getVenueEvents,
	getVenueHistory,
	getVenueHours,
} from "../../logic/planning";

export const Route = createFileRoute("/sites/$slug")({
	component: SiteDetailPage,
	loader: async (loaderArgs) => {
		const [venue, venues, events] = await Promise.all([
			getHolstonRoadVenueBySlug(getDbBinding(loaderArgs), loaderArgs.params.slug),
			getHolstonRoadVenues(getDbBinding(loaderArgs)),
			getHolstonRoadEvents(getDbBinding(loaderArgs)),
		]);

		if (!venue) {
			throw notFound();
		}

		return { venue, venues, events };
	},
	head: ({ loaderData }) =>
		createPageHead({
			title: loaderData
				? `${loaderData.venue.name} — The Holston Road`
				: "Venue — The Holston Road",
			description: loaderData?.venue.shortDescription || loaderData?.venue.description || "",
			path: loaderData ? `/sites/${loaderData.venue.slug}` : "/sites",
		}),
	notFoundComponent: NotFoundPage,
	errorComponent: ({ error }) => <ErrorPage error={error as Error} />,
});

function SiteDetailPage() {
	const { venue, venues, events } = Route.useLoaderData();
	const today = startOfDay(new Date());
	const eventDetails = enrichEvents(events, venues);
	const relatedEvents = getVenueEvents(venue, eventDetails).sort(
		(left, right) =>
			new Date(left.event.startDate).getTime() - new Date(right.event.startDate).getTime(),
	);
	const recurringEvents = relatedEvents.filter(({ event }) => event.isRecurring);
	const upcomingEvents = relatedEvents.filter(
		({ event }) => !event.isRecurring && isAfter(new Date(event.endDate ?? event.startDate), today),
	);
	const nearbyVenues = venues
		.filter((candidate) => candidate.id !== venue.id && candidate.city === venue.city)
		.slice(0, 3);
	const cityEvents = eventDetails
		.filter(
			(eventDetail) =>
				eventDetail.planningCity === venue.city && eventDetail.linkedVenue?.id !== venue.id,
		)
		.filter(({ event }) => isAfter(new Date(event.endDate ?? event.startDate), today))
		.slice(0, 3);
	const history = getVenueHistory(venue);
	const capacity = getVenueCapacity(venue);
	const hours = getVenueHours(venue);
	const directionsTarget =
		venue.latitude && venue.longitude
			? `${venue.latitude},${venue.longitude}`
			: venue.address
				? encodeURIComponent(venue.address)
				: null;

	return (
		<main>
			<section className="relative">
				<VenuePlaceholder name={venue.name} type={venue.type} className="h-64 w-full sm:h-80" />
				<div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/90 via-burgundy-900/40 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 px-4 py-8 text-white">
					<div className="mx-auto max-w-4xl">
						<Link
							to="/sites"
							className="mb-3 inline-flex items-center gap-1 text-sm text-burgundy-200 transition hover:text-white"
						>
							<ArrowLeft className="h-4 w-4" /> All Venues
						</Link>
						<h1 className="mb-3 font-display text-4xl font-bold sm:text-5xl">{venue.name}</h1>
						<div className="flex flex-wrap items-center gap-3 text-burgundy-100">
							<span className="flex items-center gap-1">
								<MapPin className="h-4 w-4" />
								{venue.city}
								{venue.state ? `, ${venue.state}` : ""}
							</span>
							<span className="rounded-full bg-burgundy-800/80 px-3 py-1 text-xs font-medium backdrop-blur">
								{formatVenueTypeLabel(venue.type)}
							</span>
							{capacity && (
								<span className="rounded-full bg-burgundy-800/80 px-3 py-1 text-xs font-medium backdrop-blur">
									About {capacity} capacity
								</span>
							)}
						</div>
					</div>
				</div>
			</section>

			<section className="px-4 py-12">
				<div className="mx-auto max-w-5xl">
					<div className="grid gap-8 lg:grid-cols-3">
						<div className="space-y-6 lg:col-span-2">
							<div className="rounded-2xl border border-stone-200 bg-white p-6">
								<h2 className="mb-4 font-display text-xl font-bold text-stone-900">About</h2>
								<p className="leading-relaxed text-stone-700">
									{venue.description || venue.shortDescription || "No description available."}
								</p>
							</div>

							{history && (
								<div className="rounded-2xl border border-stone-200 bg-white p-6">
									<h2 className="mb-4 font-display text-xl font-bold text-stone-900">
										Why this stop matters
									</h2>
									<p className="leading-relaxed text-stone-700">{history}</p>
								</div>
							)}

							{(recurringEvents.length > 0 || upcomingEvents.length > 0) && (
								<div className="rounded-2xl border border-stone-200 bg-white p-6">
									<div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
										<div>
											<h2 className="font-display text-xl font-bold text-stone-900">
												What happens here
											</h2>
											<p className="text-sm text-stone-600">
												Linked events that help turn this stop into a real plan.
											</p>
										</div>
										<Link
											to="/events"
											className="text-sm font-medium text-burgundy-700 transition hover:text-burgundy-800"
										>
											See the full events page
										</Link>
									</div>

									<div className="mt-5 grid gap-4">
										{[...recurringEvents, ...upcomingEvents].map(({ event }) => (
											<div
												key={event.id}
												className="rounded-xl border border-stone-200 bg-stone-50 p-4"
											>
												<div className="flex flex-wrap items-center gap-2">
													<h3 className="font-display text-lg font-bold text-stone-900">
														{event.name}
													</h3>
													<span className="rounded-full bg-burgundy-100 px-2.5 py-0.5 text-xs font-medium text-burgundy-800">
														{event.isRecurring ? "Recurring" : "Upcoming"}
													</span>
												</div>
												<p className="mt-2 text-sm text-stone-600">{event.description}</p>
												<div className="mt-3 flex flex-wrap gap-3 text-xs text-stone-500">
													<span className="flex items-center gap-1">
														<Calendar className="h-3.5 w-3.5" />
														{event.isRecurring
															? format(new Date(event.startDate), "EEEE • h:mm a")
															: format(new Date(event.startDate), "EEEE, MMMM d, yyyy")}
													</span>
													{event.admission && (
														<span className="font-medium text-green-700">{event.admission}</span>
													)}
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							{venue.features && venue.features.length > 0 && (
								<div className="rounded-2xl border border-stone-200 bg-white p-6">
									<h2 className="mb-4 font-display text-xl font-bold text-stone-900">Features</h2>
									<div className="flex flex-wrap gap-2">
										{venue.features.map((feature) => (
											<span
												key={feature}
												className="rounded-full bg-burgundy-50 px-3 py-1 text-sm text-burgundy-800"
											>
												{feature}
											</span>
										))}
									</div>
								</div>
							)}
						</div>

						<div className="space-y-4">
							<div className="rounded-2xl border border-stone-200 bg-white p-5">
								<h3 className="mb-3 font-semibold text-stone-900">Visit Information</h3>
								<div className="flex flex-col gap-3">
									{venue.address && (
										<div className="flex items-start gap-2 text-sm text-stone-600">
											<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
											<span>{venue.address}</span>
										</div>
									)}
									{venue.phone && (
										<div className="flex items-center gap-2 text-sm text-stone-600">
											<Phone className="h-4 w-4 shrink-0 text-stone-400" />
											<a href={`tel:${venue.phone}`} className="transition hover:text-burgundy-700">
												{venue.phone}
											</a>
										</div>
									)}
									{venue.website && (
										<div className="flex items-center gap-2 text-sm text-stone-600">
											<Globe className="h-4 w-4 shrink-0 text-stone-400" />
											<a
												href={venue.website}
												target="_blank"
												rel="noopener noreferrer"
												className="truncate transition hover:text-burgundy-700"
											>
												{venue.website.replace(/^https?:\/\//, "")}
											</a>
										</div>
									)}
									{hours && (
										<div className="flex items-start gap-2 text-sm text-stone-600">
											<Clock className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
											<span>{hours}</span>
										</div>
									)}
								</div>
							</div>

							<div className="rounded-2xl border border-stone-200 bg-white p-5">
								<h3 className="mb-3 font-semibold text-stone-900">Planning Snapshot</h3>
								<div className="flex flex-col gap-3 text-sm text-stone-600">
									<div className="flex items-start justify-between gap-4">
										<span>Stop type</span>
										<span className="text-right font-medium text-stone-900">
											{formatVenueTypeLabel(venue.type)}
										</span>
									</div>
									{capacity && (
										<div className="flex items-start justify-between gap-4">
											<span>Capacity</span>
											<span className="text-right font-medium text-stone-900">
												About {capacity}
											</span>
										</div>
									)}
									<div className="flex items-start justify-between gap-4">
										<span>Recurring events</span>
										<span className="text-right font-medium text-stone-900">
											{recurringEvents.length}
										</span>
									</div>
									<div className="flex items-start justify-between gap-4">
										<span>Upcoming dated events</span>
										<span className="text-right font-medium text-stone-900">
											{upcomingEvents.length}
										</span>
									</div>
								</div>
							</div>

							{directionsTarget && (
								<div className="rounded-2xl border border-stone-200 bg-white p-5">
									<h3 className="mb-2 font-semibold text-stone-900">Location</h3>
									<a
										href={`https://maps.google.com/?q=${directionsTarget}`}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 text-sm font-medium text-burgundy-700 transition hover:text-burgundy-800"
									>
										<MapPin className="h-4 w-4" />
										Get directions
									</a>
								</div>
							)}

							{nearbyVenues.length > 0 && (
								<div className="rounded-2xl border border-stone-200 bg-white p-5">
									<h3 className="mb-3 font-semibold text-stone-900">More stops in {venue.city}</h3>
									<div className="flex flex-col gap-3">
										{nearbyVenues.map((nearbyVenue) => (
											<Link
												key={nearbyVenue.id}
												to="/sites/$slug"
												params={{ slug: nearbyVenue.slug }}
												className="rounded-xl border border-stone-200 p-3 transition hover:border-burgundy-300 hover:bg-burgundy-50"
											>
												<p className="font-medium text-stone-900">{nearbyVenue.name}</p>
												<p className="mt-1 text-sm text-stone-600">
													{nearbyVenue.shortDescription || nearbyVenue.description}
												</p>
											</Link>
										))}
									</div>
								</div>
							)}

							{cityEvents.length > 0 && (
								<div className="rounded-2xl border border-stone-200 bg-white p-5">
									<h3 className="mb-3 font-semibold text-stone-900">
										Also happening around {venue.city}
									</h3>
									<div className="flex flex-col gap-3">
										{cityEvents.map(({ event, linkedVenue }) => (
											<div key={event.id} className="rounded-xl bg-stone-50 p-3">
												<p className="font-medium text-stone-900">{event.name}</p>
												<p className="mt-1 text-sm text-stone-600">
													{linkedVenue ? linkedVenue.name : venue.city}
												</p>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
