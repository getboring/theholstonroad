export default function LoadingSpinner() {
	return (
		<div className="flex min-h-[40vh] items-center justify-center" role="status" aria-live="polite">
			<div className="flex flex-col items-center gap-3">
				<div
					className="h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-burgundy-700"
					aria-hidden="true"
				/>
				<p className="text-sm text-stone-500">Loading...</p>
				<span className="sr-only">Loading content, please wait.</span>
			</div>
		</div>
	);
}
