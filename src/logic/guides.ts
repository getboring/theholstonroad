import type { Event, Venue, Wayside } from "../db/schema";

export const GUIDES_HUB_PATH = "/guides";

type GuideLink = {
	label: string;
	href: string;
	description?: string;
};

type GuideStop = {
	eyebrow: string;
	title: string;
	description: string;
	href?: string;
};

type GuideCallout = {
	title: string;
	body: string;
};

type GuideSection = {
	id: string;
	title: string;
	paragraphs: string[];
	bullets?: string[];
	callout?: GuideCallout;
	links?: GuideLink[];
	stops?: GuideStop[];
};

export type Guide = {
	slug: string;
	category: "Weekend itinerary" | "History guide" | "Live music guide";
	schemaType: "Article" | "TouristTrip";
	title: string;
	description: string;
	eyebrow: string;
	readTime: string;
	intro: string;
	highlights: string[];
	snapshot: Array<{
		label: string;
		value: string;
	}>;
	primaryLinks: GuideLink[];
	sections: GuideSection[];
	relatedVenueSlugs: string[];
	relatedEventSlugs: string[];
	relatedWaysideSlugs: string[];
	relatedGuideSlugs: string[];
	cta: {
		title: string;
		description: string;
		links: GuideLink[];
	};
};

const chapterPathBySlug: Record<string, string> = {
	"the-sound": "/chapters/the-sound",
	"the-railroad": "/chapters/the-railroad",
	"the-sessions": "/chapters/the-sessions",
	"the-festival": "/chapters/the-festival",
	"the-next-generation": "/chapters/the-next-generation",
};

export const guides: Guide[] = [
	{
		slug: "weekend-country-music-itinerary",
		category: "Weekend itinerary",
		schemaType: "TouristTrip",
		title: "A weekend country music itinerary for Bristol and Johnson City",
		description:
			"Plan a music-focused weekend across Bristol and Johnson City with museum stops, listening rooms, and live roots music built from The Holston Road.",
		eyebrow: "First-time trip planning",
		readTime: "8 min read",
		intro:
			"This is the easiest two-day way into The Holston Road: start where the Bristol Sessions made the region famous, then follow the trail to the college-town venues and programs proving the sound is still alive.",
		highlights: [
			"Begin with the Birthplace of Country Music Museum and State Street.",
			"Use Johnson City for the strongest mix of teaching, jamming, and intimate rooms.",
			"Check the events page before you go so the itinerary can bend around live music.",
		],
		snapshot: [
			{ label: "Best for", value: "First-time visitors" },
			{ label: "Trip length", value: "2 days / 1 overnight" },
			{ label: "Core cities", value: "Bristol + Johnson City" },
			{ label: "Best companion", value: "Events + venue pages" },
		],
		primaryLinks: [
			{
				label: "Browse all venues",
				href: "/sites",
				description: "Use the venue directory if you want more stop options.",
			},
			{
				label: "See live music timing",
				href: "/events",
				description: "Cross-check recurring jams, shows, and seasonal events.",
			},
			{
				label: "Read the Bristol Sessions chapter",
				href: "/chapters/the-sessions",
				description: "Best pre-read before you spend time on State Street.",
			},
		],
		sections: [
			{
				id: "why-this-route-works",
				title: "Why this route works for a first weekend",
				paragraphs: [
					"The Holston Road is only about 65 miles end to end, so you do not need to choose between heritage context and a live-night plan. Bristol gives you the origin story. Johnson City gives you the strongest concentration of present-day listening rooms, education programs, and informal music culture.",
					"That combination matters because the trail is not only about what happened in 1927. It is also about what still happens now in museums, on radio, in classrooms, and in the rooms where people gather to play.",
				],
				callout: {
					title: "The shortest summary",
					body: "Day one is for the birthplace story. Day two is for the living scene.",
				},
				links: [
					{
						label: "Start with the full trail overview",
						href: "/the-trail",
						description: "Use the route page if you want the bigger regional frame first.",
					},
				],
			},
			{
				id: "day-one-bristol",
				title: "Day one: build the Bristol part around the Sessions story",
				paragraphs: [
					"Begin on State Street with the Birthplace of Country Music Museum. It is the clearest starting point for understanding what Ralph Peer recorded in 1927, why the Carter Family and Jimmie Rodgers mattered, and how Bristol earned the federal designation as the Birthplace of Country Music.",
					"From there, keep the walkable core tight. Radio Bristol extends the story into the present, and the Paramount gives you a strong sense of Bristol as a working performance town rather than a static heritage stop.",
				],
				stops: [
					{
						eyebrow: "Morning anchor",
						title: "Birthplace of Country Music Museum",
						description:
							"Start with the museum before anything else. It is the fastest way to get the full 1927 narrative in one place.",
						href: "/sites/birthplace-of-country-music-museum",
					},
					{
						eyebrow: "Midday add-on",
						title: "Radio Bristol",
						description:
							"Layer in the live broadcast angle and the present-day programming that keeps the roots story active.",
						href: "/sites/radio-bristol",
					},
					{
						eyebrow: "Downtown room",
						title: "Paramount Center for the Arts",
						description:
							"Use the Paramount as the evening anchor when a concert, screening, or festival set is on the calendar.",
						href: "/sites/paramount-bristol",
					},
					{
						eyebrow: "Optional late stop",
						title: "The Mahogany Session",
						description:
							"If you want a smaller singer-songwriter feel, this is the most direct Bristol counterpoint to the larger museum-and-theater stops.",
						href: "/sites/the-mahogany-session",
					},
				],
				links: [
					{
						label: "Read the full Bristol Sessions chapter",
						href: "/chapters/the-sessions",
						description: "Best for the deeper historic framing before your Bristol day.",
					},
					{
						label: "Track Bristol events",
						href: "/events",
						description:
							"Use filters and timing cues to see what is actually happening when you visit.",
					},
				],
			},
			{
				id: "day-two-johnson-city",
				title: "Day two: use Johnson City for the living music scene",
				paragraphs: [
					"Johnson City is where the trail opens into education, casual music culture, and intimate night rooms. The ETSU Bluegrass, Old Time and Country Music Program shows how the tradition is being taught. The Down Home and Blackbird Ale House show how it is being heard.",
					"This is also the best part of the route for travelers who want a looser evening. You can structure the day around a campus stop, then finish with a listening room, open mic, or jam depending on timing.",
				],
				stops: [
					{
						eyebrow: "Daytime stop",
						title: "ETSU Bluegrass, Old Time and Country Music Program",
						description:
							"Use ETSU for the next-generation piece of the story and to understand why Johnson City belongs in the same music conversation as Bristol.",
						href: "/sites/etsu-bluegrass",
					},
					{
						eyebrow: "Evening anchor",
						title: "The Down Home",
						description:
							"This is the strongest pure listening-room stop on the route and the place to watch the room itself shape the experience.",
						href: "/sites/down-home",
					},
					{
						eyebrow: "Flexible add-on",
						title: "Blackbird Ale House",
						description:
							"Use Blackbird when you want a more casual downtown Johnson City option that still sits inside the roots-music lane.",
						href: "/sites/blackbird-ale-house",
					},
				],
				links: [
					{
						label: "Read the next-generation chapter",
						href: "/chapters/the-next-generation",
						description: "Context for why ETSU and JAM matter to the trail.",
					},
				],
			},
			{
				id: "time-your-trip",
				title: "If the calendar lines up, let the event schedule choose the weekend",
				paragraphs: [
					"The itinerary gets stronger when a live date gives it shape. A Farm and Fun Time taping, an ETSU concert date, the Bristol Sessions anniversary programming, or Bristol Rhythm & Roots Reunion all create a natural spine for the trip.",
					"If nothing major lands on your exact dates, the recurring Johnson City jam and open mic options still give you a credible live-music finish.",
				],
				bullets: [
					"Farm and Fun Time adds a Radio Bristol layer to a Bristol-focused day.",
					"ETSU Bluegrass Day is the cleanest one-day reason to center Johnson City.",
					"Bristol Sessions Anniversary programming is the most direct heritage-weekend fit.",
					"Bristol Rhythm & Roots Reunion turns the downtown Bristol part of this itinerary into a full festival trip.",
				],
				links: [
					{
						label: "See the event page",
						href: "/events",
						description: "Use the calendar as your final planning pass.",
					},
				],
			},
			{
				id: "before-you-go",
				title: "Before you go",
				paragraphs: [
					"Keep expectations anchored to the public guide. The Holston Road is strongest when you use it as a planning surface: read a chapter, open the venue pages, then confirm live timing on the events page before locking the schedule.",
				],
				bullets: [
					"Open venue pages for address, website, and planning cues.",
					"Check the events page before travel for current timing.",
					"Pair Bristol with Johnson City for the best heritage-plus-live balance.",
					"Use the trail page if you want to widen the route beyond these two cities.",
				],
			},
		],
		relatedVenueSlugs: [
			"birthplace-of-country-music-museum",
			"radio-bristol",
			"paramount-bristol",
			"the-mahogany-session",
			"etsu-bluegrass",
			"down-home",
			"blackbird-ale-house",
		],
		relatedEventSlugs: [
			"radio-bristol-farm-fun-time",
			"open-mic-down-home",
			"etsu-bluegrass-concert-series",
			"bristol-sessions-anniversary",
			"bristol-rhythm-roots-2026",
		],
		relatedWaysideSlugs: ["the-sessions", "the-festival", "the-next-generation"],
		relatedGuideSlugs: ["bristol-sessions-guide", "live-roots-music-johnson-city"],
		cta: {
			title: "Ready to turn the outline into a real weekend?",
			description:
				"Use the venue pages for addresses and stop details, then use the events page for the live piece that makes the trip feel current.",
			links: [
				{ label: "Open the venue guide", href: "/sites" },
				{ label: "Check live music timing", href: "/events" },
			],
		},
	},
	{
		slug: "bristol-sessions-guide",
		category: "History guide",
		schemaType: "Article",
		title: "The Bristol Sessions guide: what happened in 1927 and where to start today",
		description:
			"Understand the 1927 Bristol Sessions, why Bristol matters in country music history, and where to experience that legacy today on The Holston Road.",
		eyebrow: "Heritage primer",
		readTime: "7 min read",
		intro:
			"If you only know one phrase about the region, it is probably “Birthplace of Country Music.” This guide explains what actually happened in Bristol in 1927, why the Sessions mattered, and which present-day stops give the clearest way into the story.",
		highlights: [
			"The Sessions were a short recording run with enormous long-term impact.",
			"Bristol mattered because the city sat at a musical crossroads before the recordings began.",
			"The museum, State Street, Radio Bristol, and nearby Carter legacy stops turn the story into a visit.",
		],
		snapshot: [
			{ label: "Historic moment", value: "12 recording days in 1927" },
			{ label: "Best starting point", value: "BCM Museum on State Street" },
			{ label: "Best for", value: "Heritage travelers + first-time readers" },
			{ label: "Pair with", value: "Chapter 3 + Bristol venue pages" },
		],
		primaryLinks: [
			{
				label: "Read the full chapter",
				href: "/chapters/the-sessions",
				description: "The trail chapter is the longer narrative version of this guide.",
			},
			{
				label: "Open the BCM Museum page",
				href: "/sites/birthplace-of-country-music-museum",
				description: "Use the museum page for visit details and next steps.",
			},
			{
				label: "See Bristol-area planning cues",
				href: "/events",
				description: "Helpful for anniversary trips or a State Street weekend.",
			},
		],
		sections: [
			{
				id: "what-happened",
				title: "What happened in Bristol in 1927",
				paragraphs: [
					"In the summer of 1927, Ralph Peer set up a temporary recording studio in a converted hat warehouse on State Street. Over a short run of recording days, he captured artists whose records would help define the commercial shape of country music.",
					"The Carter Family and Jimmie Rodgers became the biggest names associated with the Sessions, but the larger point is that Bristol became the recording site where multiple strands of regional music were documented and released to a national audience.",
				],
				callout: {
					title: "Why the phrase keeps sticking",
					body: "The Bristol Sessions matter because they compressed a regional sound into a documented moment the wider music industry could hear, market, and remember.",
				},
			},
			{
				id: "why-bristol",
				title: "Why Bristol was the place",
				paragraphs: [
					"The Sessions did not emerge from nowhere. Bristol sat at the intersection of Appalachian ballad traditions, church music, blues influence, and the movement of musicians through the railroad corridor. The city was already a meeting ground before it became a recording site.",
					"That is why the Bristol story on The Holston Road never stands alone. The railroad chapter and the broader “sound” chapter explain the conditions that made the Sessions possible in the first place.",
				],
				links: [
					{
						label: "Read the railroad chapter",
						href: "/chapters/the-railroad",
						description: "Context for how people, songs, and styles moved into the city.",
					},
					{
						label: "Read the sound chapter",
						href: "/chapters/the-sound",
						description: "Context for the musical mix that fed the recordings.",
					},
				],
			},
			{
				id: "who-to-know",
				title: "The names to know first",
				paragraphs: [
					"Ralph Peer is the industry figure at the center of the Sessions story. The Carter Family and Jimmie Rodgers are the artistic names most visitors encounter first because they became foundational to the genre’s national memory.",
					"Other artists recorded in Bristol too, and that broader cast matters. The Sessions were not one act or one style. They were a concentrated recording event that exposed how much music was already moving through this region.",
				],
				bullets: [
					"Ralph Peer: the talent scout and recording organizer.",
					"The Carter Family: central to the mountain-song and family-harmony legacy.",
					"Jimmie Rodgers: the genre-shaping star figure to emerge from the Sessions era.",
					"Blind Alfred Reed and other recorded acts: part of the wider story beyond the biggest names.",
				],
			},
			{
				id: "where-to-go-now",
				title: "Where to experience the story today",
				paragraphs: [
					"The best present-day route is still compact. Use the Birthplace of Country Music Museum as the anchor, then layer in Radio Bristol, State Street, and the Paramount for context and atmosphere.",
					"If you want to widen the heritage radius, Carter Family Fold is the strongest next move because it carries the Carter legacy forward through regular old-time and bluegrass programming.",
				],
				stops: [
					{
						eyebrow: "Anchor stop",
						title: "Birthplace of Country Music Museum",
						description:
							"The best one-stop introduction to the Sessions story and its long afterlife.",
						href: "/sites/birthplace-of-country-music-museum",
					},
					{
						eyebrow: "Live extension",
						title: "Radio Bristol",
						description:
							"Useful for understanding how the region keeps translating heritage into current programming.",
						href: "/sites/radio-bristol",
					},
					{
						eyebrow: "Downtown context",
						title: "Paramount Center for the Arts",
						description:
							"A working performance room that helps Bristol feel like a music town, not just a museum stop.",
						href: "/sites/paramount-bristol",
					},
					{
						eyebrow: "Legacy side trip",
						title: "Carter Family Fold",
						description:
							"The strongest add-on if you want the Carter story to move from history into a living Saturday-night tradition.",
						href: "/sites/carter-family-fold",
					},
				],
			},
			{
				id: "plan-a-visit",
				title: "How to build a current-day visit around the Sessions legacy",
				paragraphs: [
					"For a straightforward heritage-focused visit, read the chapter first, spend your morning at the museum, walk State Street, and use the events page to see whether a Radio Bristol program, anniversary weekend, or downtown performance gives the trip a live finish.",
					"If you want a bigger public moment, the Bristol Sessions anniversary programming and Bristol Rhythm & Roots Reunion are the clearest calendar hooks tied to the same origin story.",
				],
				links: [
					{
						label: "Open the weekend itinerary",
						href: "/guides/weekend-country-music-itinerary",
						description: "Use this if you want to pair Bristol with Johnson City.",
					},
					{
						label: "See all events",
						href: "/events",
						description: "Best for anniversary timing and current live options.",
					},
				],
			},
		],
		relatedVenueSlugs: [
			"birthplace-of-country-music-museum",
			"radio-bristol",
			"paramount-bristol",
			"carter-family-fold",
		],
		relatedEventSlugs: [
			"radio-bristol-farm-fun-time",
			"bristol-sessions-anniversary",
			"bristol-rhythm-roots-2026",
		],
		relatedWaysideSlugs: ["the-sound", "the-railroad", "the-sessions"],
		relatedGuideSlugs: ["weekend-country-music-itinerary", "live-roots-music-johnson-city"],
		cta: {
			title: "Want the history and the actual trip plan?",
			description:
				"Pair this Sessions primer with the weekend itinerary, then use the venue and events pages to turn the history into a route.",
			links: [
				{ label: "Open the weekend itinerary", href: "/guides/weekend-country-music-itinerary" },
				{ label: "Browse Bristol-area venues", href: "/sites" },
			],
		},
	},
	{
		slug: "live-roots-music-johnson-city",
		category: "Live music guide",
		schemaType: "Article",
		title: "Where to hear live roots music in Johnson City",
		description:
			"Use this Johnson City live music guide to find the venues, recurring jams, and ETSU-connected stops that make the city a key part of The Holston Road.",
		eyebrow: "Live-night planning",
		readTime: "6 min read",
		intro:
			"Johnson City is the strongest answer for travelers who want The Holston Road to feel active, not only historical. It is where education, jams, listening-room culture, and casual downtown live music stack up most naturally.",
		highlights: [
			"The Down Home is the clearest listening-room anchor on the trail.",
			"ETSU gives the city real music-education gravity, not just nightlife.",
			"Recurring jam and open mic cues make Johnson City the easiest “what should we do tonight?” stop.",
		],
		snapshot: [
			{ label: "Best for", value: "Tonight or this weekend" },
			{ label: "Core zone", value: "Downtown Johnson City" },
			{ label: "Music lane", value: "Bluegrass, old-time, Americana, acoustic" },
			{ label: "Best companion", value: "Events page + next-generation chapter" },
		],
		primaryLinks: [
			{
				label: "See Johnson City-ready events",
				href: "/events",
				description: "Best for recurring jam and open mic timing.",
			},
			{
				label: "Open the Down Home page",
				href: "/sites/down-home",
				description: "Start here if you want a single strongest room.",
			},
			{
				label: "Read the next-generation chapter",
				href: "/chapters/the-next-generation",
				description: "Context for why ETSU belongs in the live-music picture.",
			},
		],
		sections: [
			{
				id: "why-johnson-city",
				title: "Why Johnson City matters on a music trip",
				paragraphs: [
					"Bristol carries the most famous origin story, but Johnson City carries a large share of the working, present-day music energy on the route. That makes it the best city for travelers who want to hear something live after they have read the history.",
					"The mix is the advantage: ETSU for structured tradition, The Down Home for focused listening, Blackbird for a more casual room, and recurring public jam or open mic cues that make the city feel musically inhabited rather than staged for tourists.",
				],
			},
			{
				id: "core-rooms",
				title: "Start with the core Johnson City rooms and institutions",
				paragraphs: [
					"If you only have one evening, choose The Down Home first. It is the strongest place on the route for a listening-room experience built around acoustic music and close attention.",
					"If you have more time, layer in ETSU for the academic side of the tradition and Blackbird Ale House for a looser downtown room that still fits the roots-music lane.",
				],
				stops: [
					{
						eyebrow: "Listening room",
						title: "The Down Home",
						description: "Best choice when the room itself is part of what you came for.",
						href: "/sites/down-home",
					},
					{
						eyebrow: "Education anchor",
						title: "ETSU Bluegrass, Old Time and Country Music Program",
						description:
							"Important because it explains why so much serious roots talent keeps flowing through Johnson City.",
						href: "/sites/etsu-bluegrass",
					},
					{
						eyebrow: "Casual downtown stop",
						title: "Blackbird Ale House",
						description: "A practical add-on when you want live music in a less formal setting.",
						href: "/sites/blackbird-ale-house",
					},
				],
			},
			{
				id: "weekly-rhythm",
				title: "Use the recurring schedule to make the city easy",
				paragraphs: [
					"The biggest planning win in Johnson City is that you do not always need a major festival or headline concert to have a credible music night. The recurring bluegrass jam, the Down Home open mic, and the ETSU concert series all create dependable reasons to spend time here.",
					"Because public schedules can shift, treat the events page as the final source before you drive in. The guide gives you the shape of the night. The events page gives you the current timing.",
				],
				bullets: [
					"Weekly Bluegrass Jam for a community-led listening or playing experience.",
					"Open Mic at The Down Home for singer-songwriters and acoustic sets.",
					"ETSU concert series for student, faculty, and guest-artist programming.",
				],
				links: [
					{
						label: "Open the events page",
						href: "/events",
						description: "Use this for final timing and broader regional options.",
					},
				],
			},
			{
				id: "build-an-evening",
				title: "How to turn it into a full evening or overnight",
				paragraphs: [
					"For the cleanest Johnson City plan, use ETSU or the chapter content during the day, then keep the evening centered on one room instead of trying to bounce too much. A focused night at The Down Home usually lands better than trying to force a bar-crawl pattern onto a roots-music trip.",
					"If you are staying overnight, Johnson City also works as the second day of a Bristol-first weekend. That pairing gives you the strongest heritage-plus-live combination on the route.",
				],
				links: [
					{
						label: "Open the weekend itinerary",
						href: "/guides/weekend-country-music-itinerary",
						description: "Best if you want to combine Bristol and Johnson City.",
					},
				],
			},
			{
				id: "expand-the-radius",
				title: "If you want to widen the radius after Johnson City",
				paragraphs: [
					"The easiest expansion is back toward Bristol for the museum and State Street story, or outward to Carter Family Fold for a legacy-heavy Saturday-night stop. Johnson City works best as the city where the present tense becomes easy, then the broader trail can branch out from there.",
				],
				links: [
					{
						label: "Browse the full trail",
						href: "/the-trail",
						description: "Helpful if you want to branch out beyond downtown Johnson City.",
					},
					{
						label: "Browse all venue pages",
						href: "/sites",
						description: "Good for finding nearby add-on stops.",
					},
				],
			},
		],
		relatedVenueSlugs: ["down-home", "etsu-bluegrass", "blackbird-ale-house"],
		relatedEventSlugs: [
			"bluegrass-jam-johnson-city",
			"open-mic-down-home",
			"etsu-bluegrass-concert-series",
			"bluegrass-day-etsu-2026",
		],
		relatedWaysideSlugs: ["the-sound", "the-next-generation"],
		relatedGuideSlugs: ["weekend-country-music-itinerary", "bristol-sessions-guide"],
		cta: {
			title: "Need a stronger live-music plan than “see what happens”?",
			description:
				"Use this guide for the Johnson City shape, then let the events page tell you which specific night to pick.",
			links: [
				{ label: "Check the events page", href: "/events" },
				{ label: "Browse Johnson City venues", href: "/sites" },
			],
		},
	},
];

const guideMap = new Map(guides.map((guide) => [guide.slug, guide]));

export function getGuideBySlug(slug: string): Guide | undefined {
	return guideMap.get(slug);
}

export function getGuideHref(slug: string): string {
	return `${GUIDES_HUB_PATH}/${slug}`;
}

export function getChapterHref(slug: string): string {
	return chapterPathBySlug[slug] ?? "/stories";
}

export function getRelatedGuides(guide: Guide): Guide[] {
	return guide.relatedGuideSlugs
		.map((slug) => getGuideBySlug(slug))
		.filter((relatedGuide): relatedGuide is Guide => Boolean(relatedGuide));
}

export function getGuideVenues(guide: Guide, venues: Venue[]): Venue[] {
	const venueMap = new Map(venues.map((venue) => [venue.slug, venue]));
	return guide.relatedVenueSlugs
		.map((slug) => venueMap.get(slug))
		.filter((venue): venue is Venue => Boolean(venue));
}

export function getGuideEvents(guide: Guide, events: Event[]): Event[] {
	const eventMap = new Map(events.map((event) => [event.slug, event]));
	return guide.relatedEventSlugs
		.map((slug) => eventMap.get(slug))
		.filter((event): event is Event => Boolean(event));
}

export function getGuideWaysides(guide: Guide, waysides: Wayside[]): Wayside[] {
	const waysideMap = new Map(waysides.map((wayside) => [wayside.slug, wayside]));
	return guide.relatedWaysideSlugs
		.map((slug) => waysideMap.get(slug))
		.filter((wayside): wayside is Wayside => Boolean(wayside));
}
