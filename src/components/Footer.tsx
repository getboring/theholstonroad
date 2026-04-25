import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Music, Youtube } from "lucide-react";

export default function Footer() {
	return (
		<footer className="border-t border-stone-200 bg-stone-100">
			<div className="mx-auto max-w-6xl px-4 py-12">
				<div className="grid gap-8 md:grid-cols-4">
					<div className="md:col-span-2">
						<div className="mb-4 flex items-center gap-2">
							<Music className="h-5 w-5 text-burgundy-700" />
							<span className="text-lg font-bold text-stone-900">The Holston Road</span>
						</div>
						<p className="mb-4 max-w-sm text-sm leading-relaxed text-stone-600">
							A music heritage trail for Northeast Tennessee. From the 1927 Bristol Sessions to the
							stages of today — the sound of the mountains is still being made.
						</p>
						<div className="flex gap-4">
							<a
								href="https://instagram.com/theholstonroad"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram"
								className="text-stone-400 hover:text-burgundy-700 transition"
							>
								<Instagram className="h-5 w-5" />
							</a>
							<a
								href="https://youtube.com/@theholstonroad"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="YouTube"
								className="text-stone-400 hover:text-burgundy-700 transition"
							>
								<Youtube className="h-5 w-5" />
							</a>
							<a
								href="https://facebook.com/theholstonroad"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Facebook"
								className="text-stone-400 hover:text-burgundy-700 transition"
							>
								<Facebook className="h-5 w-5" />
							</a>
						</div>
					</div>

					<div>
						<h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-600">
							Explore
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/guides"
									className="text-sm text-stone-600 hover:text-burgundy-700 transition"
								>
									Guides
								</Link>
							</li>
							<li>
								<Link
									to="/the-trail"
									className="text-sm text-stone-600 hover:text-burgundy-700 transition"
								>
									The Trail
								</Link>
							</li>
							<li>
								<Link
									to="/sites"
									className="text-sm text-stone-600 hover:text-burgundy-700 transition"
								>
									Venues
								</Link>
							</li>
							<li>
								<Link
									to="/events"
									className="text-sm text-stone-600 hover:text-burgundy-700 transition"
								>
									Events
								</Link>
							</li>
							<li>
								<Link
									to="/stories"
									className="text-sm text-stone-600 hover:text-burgundy-700 transition"
								>
									Stories
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-600">
							About
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/about"
									className="text-sm text-stone-600 hover:text-burgundy-700 transition"
								>
									Our Mission
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									hash="partners"
									className="text-sm text-stone-600 hover:text-burgundy-700 transition"
								>
									Partners
								</Link>
							</li>
							<li>
								<a
									href="mailto:hello@theholstonroad.org"
									className="text-sm text-stone-600 hover:text-burgundy-700 transition"
								>
									Contact
								</a>
							</li>
							<li>
								<Link
									to="/"
									hash="newsletter"
									className="text-sm text-stone-600 hover:text-burgundy-700 transition"
								>
									Newsletter
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-10 border-t border-stone-200 pt-6 text-center text-xs text-stone-600">
					&copy; {new Date().getFullYear()} The Holston Road. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
