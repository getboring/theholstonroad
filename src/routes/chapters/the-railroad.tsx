import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { createPageHead } from "../../lib/seo";

export const Route = createFileRoute("/chapters/the-railroad")({
	component: ChapterRailroad,
	head: () =>
		createPageHead({
			title: "The Railroad — The Holston Road",
			description:
				"The Virginia & Tennessee Railroad brought the musicians to Bristol. It brought the recording equipment. And it took the music back out to the world.",
			path: "/chapters/the-railroad",
		}),
});

function ChapterRailroad() {
	return (
		<main>
			<section className="bg-walnut-700 px-4 py-20 text-white sm:py-28">
				<div className="mx-auto max-w-4xl">
					<p className="mb-2 text-sm font-medium uppercase tracking-widest text-walnut-300">
						Chapter 2
					</p>
					<h1 className="mb-6 font-display text-5xl font-bold tracking-tight sm:text-6xl">
						The Railroad
					</h1>
					<p className="max-w-2xl text-xl leading-relaxed text-walnut-200">
						The Virginia & Tennessee Railroad brought the musicians to Bristol. It brought the
						recording equipment. And it took the music back out to the world.
					</p>
				</div>
			</section>

			<section className="px-4 py-16">
				<div className="mx-auto max-w-3xl space-y-8 text-lg leading-relaxed text-stone-700">
					<p>
						In 1856, the Virginia & Tennessee Railroad reached Bristol. For the first time, the
						mountain communities of Appalachia were connected to the rest of the country by
						something faster than a horse. By the 1920s, that railroad had made Bristol a
						destination.
					</p>
					<p>
						Ralph Peer didn't choose Bristol by accident. He chose it because the railroad made it
						accessible. Musicians from the surrounding mountains — many of whom had never left their
						home counties — could board a train and arrive in Bristol with their instruments and
						their songs.
					</p>
					<p>
						The railroad also brought the recording technology. Those heavy disc-cutting machines,
						the microphones, the amplifiers — all of it traveled by train. And when the sessions
						were done, the master discs traveled back out the same way, bound for pressing plants in
						Camden, New Jersey, and distribution across the country.
					</p>
					<p>
						Without the railroad, there are no Bristol Sessions. Without the Bristol Sessions, the
						sound of the mountains stays in the mountains. The railroad didn't just connect places.
						It connected sounds.
					</p>
					<div className="rounded-xl border-l-4 border-amber-600 bg-amber-50 p-6">
						<p className="font-display text-lg font-bold text-amber-900">The Question</p>
						<p className="mt-2 text-stone-700">What journey changed the way you hear music?</p>
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
							<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-walnut-200 text-walnut-700">
								<MapPin className="h-5 w-5" />
							</div>
							<div>
								<h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-walnut-700 transition">
									Birthplace of Country Music Museum
								</h3>
								<p className="text-sm text-stone-600">
									Bristol, VA/TN — Where the railroad met the recordings
								</p>
							</div>
						</Link>
					</div>
				</div>
			</section>

			<section className="px-4 py-16">
				<div className="mx-auto max-w-4xl flex items-center justify-between">
					<Link
						to="/chapters/the-sound"
						className="flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 font-medium text-stone-600 transition hover:bg-stone-100"
					>
						<ArrowLeft className="h-4 w-4" /> The Sound
					</Link>
					<Link
						to="/chapters/the-sessions"
						className="flex items-center gap-2 rounded-full bg-burgundy-700 px-6 py-3 font-medium text-white transition hover:bg-burgundy-800"
					>
						Next: The Sessions <ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</section>
		</main>
	);
}
