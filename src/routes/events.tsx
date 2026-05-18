import { createFileRoute, Link } from "@tanstack/react-router";
import { addDays, format, isAfter, isBefore, startOfDay } from "date-fns";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { z } from "zod";
import { getHolstonRoadEvents, getHolstonRoadVenues } from "../db/queries";
import { getDbBinding } from "../lib/db-binding";
import { createPageHead } from "../lib/seo";
import { enrichEvents } from "../logic/planning";

const eventsSearchSchema = z.object({
	city: z.string().default("all"),
	kind: z.enum(["all", "special", "recurring"]).default("all"),
});

export const Route = createFileRoute("/events")({
	validateSearch: eventsSearchSchema,
	component: EventsPage,
	loader: async (loaderArgs) => {
		const [events, venues] = await Promise.all([
			getHolstonRoadEvents(getDbBinding(loaderArgs)),
			getHolstonRoadVenues(getDbBinding(loaderArgs)),
		]);

		return { events, venues };
	},
	head: () =>
		createPageHead({
			title: "Events — The Holston Road",
			description: "Concerts, jams, festivals, and music events along The Holston Road.",
			path: "/events",
		}),
});

function EventsPage() {
	const { events, venues } = Route.useLoaderData();
	const search = Route.useSearch();
	const today = startOfDay(new Date());
	const eventDetails = enrichEvents(events, venues);
	const cityOptions = Array.from(
		new Set(
			eventDetails
				.map((eventDetail) => eventDetail.planningCity)
				.filter((city): city is string => Boolean(city)),
		),
	).sort((left, right) => left.localeCompare(right));
	const filteredEvents = eventDetails.filter((eventDetail) => {
		const matchesCity = search.city === "all" || eventDetail.planningCity === search.city;
		const matchesKind =
			search.kind === "all" ||
			(search.kind === "recurring" && eventDetail.event.isRecurring) ||
			(search.kind === "special" && !eventDetail.event.isRecurring);

		return matchesCity && matchesKind;
	});
	const recurringEvents = filteredEvents.filter((eventDetail) => eventDetail.event.isRecurring);
	const specialEvents = filteredEvents
		.filter((eventDetail) => !eventDetail.event.isRecurring)
		.sort(
			(left, right) =>
				new Date(left.event.startDate).getTime() - new Date(right.event.startDate).getTime(),
		);
	const currentSpecialEvents = specialEvents.filter(({ event }) =>
		isAfter(new Date(event.endDate ?? event.startDate), today),
	);
	const archivedEventsCount = specialEvents.length - currentSpecialEvents.length;
	const comingSoonEvents = currentSpecialEvents.filter(({ event }) =>
		isBefore(new Date(event.startDate), addDays(today, 90)),
	);
	const laterEvents = currentSpecialEvents.filter(
		({ event }) => !isBefore(new Date(event.startDate), addDays(today, 90)),
	);

	return (
		<main>
			<section className="bg-burgundy-900 px-4 py-20 text-white sm:py-28">
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
						Events
					</h1>
					<p className="mx-auto max-w-2xl text-lg leading-relaxed text-burgundy-200">
						Concerts, jams, festivals, and pickin&apos; parties along the trail. Focus on
						what&apos;s coming up next, then fill in the regular weekly and monthly music nights
						around it.
					</p>
				</div>
			</section>

			<section className="border-b border-stone-200 bg-stone-50 px-4 py-8">
				<div className="mx-auto flex max-w-5xl flex-col gap-6">
					<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-700">
								Plan around what is current
							</p>
							<h2 className="font-display text-2xl font-bold text-stone-900">
								Filter by city or browse only recurring music.
							</h2>
						</div>
						<p className="text-sm text-stone-600">
							{currentSpecialEvents.length} upcoming dated event
							{currentSpecialEvents.length === 1 ? "" : "s"} and {recurringEvents.length} recurring
							stop{recurringEvents.length === 1 ? "" : "s"}
						</p>
					</div>

					<div className="flex flex-col gap-3">
						<div className="flex flex-col gap-2">
							<p className="text-sm font-medium text-stone-700">City</p>
							<div className="flex flex-wrap gap-2">
								{["all", ...cityOptions].map((city) => (
									<Link
										key={city}
										to="/events"
										search={(previous) => ({
											...previous,
											city,
										})}
										className={`rounded-full px-3 py-1.5 text-sm transition ${
											search.city === city
												? "bg-burgundy-700 text-white"
												: "bg-white text-stone-700 hover:bg-stone-100"
										}`}
									>
										{city === "all" ? "All cities" : city}
									</Link>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<p className="text-sm font-medium text-stone-700">Event type</p>
							<div className="flex flex-wrap gap-2">
								{[
									{ value: "all", label: "Everything current" },
									{ value: "special", label: "Dated events" },
									{ value: "recurring", label: "Recurring music" },
								].map((option) => (
									<Link
										key={option.value}
										to="/events"
										search={(previous) => ({
											...previous,
											kind: option.value as typeof search.kind,
										})}
										className={`rounded-full px-3 py-1.5 text-sm transition ${
											search.kind === option.value
												? "bg-burgundy-700 text-white"
												: "bg-white text-stone-700 hover:bg-stone-100"
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
					{comingSoonEvents.length > 0 && (
						<div>
							<div className="mb-6 flex items-end justify-between gap-4">
								<div>
									<h2 className="font-display text-2xl font-bold text-stone-900">Coming up soon</h2>
									<p className="text-sm text-stone-600">
										The next dated events worth planning around first.
									</p>
								</div>
								<span className="rounded-full bg-stone-200 px-2.5 py-0.5 text-xs text-stone-600">
									{comingSoonEvents.length}
								</span>
							</div>
							<div className="grid gap-4">
								{comingSoonEvents.map(({ event, linkedVenue, planningCity }) => {
									const ticketUrl =
										event.metadata &&
										typeof event.metadata === "object" &&
										"ticketUrl" in event.metadata &&
										typeof event.metadata.ticketUrl === "string"
											? event.metadata.ticketUrl
											: null;

									return (
										<div
											key={event.id}
											className="flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-5"
										>
											<div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-stone-100">
												<span className="text-xs font-bold text-stone-600">
													{format(new Date(event.startDate), "MMM")}
												</span>
												<span className="text-lg font-bold text-stone-900">
													{format(new Date(event.startDate), "d")}
												</span>
											</div>
											<div className="flex-1">
												<div className="flex flex-wrap items-center gap-2">
													<h3 className="font-display text-lg font-bold text-stone-900">
														{event.name}
													</h3>
													{isBefore(new Date(event.startDate), addDays(today, 30)) && (
														<span className="rounded-full bg-burgundy-100 px-2.5 py-0.5 text-xs font-medium text-burgundy-800">
															Within 30 days
														</span>
													)}
												</div>
												<p className="mt-1 text-sm text-stone-600">{event.description}</p>
												<div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-stone-500">
													<span>{format(new Date(event.startDate), "EEEE, MMMM d, yyyy")}</span>
													{planningCity && (
														<span className="flex items-center gap-1">
															<MapPin className="h-3.5 w-3.5" />
															{planningCity}
														</span>
													)}
													{event.admission && (
														<span className="font-medium text-green-700">{event.admission}</span>
													)}
												</div>

												<div className="mt-4 flex flex-wrap gap-3">
													{linkedVenue && (
														<Link
															to="/sites/$slug"
															params={{ slug: linkedVenue.slug }}
															className="text-sm font-medium text-burgundy-700 transition hover:text-burgundy-800"
														>
															View {linkedVenue.name}
														</Link>
													)}
													{ticketUrl && (
														<a
															href={ticketUrl}
															target="_blank"
															rel="noopener noreferrer"
															className="inline-flex items-center gap-2 text-sm font-medium text-burgundy-700 transition hover:text-burgundy-800"
														>
															<Ticket className="h-4 w-4" />
															Tickets or details
														</a>
													)}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					)}

					{recurringEvents.length > 0 && (
						<div>
							<div className="mb-6 flex items-end justify-between gap-4">
								<div>
									<h2 className="font-display text-2xl font-bold text-stone-900">
										Recurring music nights
									</h2>
									<p className="text-sm text-stone-600">
										Reliable weekly and monthly anchors for a trip.
									</p>
								</div>
								<span className="rounded-full bg-stone-200 px-2.5 py-0.5 text-xs text-stone-600">
									{recurringEvents.length}
								</span>
							</div>
							<div className="grid gap-4">
								{recurringEvents.map(({ event, linkedVenue, planningCity }) => (
									<div
										key={event.id}
										className="flex items-start gap-4 rounded-xl border border-stone-200 bg-white p-5"
									>
										<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-burgundy-50 text-burgundy-700">
											<Calendar className="h-5 w-5" />
										</div>
										<div className="flex-1">
											<div className="flex flex-wrap items-center gap-2">
												<h3 className="font-display text-lg font-bold text-stone-900">
													{event.name}
												</h3>
												<span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-600">
													{event.recurrenceRule?.frequency === "weekly" && "Weekly"}
													{event.recurrenceRule?.frequency === "monthly" && "Monthly"}
													{event.recurrenceRule?.frequency === "yearly" && "Annual"}
												</span>
											</div>
											<p className="mt-1 text-sm text-stone-600">{event.description}</p>
											<div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-stone-500">
												<span className="flex items-center gap-1">
													<Clock className="h-3.5 w-3.5" />
													{format(new Date(event.startDate), "EEEE • h:mm a")}
												</span>
												{planningCity && (
													<span className="flex items-center gap-1">
														<MapPin className="h-3.5 w-3.5" />
														{planningCity}
													</span>
												)}
												{event.admission && (
													<span className="font-medium text-green-700">{event.admission}</span>
												)}
											</div>
											{linkedVenue && (
												<div className="mt-4">
													<Link
														to="/sites/$slug"
														params={{ slug: linkedVenue.slug }}
														className="text-sm font-medium text-burgundy-700 transition hover:text-burgundy-800"
													>
														Plan around {linkedVenue.name}
													</Link>
												</div>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{laterEvents.length > 0 && (
						<div>
							<div className="mb-6 flex items-end justify-between gap-4">
								<div>
									<h2 className="font-display text-2xl font-bold text-stone-900">
										Later on the calendar
									</h2>
									<p className="text-sm text-stone-600">Keep these on the long-range radar.</p>
								</div>
								<span className="rounded-full bg-stone-200 px-2.5 py-0.5 text-xs text-stone-600">
									{laterEvents.length}
								</span>
							</div>
							<div className="grid gap-4 md:grid-cols-2">
								{laterEvents.map(({ event, linkedVenue, planningCity }) => (
									<div key={event.id} className="rounded-xl border border-stone-200 bg-white p-5">
										<h3 className="font-display text-lg font-bold text-stone-900">{event.name}</h3>
										<p className="mt-2 text-sm text-stone-600">{event.description}</p>
										<div className="mt-4 flex flex-wrap gap-3 text-xs text-stone-500">
											<span>{format(new Date(event.startDate), "MMMM d, yyyy")}</span>
											{planningCity && <span>{planningCity}</span>}
											{linkedVenue && <span>{linkedVenue.name}</span>}
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{archivedEventsCount > 0 && (
						<div className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">
							{archivedEventsCount} earlier dated event
							{archivedEventsCount === 1 ? "" : "s"} not shown so the page stays focused on what is
							still current.
						</div>
					)}

					{filteredEvents.length === 0 && (
						<div className="rounded-xl border border-stone-200 bg-white p-12 text-center">
							<Calendar className="mx-auto mb-4 h-10 w-10 text-stone-300" />
							<h3 className="mb-2 font-display text-lg font-bold text-stone-900">
								No events match those filters yet
							</h3>
							<p className="text-stone-600">Try another city or switch back to all event types.</p>
						</div>
					)}
				</div>
			</section>
		</main>
	);
}
