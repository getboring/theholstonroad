import { createFileRoute, notFound } from "@tanstack/react-router";
import GuideArticlePage from "../../components/guides/GuideArticlePage";
import {
	getHolstonRoadEvents,
	getHolstonRoadVenues,
	getHolstonRoadWaysides,
} from "../../db/queries";
import { getDbBinding } from "../../lib/db-binding";
import { createPageHead, getCanonicalUrl, SITE_NAME } from "../../lib/seo";
import {
	getGuideBySlug,
	getGuideEvents,
	getGuideVenues,
	getGuideWaysides,
	getRelatedGuides,
} from "../../logic/guides";

export const Route = createFileRoute("/guides/$slug")({
	component: GuideDetailPage,
	loader: async (loaderArgs) => {
		const guide = getGuideBySlug(loaderArgs.params.slug);

		if (!guide) {
			throw notFound();
		}

		const [venues, events, waysides] = await Promise.all([
			getHolstonRoadVenues(getDbBinding(loaderArgs)),
			getHolstonRoadEvents(getDbBinding(loaderArgs)),
			getHolstonRoadWaysides(getDbBinding(loaderArgs)),
		]);

		return {
			guide,
			relatedGuides: getRelatedGuides(guide),
			relatedVenues: getGuideVenues(guide, venues),
			relatedEvents: getGuideEvents(guide, events),
			relatedWaysides: getGuideWaysides(guide, waysides),
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) {
			return createPageHead({
				title: "Guide — The Holston Road",
				description: "Editorial guide from The Holston Road.",
				path: "/guides",
				ogType: "article",
			});
		}

		const { guide } = loaderData;
		const path = `/guides/${guide.slug}`;
		const pageHead = createPageHead({
			title: `${guide.title} — The Holston Road`,
			description: guide.description,
			path,
			ogType: "article",
		});
		const canonicalUrl = getCanonicalUrl(path);
		const structuredData = {
			"@context": "https://schema.org",
			"@graph": [
				{
					"@type": guide.schemaType,
					headline: guide.title,
					name: guide.title,
					description: guide.description,
					url: canonicalUrl,
					isPartOf: {
						"@type": "WebSite",
						name: SITE_NAME,
						url: getCanonicalUrl("/"),
					},
					about: guide.relatedWaysideSlugs.map((slug) => ({
						"@type": "Thing",
						name: slug.replaceAll("-", " "),
					})),
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
							item: getCanonicalUrl("/guides"),
						},
						{
							"@type": "ListItem",
							position: 3,
							name: guide.title,
							item: canonicalUrl,
						},
					],
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

function GuideDetailPage() {
	const { guide, relatedGuides, relatedVenues, relatedEvents, relatedWaysides } =
		Route.useLoaderData();

	return (
		<GuideArticlePage
			guide={guide}
			relatedGuides={relatedGuides}
			relatedVenues={relatedVenues}
			relatedEvents={relatedEvents}
			relatedWaysides={relatedWaysides}
		/>
	);
}
