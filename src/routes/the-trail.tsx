import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Route as RouteIcon } from "lucide-react";
import TrailRouteExperience from "../components/TrailRouteExperience";
import { getHolstonRoadTrail, getHolstonRoadVenues } from "../db/queries";
import { getDbBinding } from "../lib/db-binding";
import { createPageHead } from "../lib/seo";

export const Route = createFileRoute("/the-trail")({
	component: TheTrailPage,
	loader: async (loaderArgs) => {
		const trail = await getHolstonRoadTrail(getDbBinding(loaderArgs));
		const venues = await getHolstonRoadVenues(getDbBinding(loaderArgs));
		return { trail, venues };
	},
	head: () =>
		createPageHead({
			title: "The Trail — The Holston Road",
			description:
				"Explore the music heritage trail through Northeast Tennessee. Historic venues, recording sites, and live music destinations across the Tri-Cities.",
			path: "/the-trail",
		}),
});

function TheTrailPage() {
	const { trail, venues } = Route.useLoaderData();
	const routeLength =
		trail?.metadata && typeof trail.metadata === "object" && "routeLength" in trail.metadata
			? Number((trail.metadata as Record<string, unknown>).routeLength) || 65
			: 65;

	return (
		<main>
			<section className="bg-burgundy-900 px-4 py-20 text-white sm:py-28">
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="mb-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
						The Trail
					</h1>
					<p className="mx-auto max-w-2xl text-lg leading-relaxed text-burgundy-200">
						{trail?.description ||
							"A music heritage trail through the places where country music was born — and where it is still being made."}
					</p>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-burgundy-300">
						<span className="flex items-center gap-2">
							<RouteIcon className="h-5 w-5" /> {routeLength} miles
						</span>
						<span className="flex items-center gap-2">
							<MapPin className="h-5 w-5" /> {venues.length} venues
						</span>
						<span className="flex items-center gap-2">
							<Clock className="h-5 w-5" /> 1-2 days
						</span>
					</div>
				</div>
			</section>

			<TrailRouteExperience trail={trail ?? undefined} venues={venues} />
		</main>
	);
}
