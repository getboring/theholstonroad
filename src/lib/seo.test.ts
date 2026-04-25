import { createPageHead, getCanonicalUrl, SITE_URL, STATIC_SITEMAP_ENTRIES } from "./seo";

describe("seo helpers", () => {
	it("normalizes canonical URLs for nested paths and the site root", () => {
		expect(getCanonicalUrl("/")).toBe(SITE_URL);
		expect(getCanonicalUrl(" /events/ ")).toBe(`${SITE_URL}/events`);
		expect(getCanonicalUrl("sites/bristol///")).toBe(`${SITE_URL}/sites/bristol`);
	});

	it("builds page head metadata with canonical and social tags", () => {
		const pageHead = createPageHead({
			title: "Bristol Sessions",
			description: "The story of the 1927 recordings.",
			path: " /chapters/the-sessions/ ",
			ogType: "article",
		});

		expect(pageHead.links).toEqual([
			{ rel: "canonical", href: `${SITE_URL}/chapters/the-sessions` },
		]);
		expect(pageHead.meta).toEqual(
			expect.arrayContaining([
				{ title: "Bristol Sessions" },
				{ name: "description", content: "The story of the 1927 recordings." },
				{ property: "og:title", content: "Bristol Sessions" },
				{ property: "og:description", content: "The story of the 1927 recordings." },
				{ property: "og:type", content: "article" },
				{ property: "og:url", content: `${SITE_URL}/chapters/the-sessions` },
				{ name: "twitter:title", content: "Bristol Sessions" },
				{ name: "twitter:description", content: "The story of the 1927 recordings." },
			]),
		);
	});

	it("keeps static sitemap entries unique and rooted paths only", () => {
		const paths = STATIC_SITEMAP_ENTRIES.map((entry) => entry.path);

		expect(new Set(paths).size).toBe(paths.length);
		expect(paths.every((path) => path.startsWith("/"))).toBe(true);
		expect(paths).toEqual(
			expect.arrayContaining([
				"/",
				"/the-trail",
				"/guides",
				"/sites",
				"/events",
				"/stories",
				"/about",
				"/guides/weekend-country-music-itinerary",
				"/guides/bristol-sessions-guide",
				"/guides/live-roots-music-johnson-city",
			]),
		);
	});
});
