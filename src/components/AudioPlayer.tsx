import { Clock, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
	title: string;
	duration: string;
	chapter: string;
	description: string;
	audioUrl?: string;
}

export default function AudioPlayer({
	title,
	duration,
	chapter,
	description,
	audioUrl,
}: AudioPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [currentTime, setCurrentTime] = useState("0:00");
	const audioRef = useRef<HTMLAudioElement>(null);
	const isComingSoon = !audioUrl;

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const updateProgress = () => {
			if (audio.duration) {
				setProgress((audio.currentTime / audio.duration) * 100);
				const mins = Math.floor(audio.currentTime / 60);
				const secs = Math.floor(audio.currentTime % 60);
				setCurrentTime(`${mins}:${secs.toString().padStart(2, "0")}`);
			}
		};

		const handleEnded = () => setIsPlaying(false);

		audio.addEventListener("timeupdate", updateProgress);
		audio.addEventListener("ended", handleEnded);
		return () => {
			audio.removeEventListener("timeupdate", updateProgress);
			audio.removeEventListener("ended", handleEnded);
		};
	}, []);

	const togglePlay = () => {
		if (isComingSoon) return;
		const audio = audioRef.current;
		if (!audio) return;

		if (isPlaying) {
			audio.pause();
			setIsPlaying(false);
		} else {
			audio.play().catch(() => setIsPlaying(false));
			setIsPlaying(true);
		}
	};

	return (
		<div className="group flex gap-4 rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md">
			{audioUrl && <audio ref={audioRef} src={audioUrl} preload="none" />}

			<button
				type="button"
				onClick={togglePlay}
				disabled={isComingSoon}
				className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition ${
					isComingSoon
						? "bg-stone-100 text-stone-300 cursor-not-allowed"
						: "bg-burgundy-100 text-burgundy-700 hover:bg-burgundy-200"
				}`}
			>
				{isComingSoon ? (
					<Clock className="h-5 w-5" />
				) : isPlaying ? (
					<Pause className="h-5 w-5" />
				) : (
					<Play className="h-5 w-5 ml-0.5" />
				)}
			</button>

			<div className="flex-1 min-w-0">
				<span className="text-xs font-medium uppercase tracking-wide text-amber-700">
					{chapter}
				</span>
				<h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-burgundy-700 transition truncate">
					{title}
				</h3>
				<p className="mt-1 text-sm text-stone-600 line-clamp-2">{description}</p>

				{!isComingSoon && (
					<div className="mt-2 flex items-center gap-3">
						<span className="text-xs text-stone-400 tabular-nums">{currentTime}</span>
						<div className="flex-1 h-1 rounded-full bg-stone-100 overflow-hidden">
							<div
								className="h-full rounded-full bg-burgundy-600 transition-all"
								style={{ width: `${progress}%` }}
							/>
						</div>
						<span className="text-xs text-stone-400 tabular-nums">{duration}</span>
					</div>
				)}

				{isComingSoon && (
					<div className="mt-2 flex items-center gap-2">
						<span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
							<Clock className="h-3 w-3" /> In production
						</span>
					</div>
				)}
			</div>
		</div>
	);
}
