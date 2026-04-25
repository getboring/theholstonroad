import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Compass,
	ExternalLink,
	MapPin,
	MapPinned,
	Music2,
	Route as RouteIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Trail, Venue } from "../db/schema";

type HubKey = "bristol" | "hiltons" | "johnson-city" | "regional";

interface HubBlueprint {
	key: HubKey;
	label: string;
	kicker: string;
	description: string;
	drive: string;
	stay: string;
	position: {
		x: number;
		y: number;
	};
}

interface RouteHub extends HubBlueprint {
	venues: Venue[];
}

const HUB_BLUEPRINTS: HubBlueprint[] = [
	{
		key: "bristol",
		label: "Bristol",
		kicker: "Start with the origin story",
		description:
			"Begin on State Street with the Bristol Sessions, the museum, and the rooms that still carry the sound.",
		drive: "Start here",
		stay: "Plan 2 to 4 hours",
		position: { x: 18, y: 24 },
	},
	{
		key: "hiltons",
		label: "Hiltons",
		kicker: "Take the roots detour",
		description:
			"The Carter Family Fold turns the trail from history lesson into living tradition with Saturday-night music.",
		drive: "About 25 minutes from Bristol",
		stay: "Plan 1 to 2 hours",
		position: { x: 23, y: 62 },
	},
	{
		key: "johnson-city",
		label: "Johnson City",
		kicker: "Finish in the living scene",
		description:
			"Johnson City brings the story into the present with ETSU, The Down Home, and smaller rooms keeping roots music active.",
		drive: "About 40 minutes from Hiltons",
		stay: "Plan half a day or an evening",
		position: { x: 74, y: 58 },
	},
	{
		key: "regional",
		label: "Regional programs",
		kicker: "Keep following the sound",
		description:
			"Some stops are spread across the region, giving the trail room to grow as more partners come online.",
		drive: "Flexible add-on",
		stay: "Drop in when it fits your trip",
		position: { x: 82, y: 18 },
	},
];

const TYPE_LABELS: Record<Venue["type"], string> = {
	major: "Anchor venue",
	affiliated: "Road stop",
	festival: "Festival",
	wayside: "Wayside",
	virtual: "Virtual stop",
};

function getHubKey(venue: Venue): HubKey {
	const city = venue.city?.trim().toLowerCase();

	if (city === "bristol") return "bristol";
	if (city === "hiltons") return "hiltons";
	if (city === "johnson city") return "johnson-city";

	return "regional";
}

function sortVenues(a: Venue, b: Venue): number {
	const rank: Record<Venue["type"], number> = {
		major: 0,
		festival: 1,
		affiliated: 2,
		wayside: 3,
		virtual: 4,
	};

	return rank[a.type] - rank[b.type] || a.name.localeCompare(b.name);
}

function getRouteLength(trail?: Trail): number {
	if (!trail?.metadata || typeof trail.metadata !== "object") return 65;

	const value = (trail.metadata as Record<string, unknown>).routeLength;
	const numeric = Number(value);

	return Number.isFinite(numeric) && numeric > 0 ? numeric : 65;
}

function buildVenueQuery(venue: Venue): string | null {
	if (venue.latitude && venue.longitude) {
		return `${venue.latitude},${venue.longitude}`;
	}

	const query = [venue.address, venue.city, venue.state].filter(Boolean).join(", ");
	return query || null;
}

function buildVenueMapsUrl(venue: Venue): string | null {
	const query = buildVenueQuery(venue);
	if (!query) return null;

	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function buildDirectionsUrl(venues: Venue[]): string | null {
	const stops = venues
		.map((venue) => buildVenueQuery(venue))
		.filter((value): value is string => Boolean(value));

	if (stops.length === 0) return null;

	if (stops.length === 1) {
		return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stops[0])}`;
	}

	const origin = stops[0];
	const destination = stops[stops.length - 1];
	const waypoints = stops.slice(1, -1);
	const params = new URLSearchParams({
		api: "1",
		origin,
		destination,
		travelmode: "driving",
	});

	if (waypoints.length > 0) {
		params.set("waypoints", waypoints.join("|"));
	}

	return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export default function TrailRouteExperience({
	trail,
	venues,
}: {
	trail?: Trail;
	venues: Venue[];
}) {
	const hubs = useMemo<RouteHub[]>(
		() =>
			HUB_BLUEPRINTS.map((hub) => ({
				...hub,
				venues: venues.filter((venue) => getHubKey(venue) === hub.key).sort(sortVenues),
			})).filter((hub) => hub.venues.length > 0),
		[venues],
	);

	const [selectedHubKey, setSelectedHubKey] = useState<HubKey>(hubs[0]?.key ?? "bristol");
	const selectedHub = hubs.find((hub) => hub.key === selectedHubKey) ?? hubs[0];

	useEffect(() => {
		if (!selectedHub && hubs[0]) {
			setSelectedHubKey(hubs[0].key);
		}
	}, [hubs, selectedHub]);

	const [selectedVenueSlug, setSelectedVenueSlug] = useState<string | null>(
		selectedHub?.venues[0]?.slug ?? null,
	);

	useEffect(() => {
		if (!selectedHub?.venues.length) {
			setSelectedVenueSlug(null);
			return;
		}

		const hasSelectedVenue = selectedHub.venues.some((venue) => venue.slug === selectedVenueSlug);
		if (!hasSelectedVenue) {
			setSelectedVenueSlug(selectedHub.venues[0]?.slug ?? null);
		}
	}, [selectedHub, selectedVenueSlug]);

	const selectedVenue =
		selectedHub?.venues.find((venue) => venue.slug === selectedVenueSlug) ?? selectedHub?.venues[0];

	const routeLength = getRouteLength(trail);
	const anchorCount = venues.filter((venue) => venue.type === "major").length;
	const mapReadyCount = venues.filter((venue) => buildVenueQuery(venue)).length;
	const leadStops = hubs
		.map((hub) => hub.venues[0])
		.filter((venue): venue is Venue => Boolean(venue));
	const fullRouteUrl = buildDirectionsUrl(leadStops);
	const selectedHubRouteUrl = selectedHub ? buildDirectionsUrl(selectedHub.venues) : null;
	const routePoints = hubs.map((hub) => `${hub.position.x},${hub.position.y}`).join(" ");

	return (
		<section className="px-4 py-16">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<div className="max-w-3xl">
						<p className="text-sm font-medium uppercase tracking-[0.2em] text-burgundy-700">
							Route preview
						</p>
						<h2 className="mt-2 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
							A map-lite trail experience people can actually use
						</h2>
						<p className="mt-3 text-lg leading-relaxed text-stone-600">
							Follow the road city by city, jump into the stops that matter most, and open
							directions without leaving the trail guide.
						</p>
					</div>
					<div className="grid gap-3 sm:grid-cols-3">
						<div className="rounded-2xl border border-stone-200 bg-white px-5 py-4 shadow-sm">
							<p className="text-xs font-medium uppercase tracking-wide text-stone-500">
								Current route
							</p>
							<p className="mt-2 font-display text-3xl font-bold text-burgundy-700">
								{routeLength}
							</p>
							<p className="text-sm text-stone-600">miles of current trail coverage</p>
						</div>
						<div className="rounded-2xl border border-stone-200 bg-white px-5 py-4 shadow-sm">
							<p className="text-xs font-medium uppercase tracking-wide text-stone-500">
								Anchor stops
							</p>
							<p className="mt-2 font-display text-3xl font-bold text-burgundy-700">
								{anchorCount}
							</p>
							<p className="text-sm text-stone-600">headline venues on the road</p>
						</div>
						<div className="rounded-2xl border border-stone-200 bg-white px-5 py-4 shadow-sm">
							<p className="text-xs font-medium uppercase tracking-wide text-stone-500">
								Map-ready stops
							</p>
							<p className="mt-2 font-display text-3xl font-bold text-burgundy-700">
								{mapReadyCount}
							</p>
							<p className="text-sm text-stone-600">venues with directions links</p>
						</div>
					</div>
				</div>

				<div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.9fr)]">
					<section className="overflow-hidden rounded-[2rem] border border-burgundy-200 bg-burgundy-900 p-6 text-white shadow-sm sm:p-8">
						<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
							<div className="max-w-2xl">
								<p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300">
									Interactive route
								</p>
								<h3 className="mt-2 font-display text-3xl font-bold">
									See the trail before you drive it
								</h3>
								<p className="mt-3 text-burgundy-100">
									Select a stop on the trail to preview the venues clustered there, or open the lead
									stops in Google Maps for a real-world driving route.
								</p>
							</div>
							{fullRouteUrl && (
								<a
									href={fullRouteUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-medium text-burgundy-950 transition hover:bg-amber-400"
								>
									<MapPinned className="h-4 w-4" />
									Open lead-stop route
								</a>
							)}
						</div>

						<div className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-burgundy-950/40 px-4 py-5 sm:px-6 sm:py-6">
							<div className="absolute inset-0 opacity-25">
								<svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
									<path
										d="M0,72 Q15,58 28,64 T58,60 T100,52 L100,100 L0,100 Z"
										fill="currentColor"
									/>
									<path
										d="M0,84 Q18,70 38,77 T72,71 T100,64 L100,100 L0,100 Z"
										fill="currentColor"
										opacity="0.5"
									/>
								</svg>
							</div>

							<div className="relative h-[350px]">
								<svg
									className="absolute inset-0 h-full w-full"
									viewBox="0 0 100 100"
									preserveAspectRatio="none"
									aria-hidden="true"
								>
									<defs>
										<linearGradient id="trail-route-line" x1="0%" y1="0%" x2="100%" y2="0%">
											<stop offset="0%" stopColor="#fbbf24" />
											<stop offset="100%" stopColor="#fcd34d" />
										</linearGradient>
									</defs>
									<polyline
										points={routePoints}
										fill="none"
										stroke="url(#trail-route-line)"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1.8"
										strokeDasharray="3 2"
										opacity="0.95"
									/>
								</svg>

								{hubs.map((hub, index) => {
									const isActive = hub.key === selectedHub?.key;

									return (
										<button
											type="button"
											key={hub.key}
											aria-pressed={isActive}
											onClick={() => setSelectedHubKey(hub.key)}
											className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
											style={{
												left: `${hub.position.x}%`,
												top: `${hub.position.y}%`,
											}}
										>
											<div
												className={`rounded-2xl border px-3 py-3 shadow-lg backdrop-blur transition ${
													isActive
														? "border-amber-300 bg-white text-burgundy-950"
														: "border-white/15 bg-burgundy-950/80 text-white hover:border-amber-200/70"
												}`}
											>
												<div className="flex items-center gap-3">
													<div
														className={`flex size-10 items-center justify-center rounded-full text-sm font-semibold ${
															isActive
																? "bg-amber-500 text-burgundy-950"
																: "bg-white/10 text-amber-200"
														}`}
													>
														{index + 1}
													</div>
													<div>
														<p
															className={`text-xs font-medium uppercase tracking-wide ${
																isActive ? "text-burgundy-700" : "text-burgundy-200"
															}`}
														>
															{hub.venues.length} stop{hub.venues.length === 1 ? "" : "s"}
														</p>
														<p className="font-display text-lg font-bold">{hub.label}</p>
													</div>
												</div>
											</div>
										</button>
									);
								})}

								{selectedHub && (
									<div className="absolute inset-x-0 bottom-0">
										<div className="mx-auto max-w-xl rounded-[1.5rem] border border-white/10 bg-burgundy-950/90 p-5 shadow-2xl backdrop-blur">
											<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
												<div>
													<p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
														{selectedHub.kicker}
													</p>
													<h4 className="mt-2 font-display text-2xl font-bold">
														{selectedHub.label}
													</h4>
													<p className="mt-2 text-sm leading-relaxed text-burgundy-100">
														{selectedHub.description}
													</p>
												</div>
												<div className="flex flex-col gap-2 text-sm text-burgundy-100 sm:text-right">
													<span>{selectedHub.drive}</span>
													<span>{selectedHub.stay}</span>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="mt-6 grid gap-3 md:grid-cols-3">
							{hubs.map((hub) => {
								const isActive = hub.key === selectedHub?.key;

								return (
									<button
										type="button"
										key={hub.key}
										onClick={() => setSelectedHubKey(hub.key)}
										className={`rounded-2xl border px-4 py-4 text-left transition ${
											isActive
												? "border-amber-300 bg-amber-50 text-burgundy-950"
												: "border-white/10 bg-white/5 text-white hover:bg-white/10"
										}`}
									>
										<p
											className={`text-xs font-medium uppercase tracking-[0.18em] ${
												isActive ? "text-burgundy-700" : "text-burgundy-200"
											}`}
										>
											{hub.drive}
										</p>
										<p className="mt-2 font-display text-xl font-bold">{hub.label}</p>
										<p
											className={`mt-1 text-sm ${isActive ? "text-stone-700" : "text-burgundy-100"}`}
										>
											{hub.stay}
										</p>
									</button>
								);
							})}
						</div>
					</section>

					<aside className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
						{selectedHub && selectedVenue ? (
							<>
								<div className="flex flex-col gap-4 border-b border-stone-200 pb-5">
									<div className="flex items-center justify-between gap-4">
										<div>
											<p className="text-sm font-medium uppercase tracking-[0.18em] text-burgundy-700">
												Now exploring
											</p>
											<h3 className="mt-2 font-display text-3xl font-bold text-stone-900">
												{selectedHub.label}
											</h3>
										</div>
										<div className="rounded-full bg-burgundy-50 px-3 py-1 text-sm font-medium text-burgundy-800">
											{selectedHub.venues.length} stop
											{selectedHub.venues.length === 1 ? "" : "s"}
										</div>
									</div>
									<p className="text-stone-600">{selectedHub.description}</p>
									<div className="flex flex-wrap gap-2 text-sm">
										<span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-stone-700">
											<RouteIcon className="h-4 w-4 text-burgundy-700" />
											{selectedHub.drive}
										</span>
										<span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-stone-700">
											<Compass className="h-4 w-4 text-burgundy-700" />
											{selectedHub.stay}
										</span>
									</div>
								</div>

								<div className="mt-6">
									<div className="mb-3 flex items-center justify-between">
										<h4 className="font-semibold text-stone-900">Stops in this stretch</h4>
										{selectedHubRouteUrl && (
											<a
												href={selectedHubRouteUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-1 text-sm font-medium text-burgundy-700 transition hover:text-burgundy-800"
											>
												Route this cluster <ExternalLink className="h-4 w-4" />
											</a>
										)}
									</div>
									<div className="grid gap-3">
										{selectedHub.venues.map((venue) => {
											const isActive = venue.slug === selectedVenue.slug;

											return (
												<button
													type="button"
													key={venue.id}
													onClick={() => setSelectedVenueSlug(venue.slug)}
													className={`rounded-2xl border p-4 text-left transition ${
														isActive
															? "border-burgundy-300 bg-burgundy-50 shadow-sm"
															: "border-stone-200 bg-white hover:border-burgundy-200 hover:bg-stone-50"
													}`}
												>
													<div className="flex items-start justify-between gap-3">
														<div>
															<p className="text-xs font-medium uppercase tracking-wide text-stone-500">
																{venue.city}
																{venue.state ? `, ${venue.state}` : ""}
															</p>
															<h5 className="mt-1 font-display text-xl font-bold text-stone-900">
																{venue.name}
															</h5>
														</div>
														<span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-burgundy-700 shadow-sm">
															{TYPE_LABELS[venue.type]}
														</span>
													</div>
													<p className="mt-3 text-sm leading-relaxed text-stone-600 line-clamp-2">
														{venue.shortDescription || venue.description}
													</p>
												</button>
											);
										})}
									</div>
								</div>

								<article className="mt-6 rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5">
									<p className="text-xs font-medium uppercase tracking-[0.18em] text-burgundy-700">
										Venue spotlight
									</p>
									<h4 className="mt-2 font-display text-2xl font-bold text-stone-900">
										{selectedVenue.name}
									</h4>
									<p className="mt-2 flex items-center gap-2 text-sm text-stone-500">
										<MapPin className="h-4 w-4 text-burgundy-700" />
										{selectedVenue.address ||
											`${selectedVenue.city}${selectedVenue.state ? `, ${selectedVenue.state}` : ""}`}
									</p>
									<p className="mt-4 leading-relaxed text-stone-700">
										{selectedVenue.description || selectedVenue.shortDescription}
									</p>

									{selectedVenue.features && selectedVenue.features.length > 0 && (
										<div className="mt-4 flex flex-wrap gap-2">
											{selectedVenue.features.slice(0, 4).map((feature) => (
												<span
													key={feature}
													className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm text-stone-700 shadow-sm"
												>
													<Music2 className="h-3.5 w-3.5 text-burgundy-700" />
													{feature}
												</span>
											))}
										</div>
									)}

									<div className="mt-5 flex flex-wrap gap-3">
										<Link
											to="/sites/$slug"
											params={{ slug: selectedVenue.slug }}
											className="inline-flex items-center gap-2 rounded-full bg-burgundy-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-burgundy-800"
										>
											View venue page <ArrowRight className="h-4 w-4" />
										</Link>
										{buildVenueMapsUrl(selectedVenue) && (
											<a
												href={buildVenueMapsUrl(selectedVenue) ?? "#"}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:border-burgundy-300 hover:text-burgundy-800"
											>
												Get directions <ExternalLink className="h-4 w-4" />
											</a>
										)}
									</div>
								</article>

								<div className="mt-6 rounded-[1.75rem] bg-stone-100 p-5">
									<p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
										Need the full directory?
									</p>
									<p className="mt-2 text-stone-700">
										Browse every current stop on the trail, including smaller road stops and partner
										venues.
									</p>
									<Link
										to="/sites"
										className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-burgundy-700 transition hover:text-burgundy-800"
									>
										See all venues <ArrowRight className="h-4 w-4" />
									</Link>
								</div>
							</>
						) : (
							<div className="rounded-[1.75rem] border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
								<h3 className="font-display text-2xl font-bold text-stone-900">
									The trail is still coming into focus
								</h3>
								<p className="mt-3 text-stone-600">
									Add venue data to see route clusters, directions, and stop previews here.
								</p>
							</div>
						)}
					</aside>
				</div>
			</div>
		</section>
	);
}
