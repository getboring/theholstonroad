import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Music } from "lucide-react";

const navLinks = [
	{ to: "/the-trail", label: "The Trail" },
	{ to: "/guides", label: "Guides" },
	{ to: "/sites", label: "Venues" },
	{ to: "/events", label: "Events" },
	{ to: "/stories", label: "Stories" },
	{ to: "/about", label: "About" },
];

export default function Header() {
	const router = useRouterState();
	const currentPath = router.location.pathname;

	const closeMobileMenu = (target: EventTarget | null) => {
		if (!(target instanceof Element)) {
			return;
		}

		const details = target.closest("details");
		if (details instanceof HTMLDetailsElement) {
			details.open = false;
		}
	};

	return (
		<header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur-md">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
				<Link
					to="/"
					className="flex items-center gap-2 rounded-lg px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600 focus-visible:ring-offset-2"
				>
					<Music className="h-6 w-6 text-burgundy-700" />
					<span className="text-lg font-bold tracking-tight text-stone-900">
						The Holston Road
					</span>
				</Link>

				<nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
					{navLinks.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className={`rounded-lg px-1 py-1 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600 focus-visible:ring-offset-2 ${
								currentPath === link.to || currentPath.startsWith(`${link.to}/`)
									? "text-burgundy-700"
									: "text-stone-600 hover:text-burgundy-700"
							}`}
						>
							{link.label}
						</Link>
					))}
					<Link
						to="/"
						hash="newsletter"
						className="rounded-full bg-burgundy-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-burgundy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600 focus-visible:ring-offset-2"
					>
						Get the Dispatch
					</Link>
				</nav>

				<details className="relative md:hidden" open={false}>
					<summary
						className="list-none rounded-lg p-2 text-stone-700 transition hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden"
						aria-controls="mobile-menu"
						aria-label="Toggle menu"
					>
						<span className="sr-only">Toggle menu</span>
						<Menu className="h-6 w-6" />
					</summary>
					<div
						id="mobile-menu"
						className="fixed inset-x-0 top-[57px] z-40 border-b border-stone-200 bg-white px-4 py-4 shadow-lg"
					>
						<nav className="flex flex-col gap-3" aria-label="Mobile navigation">
							{navLinks.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									onClick={(event) => closeMobileMenu(event.currentTarget)}
									className={`rounded-lg px-2 py-2 text-base font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600 focus-visible:ring-offset-2 ${
										currentPath === link.to || currentPath.startsWith(`${link.to}/`)
											? "text-burgundy-700"
											: "text-stone-600"
									}`}
								>
									{link.label}
								</Link>
							))}
							<Link
								to="/"
								hash="newsletter"
								onClick={(event) => closeMobileMenu(event.currentTarget)}
								className="mt-2 rounded-full bg-burgundy-700 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-burgundy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600 focus-visible:ring-offset-2"
							>
								Get the Dispatch
							</Link>
						</nav>
					</div>
				</details>
			</div>
		</header>
	);
}
