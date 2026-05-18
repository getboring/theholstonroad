interface VenuePlaceholderProps {
	name: string;
	type?: string;
	className?: string;
}

const typeColors: Record<string, { bg: string; accent: string }> = {
	major: { bg: "#7c2d12", accent: "#f59e0b" },
	affiliated: { bg: "#451a03", accent: "#d97706" },
	festival: { bg: "#581c87", accent: "#c084fc" },
	wayside: { bg: "#1e3a5f", accent: "#60a5fa" },
	virtual: { bg: "#3f3f46", accent: "#a1a1aa" },
};

function getInitials(name: string): string {
	return name
		.split(" ")
		.map((w) => w[0])
		.slice(0, 3)
		.join("")
		.toUpperCase();
}

export default function VenuePlaceholder({
	name,
	type = "major",
	className = "",
}: VenuePlaceholderProps) {
	const colors = typeColors[type] || typeColors.major;
	const initials = getInitials(name);
	const seed = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
	const pattern = seed % 4;

	// Generate a simple geometric pattern based on the seed
	const shapes = [];
	for (let i = 0; i < 6; i++) {
		const x = 20 + ((seed + i * 37) % 60);
		const y = 20 + ((seed + i * 53) % 60);
		const r = 5 + ((seed + i * 19) % 15);
		const opacity = 0.1 + ((seed + i * 11) % 10) / 30;
		shapes.push(<circle key={i} cx={x} cy={y} r={r} fill={colors.accent} opacity={opacity} />);
	}

	return (
		<div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: colors.bg }}>
			<svg
				className="absolute inset-0 h-full w-full"
				viewBox="0 0 100 100"
				preserveAspectRatio="xMidYMid slice"
			>
				{pattern === 0 && (
					<>
						<circle cx="30" cy="30" r="40" fill={colors.accent} opacity="0.08" />
						<circle cx="70" cy="70" r="50" fill={colors.accent} opacity="0.05" />
					</>
				)}
				{pattern === 1 && (
					<>
						<rect x="0" y="0" width="100" height="100" fill="url(#grid)" opacity="0.1" />
						<defs>
							<pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
								<path d="M 20 0 L 0 0 0 20" fill="none" stroke={colors.accent} strokeWidth="0.5" />
							</pattern>
						</defs>
					</>
				)}
				{pattern === 2 && (
					<>
						<polygon points="0,100 50,0 100,100" fill={colors.accent} opacity="0.06" />
						<polygon points="0,0 50,100 100,0" fill={colors.accent} opacity="0.04" />
					</>
				)}
				{pattern === 3 && (
					<>
						<circle
							cx="50"
							cy="50"
							r="35"
							fill="none"
							stroke={colors.accent}
							strokeWidth="0.5"
							opacity="0.15"
						/>
						<circle
							cx="50"
							cy="50"
							r="25"
							fill="none"
							stroke={colors.accent}
							strokeWidth="0.5"
							opacity="0.1"
						/>
						<circle
							cx="50"
							cy="50"
							r="15"
							fill="none"
							stroke={colors.accent}
							strokeWidth="0.5"
							opacity="0.08"
						/>
					</>
				)}
				{shapes}
			</svg>
			<div className="absolute inset-0 flex items-center justify-center">
				<span className="font-display text-3xl font-bold text-white/30 tracking-wider">
					{initials}
				</span>
			</div>
		</div>
	);
}
