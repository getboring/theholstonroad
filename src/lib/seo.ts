import { guides } from "../logic/guides";

type SitemapEntry = {
	path: string;
	changefreq: "weekly" | "monthly";
	priority: "1.0" | "0.9" | "0.8" | "0.7" | "0.6";
};

type PageHeadInput = {
	title: string;
	description: string;
	path: string;
	ogType?: "website" | "article";
};

const importMetaEnv = (
	import.meta as ImportMeta & {
		env?: Record<string, string | undefined>;
	}
).env;

function normalizeSiteUrl(siteUrl: string): string {
	return siteUrl.trim().replace(/\/+$/, "");
}

function normalizePath(path: string): string {
	if (path === "/") {
		return "/";
	}

	const trimmedPath = path.trim().replace(/^\/+/, "").replace(/\/+$/, "");

	return trimmedPath ? `/${trimmedPath}` : "/";
}

// One SEO base URL feeds canonicals, JSON-LD, robots.txt, and sitemap.xml.
// Production builds should set VITE_SITE_URL. The Workers URL is the safe fallback for local or
// preview builds where no explicit canonical domain is supplied.
export const DEFAULT_SITE_URL = "https://theholstonroad.codyboring.workers.dev";

export const SITE_URL = normalizeSiteUrl(
	importMetaEnv?.VITE_SITE_URL ??
		process.env.VITE_SITE_URL ??
		process.env.SITE_URL ??
		DEFAULT_SITE_URL,
);

export const SITE_NAME = "The Holston Road";

export const SITE_TITLE = "The Holston Road — Music Heritage Trail of Northeast Tennessee";

export const SITE_DESCRIPTION =
	"A music heritage trail through Northeast Tennessee — from the 1927 Bristol Sessions to the stages of today. Discover the venues, festivals, and stories that made this region the birthplace of country music.";

// Build-time sitemap generation is static for now. Update this list when crawlable static routes
// change; public/sitemap.xml is regenerated from it during pnpm build.
export const STATIC_SITEMAP_ENTRIES: SitemapEntry[] = [
	{ path: "/", changefreq: "weekly", priority: "1.0" },
	{ path: "/the-trail", changefreq: "weekly", priority: "0.9" },
	{ path: "/guides", changefreq: "weekly", priority: "0.8" },
	{ path: "/sites", changefreq: "weekly", priority: "0.9" },
	{ path: "/events", changefreq: "weekly", priority: "0.8" },
	{ path: "/stories", changefreq: "weekly", priority: "0.8" },
	{ path: "/about", changefreq: "monthly", priority: "0.7" },
	{ path: "/chapters/the-sound", changefreq: "monthly", priority: "0.6" },
	{ path: "/chapters/the-sessions", changefreq: "monthly", priority: "0.6" },
	{ path: "/chapters/the-festival", changefreq: "monthly", priority: "0.6" },
	{ path: "/chapters/the-railroad", changefreq: "monthly", priority: "0.6" },
	{ path: "/chapters/the-next-generation", changefreq: "monthly", priority: "0.6" },
	...guides.map((guide) => ({
		path: `/guides/${guide.slug}`,
		changefreq: "monthly" as const,
		priority: "0.7" as const,
	})),
];

export function getCanonicalUrl(path = "/"): string {
	const normalizedPath = normalizePath(path);

	if (normalizedPath === "/") {
		return SITE_URL;
	}

	return `${SITE_URL}${normalizedPath}`;
}

export function createPageHead({ title, description, path, ogType = "website" }: PageHeadInput) {
	const canonicalUrl = getCanonicalUrl(path);

	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:type", content: ogType },
			{ property: "og:url", content: canonicalUrl },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
		],
		links: [{ rel: "canonical", href: canonicalUrl }],
	};
}
