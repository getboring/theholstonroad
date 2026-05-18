import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { createPageHead } from "../../lib/seo";

export const Route = createFileRoute("/chapters/the-festival")({
	component: ChapterFestival,
	head: () =>
		createPageHead({
			title: "The Festival — The Holston Road",
			description:
				"Bristol Rhythm & Roots Reunion. Twenty years of celebrating the legacy of the 1927 Sessions on the same street where it all began.",
			path: "/chapters/the-festival",
		}),
});

function ChapterFestival() {
	return (
		<main>
			<section className="bg-amber-700 px-4 py-20 text-white sm:py-28">
				<div className="mx-auto max-w-4xl">
					<p className="mb-2 text-sm font-medium uppercase tracking-widest text-amber-300">
						Chapter 4
					</p>
					<h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">
						The Festival
					</h1>
					<p className="max-w-2xl text-xl leading-relaxed text-amber-200">
						Bristol Rhythm & Roots Reunion. Twenty years of celebrating the legacy of the 1927
						Sessions on the same street where it all began.
					</p>
				</div>
			</section>

			<section className="px-4 py-16">
				<div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-stone-700">
					<p>
						In 2001, a group of Bristol locals had an idea: what if we shut down State Street for a
						weekend, set up stages on both sides of the Tennessee-Virginia state line, and threw a
						party celebrating the music that was born here? They called it the Bristol Rhythm &
						Roots Reunion. Twenty years later, it's one of the most celebrated roots music festivals
						in America.
					</p>
					<p>
						The Reunion takes over downtown Bristol every September. Twenty-plus stages. Dozens of
						artists. Food vendors, craft markets, and street performers fill the gaps between sets.
						The Birthplace of Country Music Museum hosts special exhibits. Local venues host
						after-parties that run until the early morning.
					</p>
					<p>
						The Crooked Road — Virginia's Heritage Music Trail — presents heritage music at the
						festival annually, connecting Southwest Virginia to Northeast Tennessee. ETSU students
						play side stages. Local pickers host impromptu jams on street corners. And every year,
						someone discovers a sound they didn't know they were looking for.
					</p>
					<p>
						The Reunion isn't a museum piece. It's proof that the music born in 1927 didn't die when
						the recordings stopped. It just moved outside — onto the same street, in front of the
						same buildings, played by a new generation of musicians who understand exactly what
						they're inheriting.
					</p>
					<div className="rounded-xl border-l-4 border-amber-600 bg-amber-50 p-6">
						<p className="font-display text-lg font-bold text-amber-900">The Question</p>
						<p className="mt-2 text-stone-700">
							What tradition would you celebrate if you could shut down your whole town for a
							weekend?
						</p>
					</div>
				</div>
			</section>

			<section className="border-t border-stone-200 bg-stone-100 px-4 py-16">
				<div className="mx-auto max-w-4xl">
					<h2 className="mb-8 font-display text-2xl font-bold text-stone-900">Related Venues</h2>
					<div className="grid gap-6 md:grid-cols-2">
						<Link
							to="/sites/$slug"
							params={{ slug: "birthplace-of-country-music-museum" }}
							className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md"
						>
							<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
								<MapPin className="h-5 w-5" />
							</div>
							<div>
								<h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-amber-700 transition">
									Birthplace of Country Music Museum
								</h3>
								<p className="text-sm text-stone-600">
									Bristol, TN/VA — Anchor of the festival weekend
								</p>
							</div>
						</Link>
						<Link
							to="/sites/$slug"
							params={{ slug: "paramount-bristol" }}
							className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md"
						>
							<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
								<MapPin className="h-5 w-5" />
							</div>
							<div>
								<h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-amber-700 transition">
									Bristol Paramount
								</h3>
								<p className="text-sm text-stone-600">Bristol, TN — Historic theater venue</p>
							</div>
						</Link>
					</div>
				</div>
			</section>

			<section className="px-4 py-16">
				<div className="mx-auto max-w-4xl flex items-center justify-between">
					<Link
						to="/chapters/the-sessions"
						className="flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 font-medium text-stone-600 transition hover:bg-stone-100"
					>
						<ArrowLeft className="h-4 w-4" /> The Sessions
					</Link>
					<Link
						to="/chapters/the-next-generation"
						className="flex items-center gap-2 rounded-full bg-burgundy-700 px-6 py-3 font-medium text-white transition hover:bg-burgundy-800"
					>
						Next: The Next Generation <ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</section>
		</main>
	);
}
