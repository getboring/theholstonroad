import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { type Guide, getGuideHref } from "../../logic/guides";

type GuideCardProps = {
	guide: Guide;
	compact?: boolean;
};

export default function GuideCard({ guide, compact = false }: GuideCardProps) {
	return (
		<Link
			to={getGuideHref(guide.slug)}
			className="group flex h-full flex-col rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
		>
			<div className="flex items-center justify-between gap-4">
				<span className="rounded-full bg-burgundy-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-700">
					{guide.category}
				</span>
				<span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
					{guide.readTime}
				</span>
			</div>

			<div className="mt-5 flex flex-1 flex-col gap-4">
				<div className="flex flex-col gap-2">
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
						{guide.eyebrow}
					</p>
					<h2 className="font-display text-2xl font-bold text-stone-900 transition group-hover:text-burgundy-700">
						{guide.title}
					</h2>
					<p className="text-sm leading-relaxed text-stone-600">{guide.description}</p>
				</div>

				<div className="flex flex-wrap gap-2">
					{guide.snapshot.slice(0, compact ? 2 : 3).map((item) => (
						<span
							key={`${guide.slug}-${item.label}`}
							className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600"
						>
							{item.value}
						</span>
					))}
				</div>

				{!compact && (
					<ul className="flex flex-col gap-2 text-sm text-stone-600">
						{guide.highlights.map((highlight) => (
							<li key={highlight} className="flex items-start gap-2">
								<span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
								<span>{highlight}</span>
							</li>
						))}
					</ul>
				)}
			</div>

			<div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-burgundy-700">
				Open guide
				<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
			</div>
		</Link>
	);
}
