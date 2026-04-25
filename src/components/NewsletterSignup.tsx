import { zodResolver } from "@hookform/resolvers/zod";
import {
	ArrowRight,
	BookOpen,
	CalendarDays,
	CheckCircle2,
	Loader2,
	Mail,
	Route,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newsletterSchema = z.object({
	email: z.string().trim().email("Enter a valid email address."),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const newsletterHighlights = [
	{
		title: "Stories worth opening",
		description:
			"Fresh chapters, local context, and listening notes that make the trail mean more.",
		icon: BookOpen,
	},
	{
		title: "Live music picks",
		description:
			"Weekly shows, seasonal happenings, and the nights locals will actually talk about.",
		icon: CalendarDays,
	},
	{
		title: "Trail planning updates",
		description: "New stops, route updates, and launch news that help shape your next trip.",
		icon: Route,
	},
] as const;

type SubmissionState = "idle" | "subscribed" | "already";

export default function NewsletterSignup() {
	const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
	const [submitError, setSubmitError] = useState("");

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<NewsletterFormValues>({
		resolver: zodResolver(newsletterSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async ({ email }: NewsletterFormValues) => {
		setSubmitError("");

		try {
			const res = await fetch("/api/subscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			const data = (await res.json().catch(() => ({}))) as {
				alreadySubscribed?: boolean;
				error?: string;
			};

			if (!res.ok) {
				throw new Error(data.error || "Subscription failed");
			}

			setSubmissionState(data.alreadySubscribed ? "already" : "subscribed");
			reset();
		} catch {
			setSubmitError("We couldn't save your email just yet. Please try again.");
		}
	};

	const successCopy =
		submissionState === "already"
			? "You’re already getting the Tuesday dispatch with trail updates and music picks."
			: "You’re on the list. Watch for Tuesday notes with stories, live music, and seasonal planning ideas.";

	return (
		<section id="newsletter" className="bg-burgundy-900 py-16 text-white">
			<div className="mx-auto grid max-w-5xl gap-10 px-4 lg:grid-cols-[1.2fr_0.9fr] lg:items-center">
				<div>
					<div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
						<Mail className="h-4 w-4" />
						Regional newsletter
					</div>
					<h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
						Get the Back Porch Dispatch
					</h2>
					<p className="mt-4 max-w-2xl text-base leading-relaxed text-burgundy-100">
						One useful Tuesday email for people planning Northeast Tennessee around stories, live
						music, scenic weekends, and Holston Road trail updates.
					</p>
					<p className="mt-3 max-w-xl text-sm leading-relaxed text-burgundy-200">
						Built for curious travelers, locals, and weekend planners who want a credible regional
						guide, not a generic mailing list.
					</p>

					<div className="mt-8 grid gap-4 sm:grid-cols-3">
						{newsletterHighlights.map((highlight) => {
							const Icon = highlight.icon;

							return (
								<div
									key={highlight.title}
									className="rounded-2xl border border-white/10 bg-white/5 p-4"
								>
									<div className="flex items-center gap-3">
										<div className="rounded-full bg-white/10 p-2 text-amber-300">
											<Icon className="h-4 w-4" />
										</div>
										<h3 className="text-sm font-semibold text-white">{highlight.title}</h3>
									</div>
									<p className="mt-3 text-sm leading-relaxed text-burgundy-200">
										{highlight.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>

				<div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300">
						Every Tuesday
					</p>
					<h3 className="mt-3 text-2xl font-semibold text-white">
						Plan the next good stop before the weekend fills up.
					</h3>
					<p className="mt-3 text-sm leading-relaxed text-burgundy-100">
						Expect a tight mix of story links, live music picks, seasonal ideas, and trail notes. No
						clutter. Unsubscribe anytime.
					</p>

					{submissionState === "idle" ? (
						<form
							className="mt-6 flex flex-col gap-4"
							noValidate
							onSubmit={(event) => {
								event.preventDefault();
								event.stopPropagation();
								void handleSubmit(onSubmit)(event);
							}}
						>
							<div>
								<label
									className="mb-2 block text-sm font-medium text-white"
									htmlFor="newsletter-email"
								>
									Email address
								</label>
								<input
									id="newsletter-email"
									type="email"
									required
									autoComplete="email"
									placeholder="you@example.com"
									aria-describedby={
										errors.email
											? "newsletter-email-help newsletter-email-error"
											: "newsletter-email-help"
									}
									aria-invalid={errors.email ? "true" : "false"}
									className="w-full rounded-2xl border border-white/10 bg-burgundy-950/70 px-4 py-3 text-white placeholder:text-burgundy-300 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40"
									{...register("email")}
								/>
								<p id="newsletter-email-help" className="mt-2 text-sm text-burgundy-200">
									Stories, live music, seasonal planning notes, and trail updates for the region.
								</p>
								{errors.email ? (
									<p id="newsletter-email-error" className="mt-2 text-sm text-red-200">
										{errors.email.message}
									</p>
								) : null}
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-medium text-amber-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
							>
								{isSubmitting ? (
									<>
										<Loader2 className="h-4 w-4 animate-spin" />
										Joining the dispatch...
									</>
								) : (
									<>
										Get the Tuesday dispatch
										<ArrowRight className="h-4 w-4" />
									</>
								)}
							</button>
						</form>
					) : (
						<div className="mt-6 rounded-2xl border border-emerald-300/25 bg-emerald-400/10 p-4 text-sm text-emerald-50">
							<div className="flex items-start gap-3">
								<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
								<p>{successCopy}</p>
							</div>
						</div>
					)}

					{submitError ? <p className="mt-4 text-sm text-red-200">{submitError}</p> : null}
				</div>
			</div>
		</section>
	);
}
