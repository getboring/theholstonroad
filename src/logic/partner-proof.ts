import { getCanonicalUrl } from "../lib/seo";

type PartnerProofLink =
	| {
			kind: "internal";
			label: string;
			to: string;
	  }
	| {
			kind: "external";
			label: string;
			href: string;
	  };

export type PartnerProofSignal = {
	name: string;
	category: string;
	proof: string;
	description: string;
	link: PartnerProofLink;
};

export type CredibilityStat = {
	label: string;
	value: string;
	detail: string;
};

export type LaunchPillar = {
	title: string;
	description: string;
};

export type AudienceSurface = {
	audience: string;
	title: string;
	description: string;
	cta: PartnerProofLink;
};

export const partnerProofSignals: PartnerProofSignal[] = [
	{
		name: "Birthplace of Country Music Museum",
		category: "Anchor institution",
		proof:
			"Smithsonian-affiliated museum preserving the 1927 Bristol Sessions and operating Radio Bristol from State Street.",
		description:
			"The trail has a real institutional anchor in the district where the national origin story is told.",
		link: {
			kind: "internal",
			label: "View the museum stop",
			to: "/sites/birthplace-of-country-music-museum",
		},
	},
	{
		name: "Radio Bristol",
		category: "Broadcast platform",
		proof:
			"24/7 roots music station broadcasting from the museum, with live in-studio sessions and Farm and Fun Time.",
		description:
			"The music is not preserved as a static artifact. It is still being aired, hosted, and performed.",
		link: {
			kind: "internal",
			label: "See Radio Bristol on the trail",
			to: "/sites/radio-bristol",
		},
	},
	{
		name: "ETSU Bluegrass, Old Time and Country Music Program",
		category: "Education anchor",
		proof:
			"The world's only four-year, degree-granting program of its kind, based in Johnson City.",
		description:
			"The next generation of performers, teachers, and pickers is being trained inside the region, not imported into it.",
		link: {
			kind: "internal",
			label: "Explore the ETSU stop",
			to: "/sites/etsu-bluegrass",
		},
	},
	{
		name: "Bristol Rhythm & Roots Reunion",
		category: "Festival proof",
		proof:
			"A downtown festival that brings roughly 50,000 people, 120+ acts, and 20+ stages back to State Street.",
		description:
			"The launch story is backed by a large annual gathering that already proves national audience demand.",
		link: {
			kind: "internal",
			label: "Read the festival chapter",
			to: "/chapters/the-festival",
		},
	},
	{
		name: "Paramount Center for the Arts",
		category: "Historic venue",
		proof:
			"Restored Art Deco theater in downtown Bristol and an anchor venue for Rhythm & Roots weekend.",
		description:
			"The trail reads as a civic and cultural corridor because the major rooms are already part of the public story.",
		link: {
			kind: "internal",
			label: "See the Paramount stop",
			to: "/sites/paramount-bristol",
		},
	},
	{
		name: "The Down Home",
		category: "Living listening room",
		proof: "Johnson City's 150-seat listening room has hosted serious acoustic music since 1976.",
		description:
			"This is one of the clearest signals that the trail is about a living scene, not a closed chapter in history.",
		link: {
			kind: "internal",
			label: "Visit The Down Home page",
			to: "/sites/down-home",
		},
	},
	{
		name: "The Crooked Road",
		category: "Regional context",
		proof:
			"Virginia's established heritage music trail already intersects this story through annual Rhythm & Roots programming.",
		description:
			"The Holston Road fits into a wider Appalachian music corridor instead of feeling like an isolated campaign site.",
		link: {
			kind: "external",
			label: "Visit The Crooked Road",
			href: "https://thecrookedroadva.com",
		},
	},
];

export const credibilityStats: CredibilityStat[] = [
	{
		label: "Federal recognition",
		value: "1998",
		detail: "Congress officially designated Bristol the Birthplace of Country Music.",
	},
	{
		label: "Festival draw",
		value: "50K",
		detail: "Rhythm & Roots Reunion already brings a major audience back to State Street.",
	},
	{
		label: "Living tradition",
		value: "1976",
		detail: "The Down Home has kept a serious listening-room culture active for decades.",
	},
];

export const launchPillars: LaunchPillar[] = [
	{
		title: "A regional frame, not a single attraction",
		description:
			"The story moves from Bristol to Johnson City, with Kingsport and adjacent Virginia connections helping the trail read as a corridor instead of a point on a map.",
	},
	{
		title: "Built on institutions already doing the work",
		description:
			"Museums, radio, universities, festivals, and listening rooms already carry the credibility. The product's job is to connect them into one public route.",
	},
	{
		title: "Ready for partners, press, and 2026 launch storytelling",
		description:
			"The strongest narrative is not that something imaginary is arriving. It is that a real regional music ecosystem now has a clearer front door.",
	},
];

export const audienceSurfaces: AudienceSurface[] = [
	{
		audience: "Regional partners",
		title: "A shared public frame for venues, educators, and cultural anchors",
		description:
			"The trail gives institutions a common regional story they can point visitors toward without flattening their individual identities.",
		cta: {
			kind: "internal",
			label: "Browse anchor venues",
			to: "/sites",
		},
	},
	{
		audience: "Press and tourism teams",
		title: "A launch narrative with history, scale, and living proof",
		description:
			"The public story now has a museum anchor, a flagship festival, an education pipeline, and a route visitors can immediately understand.",
		cta: {
			kind: "internal",
			label: "Explore the trail route",
			to: "/the-trail",
		},
	},
	{
		audience: "Visitors",
		title: "Confidence that this is a real music region, not a themed list",
		description:
			"People can move from story to venue to event and feel the institutions behind the experience at every stop.",
		cta: {
			kind: "internal",
			label: "Read the story chapters",
			to: "/stories",
		},
	},
];

export function getAboutPageStructuredData() {
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "AboutPage",
				name: "About The Holston Road",
				description:
					"Regional proof and institutional context behind The Holston Road music heritage trail in Northeast Tennessee.",
				url: getCanonicalUrl("/about"),
				isPartOf: {
					"@type": "WebSite",
					name: "The Holston Road",
					url: getCanonicalUrl("/"),
				},
				about: {
					"@type": "Thing",
					name: "Regional music trail effort for Northeast Tennessee",
				},
			},
			{
				"@type": "ItemList",
				name: "Regional institutions shaping The Holston Road",
				itemListElement: partnerProofSignals.map((signal, index) => ({
					"@type": "ListItem",
					position: index + 1,
					name: signal.name,
					description: signal.proof,
					url: signal.link.kind === "internal" ? getCanonicalUrl(signal.link.to) : signal.link.href,
				})),
			},
		],
	};
}
