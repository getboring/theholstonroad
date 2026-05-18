import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function ErrorPage({ error }: { error?: Error }) {
	return (
		<main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
			<AlertTriangle className="mb-4 h-12 w-12 text-amber-500" />
			<h1 className="mb-2 font-display text-4xl font-bold text-stone-900">Something went wrong</h1>
			<p className="mb-8 max-w-md text-stone-600">
				{error?.message || "We hit a snag on the trail. Try refreshing the page or head back home."}
			</p>
			<div className="flex flex-wrap items-center justify-center gap-3">
				<Link
					to="/"
					className="inline-flex items-center gap-2 rounded-full bg-burgundy-700 px-6 py-3 font-medium text-white transition hover:bg-burgundy-800"
				>
					<ArrowLeft className="h-4 w-4" /> Back to the trail
				</Link>
			</div>
		</main>
	);
}
