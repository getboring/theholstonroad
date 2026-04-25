import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Calendar, MapIcon, Music2 } from "lucide-react";
import GuideCard from "../../components/guides/GuideCard";
import { getHolstonRoadEvents, getHolstonRoadVenues } from "../../db/queries";
import { getDbBinding } from "../../lib/db-binding";
import { createPageHead, getCanonicalUrl, SITE_NAME } from "../../lib/seo";
import { guides } from "../../logic/guides";

export const Route = createFileRoute("/guides/")({
	component: GuidesHubPage,
	loader: async (loaderArgs) => {
		const [venues, events] = await Promise.all([
			getHolstonRoadVenues(getDbBinding(loaderArgs)),
			getHolstonRoadEvents(getDbBinding(loaderArgs)),
		]);

		return { venues, events };
	},
	head: () => {
		const pageHead = createPageHead({
			title: "Guides — The Holston Road",
			description:
				"Editorial guides for planning a first trip, understanding the Bristol Sessions, and finding live roots music across The Holston Road.",
			path: "/guides",
		});
		const canonicalUrl = getCanonicalUrl("/guides");
		const structuredData = {
			"@context": "https://schema.org",
			"@graph": [
				{
					"@type": "CollectionPage",
					name: "The Holston Road Guides",
					description:
						"Editorial guides for planning a first trip, understanding the Bristol Sessions, and finding live roots music across The Holston Road.",
					url: canonicalUrl,
					isPartOf: {
						"@type": "WebSite",
						name: SITE_NAME,
						url: getCanonicalUrl("/"),
					},
				},
				{
					"@type": "BreadcrumbList",
					itemListElement: [
						{
							"@type": "ListItem",
							position: 1,
							name: "Home",
							item: getCanonicalUrl("/"),
						},
						{
							"@type": "ListItem",
							position: 2,
							name: "Guides",
							item: canonicalUrl,
						},
					],
				},
				{
					"@type": "ItemList",
					itemListElement: guides.map((guide, index) => ({
						"@type": "ListItem",
						position: index + 1,
						name: guide.title,
						url: getCanonicalUrl(`/guides/${guide.slug}`),
					})),
				},
			],
		};

		return {
			...pageHead,
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify(structuredData),
				},
			],
		};
	},
});

function GuidesHubPage() {
	const { venues, events } = Route.useLoaderData();

	return (
		<main id="main-content">
			<section className="bg-burgundy-900 px-4 py-20 text-white sm:py-24">
				<div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
					<div className="flex flex-col gap-5">
						<p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
							Editorial trip planning guides
						</p>
						<h1 className="max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
							Use the guide set when you know what kind of trip you want, but not the route yet.
						</h1>
						<p className="max-w-3xl text-lg leading-relaxed text-burgundy-100 sm:text-xl">
							These pages are built for high-intent visitors: the first-weekend planner, the Bristol
							Sessions reader, and the traveler trying to hear something real tonight.
						</p>
					</div>

					<div className="grid gap-3">
						<div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-200">
								Launch set
							</p>
							<p className="mt-2 font-display text-4xl font-bold text-white">{guides.length}</p>
							<p className="mt-2 text-sm leading-relaxed text-burgundy-100">
								Strong starting guides covering itinerary, history, and live music intent.
							</p>
						</div>
						<div className="grid gap-3 sm:grid-cols-2">
							<div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
								<p className="font-display text-3xl font-bold text-white">{venues.length}</p>
								<p className="mt-2 text-sm text-burgundy-100">Mapped stops feeding the guide set</p>
							</div>
							<div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
								<p className="font-display text-3xl font-bold text-white">{events.length}</p>
								<p className="mt-2 text-sm text-burgundy-100">Live planning cues already on-site</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="px-4 py-16">
				<div className="mx-auto flex max-w-6xl flex-col gap-8">
					<div className="max-w-3xl">
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy-700">
							Start with intent
						</p>
						<h2 className="mt-2 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
							Not a blog roll. A planning shelf.
						</h2>
						<p className="mt-4 text-base leading-relaxed text-stone-600">
							Each guide is meant to move someone toward a trip, a venue page, a chapter, or the
							live events calendar.
						</p>
					</div>

					<div className="grid gap-6 lg:grid-cols-3">
						{guides.map((guide) => (
							<GuideCard key={guide.slug} guide={guide} />
						))}
					</div>
				</div>
			</section>

			<section className="border-y border-stone-200 bg-stone-100 px-4 py-16">
				<div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
					<div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="flex size-12 items-center justify-center rounded-2xl bg-burgundy-100 text-burgundy-700">
								<MapIcon className="h-5 w-5" />
							</div>
							<h2 className="font-display text-2xl font-bold text-stone-900">Need a route?</h2>
						</div>
						<p className="mt-4 text-sm leading-relaxed text-stone-600">
							Start with the itinerary guide when the question is “how do we spend a weekend?”
						</p>
						<Link
							to="/guides/weekend-country-music-itinerary"
							className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-burgundy-700"
						>
							Open the weekend guide
						</Link>
					</div>

					<div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="flex size-12 items-center justify-center rounded-2xl bg-burgundy-100 text-burgundy-700">
								<BookOpen className="h-5 w-5" />
							</div>
							<h2 className="font-display text-2xl font-bold text-stone-900">
								Need the backstory?
							</h2>
						</div>
						<p className="mt-4 text-sm leading-relaxed text-stone-600">
							Start with the Bristol Sessions guide when the origin story is the thing bringing you
							in.
						</p>
						<Link
							to="/guides/bristol-sessions-guide"
							className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-burgundy-700"
						>
							Open the history guide
						</Link>
					</div>

					<div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="flex size-12 items-center justify-center rounded-2xl bg-burgundy-100 text-burgundy-700">
								<Music2 className="h-5 w-5" />
							</div>
							<h2 className="font-display text-2xl font-bold text-stone-900">
								Need tonight&apos;s move?
							</h2>
						</div>
						<p className="mt-4 text-sm leading-relaxed text-stone-600">
							Start with the Johnson City live music guide when you need a practical evening plan.
						</p>
						<Link
							to="/guides/live-roots-music-johnson-city"
							className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-burgundy-700"
						>
							Open the live music guide
						</Link>
					</div>
				</div>
			</section>

			<section className="px-4 py-16">
				<div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
					<div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy-700">
							Built from the actual trail
						</p>
						<h2 className="mt-2 font-display text-3xl font-bold text-stone-900">
							The guide surface is only as strong as the places behind it.
						</h2>
						<p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-600">
							These pages are anchored to mapped venues, existing chapters, and live planning cues
							already inside The Holston Road. That keeps the copy grounded and the next clicks
							useful.
						</p>

						<div className="mt-6 grid gap-4 sm:grid-cols-3">
							<Link
								to="/sites"
								className="rounded-2xl bg-stone-50 p-5 transition hover:bg-stone-100"
							>
								<p className="font-display text-3xl font-bold text-burgundy-700">{venues.length}</p>
								<p className="mt-2 text-sm text-stone-600">Venue pages and trail stops</p>
							</Link>
							<Link
								to="/stories"
								className="rounded-2xl bg-stone-50 p-5 transition hover:bg-stone-100"
							>
								<p className="font-display text-3xl font-bold text-burgundy-700">5</p>
								<p className="mt-2 text-sm text-stone-600">Story chapters feeding the guides</p>
							</Link>
							<Link
								to="/events"
								className="rounded-2xl bg-stone-50 p-5 transition hover:bg-stone-100"
							>
								<p className="font-display text-3xl font-bold text-burgundy-700">{events.length}</p>
								<p className="mt-2 text-sm text-stone-600">
									Current recurring and special music cues
								</p>
							</Link>
						</div>
					</div>

					<div className="rounded-3xl bg-amber-600 p-8 text-white shadow-sm">
						<div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-950">
							<Calendar className="h-4 w-4" />
							Use this next
						</div>
						<h2 className="mt-3 font-display text-3xl font-bold">
							Start with a guide, then move straight into the planning pages.
						</h2>
						<p className="mt-4 text-sm leading-relaxed text-amber-950">
							The guide set should narrow the question. The venue directory, stories, and event
							calendar should finish the job.
						</p>
						<div className="mt-6 flex flex-col gap-3">
							<Link
								to="/the-trail"
								className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-medium text-amber-700 transition hover:bg-stone-100"
							>
								Open the trail overview
							</Link>
							<Link
								to="/events"
								className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 font-medium text-white transition hover:bg-amber-700"
							>
								Check live music timing
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
