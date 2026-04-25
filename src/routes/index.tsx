import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	BookOpen,
	Calendar,
	Disc3,
	Guitar,
	MapPin,
	Mic2,
	Music,
	Radio,
	Route as RouteIcon,
} from "lucide-react";
import NewsletterSignup from "../components/NewsletterSignup";
import VenuePlaceholder from "../components/VenuePlaceholder";
import { getHolstonRoadTrail, getHolstonRoadVenues } from "../db/queries";
import { getDbBinding } from "../lib/db-binding";

export const Route = createFileRoute("/")({
	loader: async (loaderArgs) => {
		const trail = await getHolstonRoadTrail(getDbBinding(loaderArgs));
		const venues = await getHolstonRoadVenues(getDbBinding(loaderArgs));

		return { trail, venues };
	},
	component: HomePage,
});

const journeyCards = [
	{
		title: "Read the story",
		description:
			"Start with the chapters that explain why Bristol matters and how the sound moved.",
		href: "/stories",
		cta: "Open stories",
		icon: BookOpen,
	},
	{
		title: "Plan your stops",
		description: "Browse museums, listening rooms, and anchor venues across the trail.",
		href: "/sites",
		cta: "Browse venues",
		icon: MapPin,
	},
	{
		title: "Find live music",
		description: "Jump straight to recurring jams, festivals, and upcoming performances.",
		href: "/events",
		cta: "See events",
		icon: Calendar,
	},
] as const;

const chapterHighlights = [
	{
		title: "The Sound",
		subtitle: "Chapter 1",
		href: "/chapters/the-sound",
		description: "Hear how Appalachian ballads, blues, and gospel collided in the Tri-Cities.",
		icon: Music,
		accentClass: "bg-burgundy-700",
		iconClass: "bg-burgundy-100 text-burgundy-700",
	},
	{
		title: "The Railroad",
		subtitle: "Chapter 2",
		href: "/chapters/the-railroad",
		description: "Follow the route that carried musicians, recording gear, and songs into Bristol.",
		icon: Radio,
		accentClass: "bg-walnut-600",
		iconClass: "bg-walnut-100 text-walnut-700",
	},
	{
		title: "The Sessions",
		subtitle: "Chapter 3",
		href: "/chapters/the-sessions",
		description: "Step into the 1927 warehouse recordings that changed American music forever.",
		icon: Disc3,
		accentClass: "bg-burgundy-800",
		iconClass: "bg-burgundy-100 text-burgundy-700",
	},
	{
		title: "The Festival",
		subtitle: "Chapter 4",
		href: "/chapters/the-festival",
		description:
			"See how Rhythm & Roots turned the downtown streets back into a music destination.",
		icon: Mic2,
		accentClass: "bg-amber-700",
		iconClass: "bg-amber-100 text-amber-700",
	},
	{
		title: "The Next Generation",
		subtitle: "Chapter 5",
		href: "/chapters/the-next-generation",
		description: "Meet the students, venues, and players carrying the tradition forward right now.",
		icon: Guitar,
		accentClass: "bg-burgundy-600",
		iconClass: "bg-burgundy-100 text-burgundy-700",
	},
] as const;

function HomePage() {
	const { trail, venues } = Route.useLoaderData();
	const routeLength =
		trail?.metadata && typeof trail.metadata === "object" && "routeLength" in trail.metadata
			? Number((trail.metadata as Record<string, unknown>).routeLength)
			: 65;
	const chapterCount = chapterHighlights.length;
	const featuredVenueSlugs = [
		"birthplace-of-country-music-museum",
		"paramount-bristol",
		"etsu-bluegrass",
		"down-home",
	];
	const featuredVenues = featuredVenueSlugs
		.map((slug) => venues.find((venue) => venue.slug === slug))
		.filter((venue): venue is (typeof venues)[number] => Boolean(venue));
	const displayVenues = featuredVenues.length > 0 ? featuredVenues : venues.slice(0, 4);
	const displayVenueNames = displayVenues.map((venue) => venue.name);

	return (
		<main id="main-content">
			<section className="relative overflow-hidden bg-burgundy-900 px-4 py-20 text-white sm:py-28">
				<div className="absolute inset-0 opacity-20">
					<svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
						<title>Decorative trail horizon</title>
						<path d="M0,48 Q20,28 42,44 T100,38 L100,100 L0,100 Z" fill="currentColor" />
						<path
							d="M0,70 Q24,56 48,68 T100,60 L100,100 L0,100 Z"
							fill="currentColor"
							opacity="0.45"
						/>
					</svg>
				</div>

				<div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-amber-500/20 to-transparent" />

				<div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center">
					<div>
						<p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
							Music heritage trail + trip planning guide
						</p>
						<h1 className="max-w-4xl font-display text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
							Plan your way through the birthplace of country music.
						</h1>
						<p className="mt-6 max-w-3xl text-lg leading-relaxed text-burgundy-100 sm:text-xl">
							The Holston Road is a public guide to Northeast Tennessee&apos;s music story. Read the
							chapters, map the landmark venues, and find live music still happening from Bristol to
							Johnson City.
						</p>

						<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
							<Link
								to="/the-trail"
								className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-8 py-3.5 font-medium text-white transition hover:bg-amber-700"
							>
								Explore the trail <ArrowRight className="h-4 w-4" />
							</Link>
							<Link
								to="/events"
								className="inline-flex items-center justify-center gap-2 rounded-full border border-burgundy-600 bg-white/5 px-8 py-3.5 font-medium text-burgundy-50 transition hover:bg-burgundy-800"
							>
								Find live music
							</Link>
						</div>

						<div className="mt-10 grid gap-4 sm:grid-cols-3">
							<div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
								<p className="font-display text-3xl font-bold text-white">{routeLength}</p>
								<p className="mt-1 text-sm text-burgundy-100">
									Miles of music trail across the region
								</p>
							</div>
							<div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
								<p className="font-display text-3xl font-bold text-white">{venues.length}</p>
								<p className="mt-1 text-sm text-burgundy-100">
									Stops currently mapped in the public guide
								</p>
							</div>
							<div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
								<p className="font-display text-3xl font-bold text-white">{chapterCount}</p>
								<p className="mt-1 text-sm text-burgundy-100">
									Live chapters to start the story today
								</p>
							</div>
						</div>
					</div>

					<aside className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
						<div className="rounded-2xl border border-white/10 bg-burgundy-900/40 p-5">
							<p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
								Choose your journey
							</p>
							<h2 className="mt-3 font-display text-3xl font-bold text-white">
								Start with the part of the trail you came for.
							</h2>
							<p className="mt-3 text-sm leading-relaxed text-burgundy-100">
								Every path leads into the same regional story, but you do not have to start at the
								same door.
							</p>

							<div className="mt-6 flex flex-col gap-3">
								{journeyCards.map((journey) => {
									const Icon = journey.icon;

									return (
										<Link
											key={journey.title}
											to={journey.href}
											className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-amber-300/40 hover:bg-white/10"
										>
											<div className="flex items-start gap-4">
												<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-300">
													<Icon className="h-5 w-5" />
												</div>
												<div className="min-w-0">
													<h3 className="font-display text-xl font-bold text-white">
														{journey.title}
													</h3>
													<p className="mt-2 text-sm leading-relaxed text-burgundy-100">
														{journey.description}
													</p>
													<div className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-amber-300">
														{journey.cta}
														<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
													</div>
												</div>
											</div>
										</Link>
									);
								})}
							</div>
						</div>

						<div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
							<p className="text-xs font-medium uppercase tracking-[0.25em] text-burgundy-200">
								Curated anchor stops
							</p>
							<p className="mt-3 text-sm leading-relaxed text-burgundy-100">
								Built around working institutions and venue pages like{" "}
								{displayVenueNames.length > 0
									? displayVenueNames.slice(0, 3).join(", ")
									: "the Birthplace of Country Music Museum, Paramount Bristol, and ETSU Bluegrass"}
								.
							</p>
						</div>
					</aside>
				</div>
			</section>

			<section className="px-4 py-20">
				<div className="mx-auto max-w-6xl">
					<div className="mb-12 max-w-3xl">
						<p className="text-sm font-medium uppercase tracking-[0.25em] text-burgundy-700">
							Story discovery
						</p>
						<h2 className="mt-3 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
							Start with the chapter that matches your curiosity.
						</h2>
						<p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
							These chapter cards move directly into the narrative so you can follow the sound from
							origin story to present day.
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
						{chapterHighlights.map((chapter) => {
							const Icon = chapter.icon;

							return (
								<Link
									key={chapter.href}
									to={chapter.href}
									className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
								>
									<div className={`h-2 ${chapter.accentClass}`} />
									<div className="flex flex-1 flex-col p-6">
										<div className="flex items-center justify-between gap-4">
											<div
												className={`flex size-12 items-center justify-center rounded-2xl ${chapter.iconClass}`}
											>
												<Icon className="h-5 w-5" />
											</div>
											<span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
												{chapter.subtitle}
											</span>
										</div>

										<h3 className="mt-5 font-display text-2xl font-bold text-stone-900 transition group-hover:text-burgundy-700">
											{chapter.title}
										</h3>
										<p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">
											{chapter.description}
										</p>

										<div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-burgundy-700">
											Read this chapter
											<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</section>

			<section className="border-y border-stone-200 bg-stone-100 px-4 py-16">
				<div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
					<div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
						<div className="flex items-start gap-4">
							<div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-burgundy-100 text-burgundy-700">
								<RouteIcon className="h-5 w-5" />
							</div>
							<div>
								<p className="text-sm font-medium uppercase tracking-[0.25em] text-burgundy-700">
									Why this feels real
								</p>
								<h2 className="mt-2 font-display text-3xl font-bold text-stone-900">
									A public guide with actual ways in.
								</h2>
								<p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600">
									The Holston Road combines trail context, venue discovery, and live planning cues
									so visitors can move from reading to going without guessing what comes next.
								</p>
							</div>
						</div>

						<div className="mt-8 grid gap-4 sm:grid-cols-3">
							<div className="rounded-2xl bg-stone-50 p-5">
								<p className="font-display text-4xl font-bold text-burgundy-700">1927</p>
								<p className="mt-2 text-sm text-stone-600">
									Historic anchor date for the Bristol Sessions
								</p>
							</div>
							<div className="rounded-2xl bg-stone-50 p-5">
								<p className="font-display text-4xl font-bold text-amber-700">{venues.length}</p>
								<p className="mt-2 text-sm text-stone-600">
									Venue pages and stops in the current public guide
								</p>
							</div>
							<div className="rounded-2xl bg-stone-50 p-5">
								<p className="font-display text-4xl font-bold text-burgundy-700">{routeLength}</p>
								<p className="mt-2 text-sm text-stone-600">
									Miles tying Bristol, Kingsport, and Johnson City together
								</p>
							</div>
						</div>
					</div>

					<div className="rounded-3xl bg-burgundy-900 p-8 text-white shadow-sm">
						<p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
							Production-ready cues
						</p>
						<h2 className="mt-3 font-display text-3xl font-bold">
							The guide is anchored by places people already trust.
						</h2>
						<p className="mt-4 text-sm leading-relaxed text-burgundy-100">
							Featured stops connect the origin story to today&apos;s listening rooms, educational
							programs, and community stages.
						</p>

						<div className="mt-6 flex flex-wrap gap-3">
							{displayVenueNames.length > 0 ? (
								displayVenueNames.map((venueName) => (
									<span
										key={venueName}
										className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-burgundy-50"
									>
										{venueName}
									</span>
								))
							) : (
								<>
									<span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-burgundy-50">
										Birthplace of Country Music Museum
									</span>
									<span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-burgundy-50">
										Paramount Bristol
									</span>
									<span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-burgundy-50">
										ETSU Bluegrass
									</span>
								</>
							)}
						</div>

						<div className="mt-8 flex flex-col gap-4 text-sm text-burgundy-100">
							<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
								Story chapters, venue pages, and events all point to a next action instead of ending
								in mood alone.
							</div>
							<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
								Ideal for visitors planning a day trip, a festival weekend, or a deeper heritage
								stop through the Tri-Cities.
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="px-4 py-20">
				<div className="mx-auto max-w-6xl">
					<div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<div className="max-w-2xl">
							<p className="text-sm font-medium uppercase tracking-[0.25em] text-burgundy-700">
								Plan your first stops
							</p>
							<h2 className="mt-3 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
								Anchor venues that turn the story into an actual trip.
							</h2>
							<p className="mt-4 text-base leading-relaxed text-stone-600">
								Start with the institutions and rooms that most clearly connect heritage, education,
								and live performance along the trail.
							</p>
						</div>
						<Link
							to="/sites"
							className="inline-flex items-center gap-2 text-sm font-medium text-burgundy-700 transition hover:text-burgundy-800"
						>
							See the full venue guide <ArrowRight className="h-4 w-4" />
						</Link>
					</div>

					<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
						{displayVenues.map((venue, index) => (
							<Link
								key={venue.id}
								to="/sites/$slug"
								params={{ slug: venue.slug }}
								className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
							>
								<VenuePlaceholder name={venue.name} type={venue.type} className="h-36 w-full" />
								<div className="flex flex-col gap-4 p-5">
									<div>
										<p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
											Stop {String(index + 1).padStart(2, "0")}
										</p>
										<h3 className="mt-2 font-display text-2xl font-bold text-stone-900 transition group-hover:text-burgundy-700">
											{venue.name}
										</h3>
										<div className="mt-2 flex items-center gap-2 text-sm text-stone-500">
											<MapPin className="h-4 w-4 text-burgundy-600" />
											<span>
												{venue.city}
												{venue.state ? `, ${venue.state}` : ""}
											</span>
										</div>
									</div>

									<p className="text-sm leading-relaxed text-stone-600">
										{venue.features?.[0] || venue.shortDescription || "Music stop"}
									</p>

									<div className="inline-flex items-center gap-2 text-sm font-medium text-burgundy-700">
										Open venue guide
										<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			<section className="bg-amber-600 px-4 py-16 text-white">
				<div className="mx-auto max-w-4xl text-center">
					<p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-900/70">
						Ready to go deeper?
					</p>
					<h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
						Start with the route, then choose the music moment that fits your trip.
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-amber-900">
						Use the trail for the big picture, the stories for context, and the events page when you
						want to hear what the region sounds like tonight.
					</p>
					<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Link
							to="/the-trail"
							className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-medium text-amber-700 transition hover:bg-stone-100"
						>
							Start with the trail <ArrowRight className="h-4 w-4" />
						</Link>
						<Link
							to="/stories"
							className="inline-flex items-center gap-2 rounded-full border border-white/50 px-8 py-3.5 font-medium text-white transition hover:bg-amber-700"
						>
							Read the chapters
						</Link>
					</div>
				</div>
			</section>

			<NewsletterSignup />
		</main>
	);
}
