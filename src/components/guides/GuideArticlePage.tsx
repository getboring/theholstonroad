import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { ArrowRight, Calendar, Clock3, MapPin } from "lucide-react";
import type { Event, Venue, Wayside } from "../../db/schema";
import { type Guide, getChapterHref } from "../../logic/guides";
import VenuePlaceholder from "../VenuePlaceholder";
import GuideCard from "./GuideCard";

type GuideArticlePageProps = {
	guide: Guide;
	relatedGuides: Guide[];
	relatedVenues: Venue[];
	relatedEvents: Event[];
	relatedWaysides: Wayside[];
};

function formatEventTiming(event: Event): string {
	if (event.isRecurring) {
		return format(new Date(event.startDate), "EEEE • h:mm a");
	}

	return format(new Date(event.startDate), "EEEE, MMMM d, yyyy");
}

export default function GuideArticlePage({
	guide,
	relatedGuides,
	relatedVenues,
	relatedEvents,
	relatedWaysides,
}: GuideArticlePageProps) {
	return (
		<main id="main-content">
			<section className="bg-burgundy-900 px-4 py-20 text-white sm:py-24">
				<div className="mx-auto flex max-w-6xl flex-col gap-8">
					<nav
						aria-label="Breadcrumb"
						className="flex flex-wrap items-center gap-2 text-sm text-burgundy-200"
					>
						<Link to="/" className="transition hover:text-white">
							Home
						</Link>
						<span>/</span>
						<Link to="/guides" className="transition hover:text-white">
							Guides
						</Link>
						<span>/</span>
						<span className="text-white">{guide.title}</span>
					</nav>

					<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
						<div className="flex flex-col gap-6">
							<div className="flex flex-wrap items-center gap-3">
								<span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
									{guide.category}
								</span>
								<span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-100">
									{guide.eyebrow}
								</span>
							</div>
							<div className="flex flex-col gap-4">
								<h1 className="max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-6xl">
									{guide.title}
								</h1>
								<p className="max-w-3xl text-lg leading-relaxed text-burgundy-100 sm:text-xl">
									{guide.description}
								</p>
								<p className="max-w-3xl text-base leading-relaxed text-burgundy-200">
									{guide.intro}
								</p>
							</div>
						</div>

						<div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
							<div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-amber-300">
								<Clock3 className="h-4 w-4" />
								<span>{guide.readTime}</span>
							</div>
							<div className="mt-5 grid gap-3">
								{guide.snapshot.map((item) => (
									<div
										key={`${guide.slug}-${item.label}`}
										className="rounded-2xl border border-white/10 bg-burgundy-950/40 p-4"
									>
										<p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-200">
											{item.label}
										</p>
										<p className="mt-2 text-sm leading-relaxed text-white">{item.value}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="px-4 py-16">
				<div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
					<article className="flex flex-col gap-8">
						<div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
							<p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy-700">
								Why this guide exists
							</p>
							<ul className="mt-5 flex flex-col gap-3 text-base leading-relaxed text-stone-700">
								{guide.highlights.map((highlight) => (
									<li key={highlight} className="flex items-start gap-3">
										<span className="mt-2 h-2 w-2 rounded-full bg-amber-500" />
										<span>{highlight}</span>
									</li>
								))}
							</ul>
						</div>

						{guide.sections.map((section) => (
							<section
								key={section.id}
								id={section.id}
								className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm"
							>
								<div className="flex flex-col gap-5">
									<div className="flex flex-col gap-2">
										<p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy-700">
											Section
										</p>
										<h2 className="font-display text-3xl font-bold text-stone-900">
											{section.title}
										</h2>
									</div>

									<div className="flex flex-col gap-4">
										{section.paragraphs.map((paragraph) => (
											<p key={paragraph} className="text-base leading-relaxed text-stone-700">
												{paragraph}
											</p>
										))}
									</div>

									{section.callout && (
										<aside className="rounded-2xl bg-burgundy-50 p-5">
											<h3 className="font-display text-xl font-bold text-burgundy-900">
												{section.callout.title}
											</h3>
											<p className="mt-2 text-sm leading-relaxed text-burgundy-800">
												{section.callout.body}
											</p>
										</aside>
									)}

									{section.stops && section.stops.length > 0 && (
										<div className="grid gap-4 md:grid-cols-2">
											{section.stops.map((stop) => (
												<div
													key={`${section.id}-${stop.title}`}
													className="rounded-2xl border border-stone-200 bg-stone-50 p-5"
												>
													<p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
														{stop.eyebrow}
													</p>
													<h3 className="mt-2 font-display text-2xl font-bold text-stone-900">
														{stop.title}
													</h3>
													<p className="mt-3 text-sm leading-relaxed text-stone-600">
														{stop.description}
													</p>
													{stop.href && (
														<Link
															to={stop.href}
															className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-burgundy-700"
														>
															Open stop
															<ArrowRight className="h-4 w-4" />
														</Link>
													)}
												</div>
											))}
										</div>
									)}

									{section.bullets && section.bullets.length > 0 && (
										<ul className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-5 text-sm leading-relaxed text-stone-700">
											{section.bullets.map((bullet) => (
												<li key={bullet} className="flex items-start gap-3">
													<span className="mt-2 h-1.5 w-1.5 rounded-full bg-burgundy-700" />
													<span>{bullet}</span>
												</li>
											))}
										</ul>
									)}

									{section.links && section.links.length > 0 && (
										<div className="grid gap-4 md:grid-cols-2">
											{section.links.map((link) => (
												<Link
													key={`${section.id}-${link.href}`}
													to={link.href}
													className="group rounded-2xl border border-stone-200 p-5 transition hover:border-burgundy-300 hover:bg-stone-50"
												>
													<h3 className="font-display text-xl font-bold text-stone-900 transition group-hover:text-burgundy-700">
														{link.label}
													</h3>
													{link.description && (
														<p className="mt-2 text-sm leading-relaxed text-stone-600">
															{link.description}
														</p>
													)}
													<div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-burgundy-700">
														Open link
														<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
													</div>
												</Link>
											))}
										</div>
									)}
								</div>
							</section>
						))}

						<section className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
							<div className="flex flex-col gap-2">
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy-700">
									Read deeper
								</p>
								<h2 className="font-display text-3xl font-bold text-stone-900">
									Story chapters that support this guide
								</h2>
							</div>

							<div className="mt-6 grid gap-4 md:grid-cols-2">
								{relatedWaysides.map((wayside) => (
									<Link
										key={wayside.id}
										to={getChapterHref(wayside.slug)}
										className="group rounded-2xl border border-stone-200 bg-stone-50 p-5 transition hover:border-burgundy-300 hover:bg-white"
									>
										<p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
											Trail chapter
										</p>
										<h3 className="mt-2 font-display text-2xl font-bold text-stone-900 transition group-hover:text-burgundy-700">
											{wayside.name}
										</h3>
										<p className="mt-3 text-sm leading-relaxed text-stone-600">
											{wayside.content?.summary ?? "Read the full chapter."}
										</p>
									</Link>
								))}
							</div>
						</section>

						<section className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
							<div className="flex flex-col gap-2">
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy-700">
									Related stops
								</p>
								<h2 className="font-display text-3xl font-bold text-stone-900">
									Venue pages to open next
								</h2>
							</div>

							<div className="mt-6 grid gap-5 md:grid-cols-2">
								{relatedVenues.map((venue) => (
									<Link
										key={venue.id}
										to="/sites/$slug"
										params={{ slug: venue.slug }}
										className="group overflow-hidden rounded-3xl border border-stone-200 transition hover:-translate-y-1 hover:shadow-lg"
									>
										<VenuePlaceholder name={venue.name} type={venue.type} className="h-40 w-full" />
										<div className="flex flex-col gap-3 bg-white p-5">
											<div className="flex items-center gap-2 text-sm text-stone-500">
												<MapPin className="h-4 w-4 text-burgundy-600" />
												<span>
													{venue.city}
													{venue.state ? `, ${venue.state}` : ""}
												</span>
											</div>
											<h3 className="font-display text-2xl font-bold text-stone-900 transition group-hover:text-burgundy-700">
												{venue.name}
											</h3>
											<p className="text-sm leading-relaxed text-stone-600">
												{venue.shortDescription || venue.description || "Open the venue guide."}
											</p>
										</div>
									</Link>
								))}
							</div>
						</section>

						<section className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
							<div className="flex flex-col gap-2">
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy-700">
									Live planning cues
								</p>
								<h2 className="font-display text-3xl font-bold text-stone-900">
									Events and recurring music tied to this guide
								</h2>
							</div>

							{relatedEvents.length > 0 ? (
								<div className="mt-6 grid gap-4 md:grid-cols-2">
									{relatedEvents.map((event) => (
										<Link
											key={event.id}
											to="/events"
											className="group rounded-2xl border border-stone-200 bg-stone-50 p-5 transition hover:border-burgundy-300 hover:bg-white"
										>
											<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
												<Calendar className="h-4 w-4 text-burgundy-600" />
												<span>{event.isRecurring ? "Recurring" : "Special event"}</span>
											</div>
											<h3 className="mt-3 font-display text-2xl font-bold text-stone-900 transition group-hover:text-burgundy-700">
												{event.name}
											</h3>
											<p className="mt-3 text-sm leading-relaxed text-stone-600">
												{event.description}
											</p>
											<div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-stone-500">
												<span>{formatEventTiming(event)}</span>
												{event.admission && <span>{event.admission}</span>}
											</div>
										</Link>
									))}
								</div>
							) : (
								<div className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-6">
									<p className="text-sm leading-relaxed text-stone-600">
										No linked events are published yet for this guide. Use the full events page for
										the latest public schedule.
									</p>
								</div>
							)}
						</section>

						<section className="rounded-3xl bg-amber-600 p-8 text-white shadow-sm">
							<h2 className="font-display text-3xl font-bold">{guide.cta.title}</h2>
							<p className="mt-3 max-w-3xl text-base leading-relaxed text-amber-950">
								{guide.cta.description}
							</p>
							<div className="mt-6 flex flex-col gap-3 sm:flex-row">
								{guide.cta.links.map((link, index) => (
									<Link
										key={`${guide.slug}-cta-${link.href}`}
										to={link.href}
										className={
											index === 0
												? "inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-medium text-amber-700 transition hover:bg-stone-100"
												: "inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 font-medium text-white transition hover:bg-amber-700"
										}
									>
										{link.label}
									</Link>
								))}
							</div>
						</section>

						{relatedGuides.length > 0 && (
							<section className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
								<div className="flex flex-col gap-2">
									<p className="text-sm font-semibold uppercase tracking-[0.2em] text-burgundy-700">
										Keep exploring
									</p>
									<h2 className="font-display text-3xl font-bold text-stone-900">
										More guides from this editorial set
									</h2>
								</div>

								<div className="mt-6 grid gap-5 md:grid-cols-2">
									{relatedGuides.map((relatedGuide) => (
										<GuideCard key={relatedGuide.slug} guide={relatedGuide} compact />
									))}
								</div>
							</section>
						)}
					</article>

					<aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
						<div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
							<h2 className="font-display text-2xl font-bold text-stone-900">On this page</h2>
							<nav className="mt-5 flex flex-col gap-3" aria-label="Guide sections">
								{guide.sections.map((section) => (
									<a
										key={`${guide.slug}-nav-${section.id}`}
										href={`#${section.id}`}
										className="text-sm font-medium text-stone-600 transition hover:text-burgundy-700"
									>
										{section.title}
									</a>
								))}
							</nav>
						</div>

						<div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
							<h2 className="font-display text-2xl font-bold text-stone-900">Planning links</h2>
							<div className="mt-5 flex flex-col gap-4">
								{guide.primaryLinks.map((link) => (
									<Link
										key={`${guide.slug}-${link.href}`}
										to={link.href}
										className="rounded-2xl border border-stone-200 bg-stone-50 p-4 transition hover:border-burgundy-300 hover:bg-white"
									>
										<h3 className="font-semibold text-stone-900">{link.label}</h3>
										{link.description && (
											<p className="mt-2 text-sm leading-relaxed text-stone-600">
												{link.description}
											</p>
										)}
									</Link>
								))}
							</div>
						</div>

						<div className="rounded-3xl border border-stone-200 bg-stone-100 p-6 shadow-sm">
							<h2 className="font-display text-2xl font-bold text-stone-900">Guide index</h2>
							<p className="mt-3 text-sm leading-relaxed text-stone-600">
								Prefer to choose by intent instead of by page? Return to the full guide hub.
							</p>
							<Link
								to="/guides"
								className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-burgundy-700"
							>
								Back to all guides
								<ArrowRight className="h-4 w-4" />
							</Link>
						</div>
					</aside>
				</div>
			</section>
		</main>
	);
}
