import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import ErrorPage from "../components/ErrorPage";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NotFoundPage from "../components/NotFoundPage";
import { createPageHead, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "../lib/seo";

import appCss from "../styles.css?url";

const structuredData = {
	"@context": "https://schema.org",
	"@type": "TouristAttraction",
	name: SITE_NAME,
	description: SITE_DESCRIPTION,
	url: SITE_URL,
	areaServed: {
		"@type": "City",
		name: "Bristol",
		containedInPlace: {
			"@type": "State",
			name: "Tennessee",
		},
	},
	additionalType: "https://schema.org/Organization",
};

export const Route = createRootRoute({
	head: () => {
		const pageHead = createPageHead({
			title: SITE_TITLE,
			description: SITE_DESCRIPTION,
			path: "/",
		});

		return {
			meta: [
				{ charSet: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				...pageHead.meta,
				{ property: "og:site_name", content: SITE_NAME },
				{ name: "twitter:card", content: "summary_large_image" },
			],
			links: [
				{ rel: "stylesheet", href: appCss },
				{ rel: "preconnect", href: "https://fonts.googleapis.com" },
				{ rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght=500;600;700&display=swap",
				},
				{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
				...pageHead.links,
			],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify(structuredData),
				},
			],
		};
	},
	component: RootLayout,
	notFoundComponent: NotFoundPage,
	errorComponent: ({ error }) => <ErrorPage error={error as Error} />,
	shellComponent: RootDocument,
});

function RootLayout() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="min-h-screen bg-stone-50 text-stone-800 antialiased">
				{children}
				<Scripts />
			</body>
		</html>
	);
}
