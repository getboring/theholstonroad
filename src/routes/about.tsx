import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	BadgeCheck,
	Building2,
	ExternalLink,
	Newspaper,
	Route as RouteIcon,
} from "lucide-react";
import { createPageHead } from "../lib/seo";
import {
	audienceSurfaces,
	credibilityStats,
	getAboutPageStructuredData,
	launchPillars,
	partnerProofSignals,
} from "../logic/partner-proof";

const aboutStructuredData = getAboutPageStructuredData();

export const Route = createFileRoute("/about")({
	component: AboutPage,
	head: () => {
		const pageHead = createPageHead({
			title: "About — The Holston Road",
			description:
				"The Holston Road is a regional music trail effort shaped by real Northeast Tennessee institutions, venues, festivals, and music programs.",
			path: "/about",
		});

		return {
			...pageHead,
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify(aboutStructuredData),
				},
			],
		};
	},
});

function AboutPage() {
	return (
		<main id="main-content">
			<section className="bg-burgundy-900 px-4 py-20 text-white sm:py-28">
				<div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center">
					<div>
						<p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
							Regional music trail effort
						</p>
						<h1 className="max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
							This trail feels credible because the region already is.
						</h1>
						<p className="mt-6 max-w-3xl text-lg leading-relaxed text-burgundy-100">
							The Holston Road is not trying to invent a music destination out of thin air. It is
							organizing the real institutions, stages, festivals, and stories that already make
							Northeast Tennessee feel like a living music corridor.
						</p>
						<p className="mt-4 max-w-3xl text-lg leading-relaxed text-burgundy-100">
							For the 2026 launch, that matters. Partners, press, and visitors should see a regional
							effort anchored by museums, educators, broadcasters, and venues that can already be
							visited, heard, and trusted.
						</p>

						<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
							<Link
								to="/sites"
								search={{ city: "all", type: "major", eventful: "all" }}
								className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-8 py-3.5 font-medium text-white transition hover:bg-amber-700"
							>
								See anchor venues <ArrowRight className="h-4 w-4" />
							</Link>
							<Link
								to="/stories"
								className="inline-flex items-center justify-center gap-2 rounded-full border border-burgundy-600 bg-white/5 px-8 py-3.5 font-medium text-burgundy-50 transition hover:bg-burgundy-800"
							>
								Read the regional story
							</Link>
						</div>
					</div>

					<aside className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
						<p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
							Visible proof
						</p>
						<h2 className="mt-3 font-display text-3xl font-bold text-white">
							Real anchors already on the ground.
						</h2>
						<div className="mt-6 flex flex-col gap-3">
							{partnerProofSignals.slice(0, 4).map((signal) => (
								<div
									key={signal.name}
									className="rounded-2xl border border-white/10 bg-white/5 p-4"
								>
									<p className="text-xs font-medium uppercase tracking-[0.2em] text-burgundy-200">
										{signal.category}
									</p>
									<h3 className="mt-2 font-display text-xl font-bold text-white">{signal.name}</h3>
									<p className="mt-2 text-sm leading-relaxed text-burgundy-100">{signal.proof}</p>
								</div>
							))}
						</div>
					</aside>
				</div>
			</section>

			<section className="px-4 py-20">
				<div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
					<div>
						<p className="text-sm font-medium uppercase tracking-[0.28em] text-burgundy-700">
							Why this exists
						</p>
						<h2 className="mt-3 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
							A public trail for a regional music story that was already bigger than one weekend.
						</h2>
						<div className="mt-8 flex flex-col gap-6 text-lg leading-relaxed text-stone-700">
							<p>
								In 1927, Ralph Peer set up a temporary recording studio on State Street in Bristol
								and recorded Jimmie Rodgers, the Carter Family, and a slate of performers who would
								change American music. Congress later recognized Bristol as the Birthplace of
								Country Music, but the real story never belonged to one building or one week.
							</p>
							<p>
								The railroad, the radio years, the listening rooms, the festival stages, and the
								music programs across the Tri-Cities all kept the sound moving. The Holston Road
								exists to make that regional shape legible. It connects Bristol, Johnson City,
								Kingsport, and the adjacent Appalachian corridor into one public-facing route people
								can understand.
							</p>
							<p>
								That is why the product should not feel like a standalone demo. It should feel like
								a front door into institutions that already carry weight: the museum on State
								Street, the rooms that still book shows, the classrooms training the next
								generation, and the festival that proves the audience is already here.
							</p>
						</div>
					</div>

					<aside className="flex flex-col gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-6">
						<div className="flex items-center gap-2 text-burgundy-700">
							<BadgeCheck className="h-5 w-5" />
							<p className="text-sm font-semibold uppercase tracking-[0.25em]">
								Credibility markers
							</p>
						</div>
						<div className="flex flex-col gap-4">
							{credibilityStats.map((stat) => (
								<div
									key={stat.label}
									className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
								>
									<p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
										{stat.label}
									</p>
									<p className="mt-2 font-display text-3xl font-bold text-stone-900">
										{stat.value}
									</p>
									<p className="mt-2 text-sm leading-relaxed text-stone-600">{stat.detail}</p>
								</div>
							))}
						</div>
					</aside>
				</div>
			</section>

			<section id="partners" className="border-y border-stone-200 bg-stone-100 px-4 py-20">
				<div className="mx-auto max-w-6xl">
					<div className="mx-auto max-w-3xl text-center">
						<p className="text-sm font-medium uppercase tracking-[0.28em] text-burgundy-700">
							Regional proof
						</p>
						<h2 className="mt-3 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
							Institutions that make The Holston Road read like a real corridor.
						</h2>
						<p className="mt-4 text-lg leading-relaxed text-stone-600">
							These are not invented endorsements. They are the real museums, venues, broadcasters,
							educators, and neighboring trail infrastructure that already give the region cultural
							weight.
						</p>
					</div>

					<div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
						{partnerProofSignals.map((signal) => (
							<article
								key={signal.name}
								className="flex h-full flex-col rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
							>
								<p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-700">
									{signal.category}
								</p>
								<h3 className="mt-3 font-display text-2xl font-bold text-stone-900">
									{signal.name}
								</h3>
								<p className="mt-3 text-base leading-relaxed text-stone-700">{signal.proof}</p>
								<p className="mt-4 text-sm leading-relaxed text-stone-600">{signal.description}</p>
								<div className="mt-6">
									{signal.link.kind === "internal" ? (
										<Link
											to={signal.link.to}
											className="inline-flex items-center gap-2 text-sm font-medium text-burgundy-700 transition hover:text-burgundy-800"
										>
											{signal.link.label}
											<ArrowRight className="h-4 w-4" />
										</Link>
									) : (
										<a
											href={signal.link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 text-sm font-medium text-burgundy-700 transition hover:text-burgundy-800"
										>
											{signal.link.label}
											<ExternalLink className="h-4 w-4" />
										</a>
									)}
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="px-4 py-20">
				<div className="mx-auto max-w-6xl">
					<div className="mx-auto max-w-3xl text-center">
						<p className="text-sm font-medium uppercase tracking-[0.28em] text-burgundy-700">
							2026 launch narrative
						</p>
						<h2 className="mt-3 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
							The strongest story is connection, not invention.
						</h2>
						<p className="mt-4 text-lg leading-relaxed text-stone-600">
							The Holston Road works best when it behaves like connective tissue between real
							places, not a branded layer sitting above them.
						</p>
					</div>

					<div className="mt-12 grid gap-6 lg:grid-cols-3">
						{launchPillars.map((pillar, index) => {
							const Icon = [RouteIcon, Building2, Newspaper][index];

							return (
								<div
									key={pillar.title}
									className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
								>
									<div className="flex size-12 items-center justify-center rounded-2xl bg-burgundy-50 text-burgundy-700">
										<Icon className="h-5 w-5" />
									</div>
									<h3 className="mt-5 font-display text-2xl font-bold text-stone-900">
										{pillar.title}
									</h3>
									<p className="mt-3 leading-relaxed text-stone-600">{pillar.description}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			<section className="border-t border-stone-200 bg-stone-100 px-4 py-20">
				<div className="mx-auto max-w-6xl">
					<div className="mx-auto max-w-3xl text-center">
						<p className="text-sm font-medium uppercase tracking-[0.28em] text-burgundy-700">
							Partner-facing surface
						</p>
						<h2 className="mt-3 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
							Useful to partners, press, and visitors on day one.
						</h2>
						<p className="mt-4 text-lg leading-relaxed text-stone-600">
							The page should reassure cultural institutions, regional advocates, and first-time
							visitors that the trail is grounded in public-facing places they can verify
							immediately.
						</p>
					</div>

					<div className="mt-12 grid gap-6 lg:grid-cols-3">
						{audienceSurfaces.map((surface) => (
							<div
								key={surface.audience}
								className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
							>
								<p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-700">
									{surface.audience}
								</p>
								<h3 className="mt-3 font-display text-2xl font-bold text-stone-900">
									{surface.title}
								</h3>
								<p className="mt-3 leading-relaxed text-stone-600">{surface.description}</p>
								<div className="mt-6">
									{surface.cta.kind === "internal" ? (
										<Link
											to={surface.cta.to}
											className="inline-flex items-center gap-2 text-sm font-medium text-burgundy-700 transition hover:text-burgundy-800"
										>
											{surface.cta.label}
											<ArrowRight className="h-4 w-4" />
										</Link>
									) : (
										<a
											href={surface.cta.href}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 text-sm font-medium text-burgundy-700 transition hover:text-burgundy-800"
										>
											{surface.cta.label}
											<ExternalLink className="h-4 w-4" />
										</a>
									)}
								</div>
							</div>
						))}
					</div>

					<div className="mt-12 rounded-3xl bg-burgundy-900 p-8 text-white sm:p-10">
						<h2 className="font-display text-3xl font-bold">
							Stewarded by the sound, backed by the region.
						</h2>
						<p className="mt-4 max-w-3xl text-lg leading-relaxed text-burgundy-100">
							If you run a venue, festival, museum, education program, or tourism office in this
							music corridor, the goal is simple: make the region feel more connected, more legible,
							and more trustworthy in public.
						</p>
						<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
							<Link
								to="/the-trail"
								className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-7 py-3 font-medium text-white transition hover:bg-amber-700"
							>
								Explore the route <ArrowRight className="h-4 w-4" />
							</Link>
							<a
								href="mailto:hello@theholstonroad.org"
								className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 font-medium text-white transition hover:bg-white/10"
							>
								Talk with the project team
							</a>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
