/**
 * Seed data for The Holston Road — Music Heritage Trail of Northeast Tennessee
 * Tenant #2 for the Trailhead platform. Independent from The Crooked Road.
 */

import { ulid } from "ulidx";

// =============================================================================
// TRAIL
// =============================================================================

export const trail = {
	id: ulid(),
	slug: "holston-road",
	name: "The Holston Road",
	tagline: "The sound of the mountains.",
	description:
		"A music heritage trail through Northeast Tennessee — from the 1927 Bristol Sessions to the stages of today. Discover the venues, festivals, and stories that made this region the birthplace of country music.",
	location: "Northeast Tennessee — Bristol, Kingsport, Johnson City",
	website: "https://theholstonroad.org",
	primaryColor: "#7c1d1d",
	secondaryColor: "#d97706",
	metadata: {
		routeLength: 65,
		counties: ["Sullivan", "Washington", "Carter"],
		founded: 2026,
		economicImpact: "Music tourism and cultural heritage development",
		mission:
			"To connect travelers with the living musical heritage of Northeast Tennessee — where Appalachian tradition meets the next generation of sound.",
	},
};

const trailId = trail.id;

// =============================================================================
// MAJOR VENUES — Music Heritage
// =============================================================================

export const majorVenues = [
	{
		id: ulid(),
		trailId,
		slug: "birthplace-of-country-music-museum",
		name: "Birthplace of Country Music Museum",
		type: "major" as const,
		description:
			"A Smithsonian-affiliated museum on State Street in Historic Downtown Bristol, TN/VA, telling the story of the 1927 Bristol Sessions — the 'big bang of country music' that introduced the Carter Family and Jimmie Rodgers to the world. Features immersive exhibits, a recording studio, and the Radio Bristol station broadcasting live from the museum.",
		shortDescription: "Smithsonian affiliate celebrating the 1927 Bristol Sessions",
		city: "Bristol",
		state: "TN",
		address: "101 Country Music Way, Bristol, VA/TN 24201",
		phone: "423-573-1927",
		website: "https://birthplaceofcountrymusic.org",
		features: [
			"Museum",
			"Recording Studio",
			"Radio Bristol",
			"Live Performances",
			"Smithsonian Affiliate",
		],
		metadata: {
			history:
				"The 1927 Bristol Sessions recorded Jimmie Rodgers and the Carter Family. Congress designated Bristol the 'Birthplace of Country Music' in 1998.",
			capacity: 200,
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "etsu-bluegrass",
		name: "ETSU Bluegrass, Old Time and Country Music Program",
		type: "major" as const,
		description:
			"The only four-year, degree-granting program of its kind in the world. ETSU's program preserves and advances the musical traditions of Appalachia through academic study and performance. Students learn from master musicians on authentic instruments in the heart of bluegrass country.",
		shortDescription: "The world's only four-year degree in bluegrass and old-time music",
		city: "Johnson City",
		state: "TN",
		address: "ETSU Center for Appalachian Studies and Services, Johnson City, TN 37614",
		phone: "423-439-6075",
		website: "https://www.etsu.edu/cas/music",
		features: [
			"Degree Program",
			"Live Performances",
			"Master Classes",
			"Appalachian Studies",
			"Recording Facilities",
		],
		metadata: {
			history:
				"Founded to preserve Appalachian musical heritage through higher education. The only program of its kind worldwide.",
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "radio-bristol",
		name: "Radio Bristol",
		type: "major" as const,
		description:
			"A multi-platform radio station broadcasting from the Birthplace of Country Music Museum. Features Americana, bluegrass, classic country, and old-time music 24/7, plus live in-studio performances and the nationally syndicated 'Farm and Fun Time' variety show.",
		shortDescription: "24/7 roots music radio broadcasting from the BCM Museum",
		city: "Bristol",
		state: "TN",
		address: "101 Country Music Way, Bristol, VA/TN 24201",
		phone: "423-573-1927",
		website: "https://birthplaceofcountrymusic.org/radio-bristol",
		features: [
			"Radio Station",
			"Live Broadcasts",
			"Farm and Fun Time",
			"Online Streaming",
			"In-Studio Performances",
		],
		metadata: {
			history:
				"Launched by the Birthplace of Country Music Museum to celebrate and preserve the region's musical heritage through broadcasting.",
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "down-home",
		name: "The Down Home",
		type: "major" as const,
		description:
			"A legendary listening room in Johnson City that has hosted intimate acoustic performances since 1976. Known for its no-talking-during-performances policy and incredible acoustics, The Down Home has hosted everyone from emerging singer-songwriters to Grammy-winning artists in a 150-seat venue that feels like a living room.",
		shortDescription: "Legendary 150-seat listening room hosting acoustic music since 1976",
		city: "Johnson City",
		state: "TN",
		address: "300 W Main St, Johnson City, TN 37604",
		phone: "423-929-9821",
		website: "https://thedownhome.com",
		features: [
			"Listening Room",
			"Intimate Venue",
			"Acoustic Music",
			"Local Artists",
			"National Acts",
		],
		metadata: {
			history:
				"Opened in 1976. Known for incredible acoustics and a strict no-talking policy during performances.",
			capacity: 150,
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "paramount-bristol",
		name: "Paramount Center for the Arts",
		type: "major" as const,
		description:
			"A beautifully restored 1930s Art Deco theater in the heart of downtown Bristol. The Paramount hosts concerts, film screenings, and performing arts events in a stunning historic setting with state-of-the-art sound and lighting. The anchor venue for Bristol Rhythm & Roots Reunion.",
		shortDescription: "Restored 1930s Art Deco theater and anchor venue for Rhythm & Roots",
		city: "Bristol",
		state: "TN",
		address: "518 State St, Bristol, TN 37620",
		phone: "423-274-1184",
		website: "https://paramountarts.org",
		features: ["Historic Theater", "Concerts", "Film", "Performing Arts", "Art Deco Architecture"],
		metadata: {
			history:
				"Built in the 1930s. Restored as a performing arts center. Hosts major concerts and serves as anchor for Bristol Rhythm & Roots Reunion.",
			capacity: 700,
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "carter-family-fold",
		name: "Carter Family Fold",
		type: "major" as const,
		description:
			"Located just across the state line in Hiltons, Virginia, the Carter Family Fold honors the legacy of the First Family of Country Music. Saturday night shows feature old-time and bluegrass music in the same style the Carter Family played. Janette Carter's original general store and the original A.P. Carter cabin are also on site.",
		shortDescription:
			"Saturday night old-time and bluegrass shows honoring the Carter Family legacy",
		city: "Hiltons",
		state: "VA",
		address: "3449 AP Carter Hwy, Hiltons, VA 24258",
		phone: "276-386-6054",
		website: "https://carterfamilyfold.org",
		features: ["Live Music", "Carter Family History", "Museum", "General Store", "Historic Cabin"],
		metadata: {
			history:
				"Founded by Janette Carter to preserve the musical legacy of the Carter Family. Saturday night shows continue the tradition.",
			capacity: 800,
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "junior-appalachian-musicians",
		name: "Junior Appalachian Musicians (JAM)",
		type: "major" as const,
		description:
			"An after-school program introducing children to traditional Appalachian music through instruction in instruments like fiddle, banjo, guitar, and mandolin. JAM programs across the region ensure the next generation carries forward the musical traditions of the mountains.",
		shortDescription:
			"After-school program teaching Appalachian instruments to the next generation",
		city: "Various",
		state: "TN",
		address: "Regional programs across Northeast Tennessee",
		website: "https://jamkids.org",
		features: ["Youth Education", "Fiddle", "Banjo", "Guitar", "Mandolin", "Traditional Music"],
		metadata: {
			history:
				"Founded to preserve Appalachian musical heritage by teaching traditional instruments to children.",
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "blackbird-ale-house",
		name: "Blackbird Ale House",
		type: "affiliated" as const,
		description:
			"A craft brewery and live music venue in downtown Johnson City featuring regular performances by local and regional Americana, bluegrass, and roots artists. Known for its community-focused atmosphere and support of the local music scene.",
		shortDescription: "Craft brewery and live music venue supporting local roots artists",
		city: "Johnson City",
		state: "TN",
		address: "114 E Main St, Johnson City, TN 37601",
		website: "https://blackbirdalehouse.com",
		features: ["Live Music", "Craft Beer", "Local Artists", "Americana", "Bluegrass"],
		metadata: {
			capacity: 200,
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "the-mahogany-session",
		name: "The Mahogany Session",
		type: "affiliated" as const,
		description:
			"An intimate singer-songwriter venue in Bristol featuring acoustic performances in a warm, listening-room atmosphere. Regular open mic nights and curated showcases highlight emerging talent from the Tri-Cities and beyond.",
		shortDescription: "Intimate singer-songwriter venue and open mic night in Bristol",
		city: "Bristol",
		state: "TN",
		address: "State Street, Bristol, TN",
		features: ["Open Mic", "Singer-Songwriter", "Acoustic", "Intimate Setting"],
		metadata: {
			capacity: 80,
		},
	},
];

// =============================================================================
// WAYSIDE EXHIBITS — Music Story Chapters
// =============================================================================

export const waysides = [
	{
		id: ulid(),
		trailId,
		slug: "the-sound",
		name: "The Sound",
		location: "Holston River Valley, Bristol to Kingsport",
		county: "Sullivan",
		content: {
			summary:
				"Before there were recording studios, there were front porches. Before radio stations, there were church congregations. The mountains shaped the music.",
			narrative:
				"The Tri-Cities sat at the intersection of America's deepest musical traditions. Appalachian ballads brought from the British Isles collided with spirituals from African American churches and blues from the Deep South. Bristol, on the Tennessee-Virginia border, was a crossroads. The railroad brought musicians from Appalachia, the Piedmont, and the Mississippi Delta. They traded songs, borrowed techniques, and created a new sound that didn't exist anywhere else. The Carter Family learned their songs from old British ballads and church hymns. Jimmie Rodgers blended blues yodeling with mountain lyrics. The result was a music that sounded like America.",
			historicalFigures: [
				{
					name: "The Carter Family",
					description:
						"A.P., Sara, and Maybelle Carter recorded at the 1927 Bristol Sessions. Their songs drew from old British ballads and church hymns, creating the foundation of country music.",
				},
				{
					name: "Jimmie Rodgers",
					description:
						"The 'Father of Country Music' blended blues yodeling with mountain lyrics. Recorded at the 1927 Bristol Sessions and became the genre's first superstar.",
				},
			],
			nearbyAttractions: [
				"Birthplace of Country Music Museum",
				"Carter Family Fold",
				"Down Home",
				"ETSU Bluegrass Program",
			],
			quote:
				"The Carter Family learned their songs from old British ballads and church hymns. Jimmie Rodgers blended blues yodeling with mountain lyrics.",
		},
		isVirtual: false,
	},
	{
		id: ulid(),
		trailId,
		slug: "the-railroad",
		name: "The Railroad",
		location: "Old Stage Road and Railroad Corridor, Sullivan County",
		county: "Sullivan",
		content: {
			summary:
				"The railroad didn't just carry cargo. It carried musicians. It carried songs. It carried the sound of the mountains to places that had never heard it before.",
			narrative:
				"When the railroad arrived in the Tri-Cities in 1856, it changed everything. But not in the way most people think. Yes, it brought commerce and passengers. But it also brought musicians — traveling performers, bluesmen from the Delta, Piedmont string bands, Appalachian ballad singers. They met at depots, in rail yards, and in boarding houses. They traded songs across racial lines in a way that was rare for the era. By the early 1900s, phonograph records and radio began spreading this mountain sound nationwide. The musicians who rode those rails created a genre that would eventually be called country music.",
			historicalFigures: [
				{
					name: "Ralph Peer",
					description:
						"Victor Records talent scout who set up a temporary recording studio in Bristol in 1927, creating the 'big bang of country music.'",
				},
				{
					name: "Ernest Stoneman",
					description:
						"A native of Carroll County, Virginia, who recorded at the Bristol Sessions and helped convince Ralph Peer to come to Bristol.",
				},
			],
			nearbyAttractions: [
				"Birthplace of Country Music Museum",
				"Paramount Center for the Arts",
				"Radio Bristol",
			],
			quote:
				"The railroad brought musicians from Appalachia, the Piedmont, and the Mississippi Delta. They traded songs, borrowed techniques, and created a new sound.",
		},
		isVirtual: false,
	},
	{
		id: ulid(),
		trailId,
		slug: "the-sessions",
		name: "The Sessions",
		location: "408 State Street, Bristol, TN/VA",
		county: "Sullivan",
		content: {
			summary:
				"Twelve days in the summer of 1927. A converted hat warehouse on State Street. One microphone, a disc-cutting machine, and the sound that would define American music for a century.",
			narrative:
				"In July and August of 1927, Ralph Peer set up a temporary recording studio in a converted hat warehouse at 408 State Street in Bristol, Tennessee. He had a microphone, a disc-cutting machine, and a hunch that rural musicians had commercial potential. Over twelve days, Peer recorded nineteen acts. The Carter Family walked in with songs learned from old ballads and church hymns. Jimmie Rodgers brought a yodel and a blues sensibility that nobody had heard before. Ernest Stoneman, Blind Alfred Reed, and a dozen others added their own sounds to the mix. When the dust settled, Peer had the foundation of an industry. Johnny Cash said it best: 'The Bristol Sessions were the single most important event in the history of country music.' Congress made it official in 1998, designating Bristol the 'Birthplace of Country Music.'",
			historicalFigures: [
				{
					name: "Ralph Peer",
					description:
						"Set up the recording studio in Bristol in 1927 and recorded the artists who would become the foundation of country music.",
				},
				{
					name: "Maybelle Carter",
					description:
						"Revolutionized guitar playing with her 'Carter Scratch' technique. Her innovative style influenced generations of guitarists.",
				},
				{
					name: "Blind Alfred Reed",
					description:
						"Recorded 'The Wreck of the Virginian' at the Bristol Sessions. A fiddle player and singer who addressed social issues in his music.",
				},
			],
			nearbyAttractions: [
				"Birthplace of Country Music Museum",
				"Paramount Center for the Arts",
				"State Street",
			],
			quote:
				"The Bristol Sessions were the single most important event in the history of country music. — Johnny Cash",
		},
		isVirtual: false,
	},
	{
		id: ulid(),
		trailId,
		slug: "the-festival",
		name: "The Festival",
		location: "Historic Downtown Bristol, State Street",
		county: "Sullivan",
		content: {
			summary:
				"Every September, 20+ stages light up downtown Bristol. For three days, the Birthplace of Country Music becomes the center of the roots music universe.",
			narrative:
				"The Bristol Rhythm & Roots Reunion is more than a festival. It's a living tribute to the 1927 Bristol Sessions. Every September, 50,000 people gather on State Street — the historic line between Tennessee and Virginia — to hear 120+ acts across 20+ stages. The festival features roots, Americana, bluegrass, and country music in the same venues where the original sessions took place. From the Paramount Theater to outdoor stages on State Street, the Reunion proves that the sound born here nearly a century ago is still alive, still evolving, and still drawing people from across the country.",
			historicalFigures: [
				{
					name: "Leah Ross",
					description:
						"Executive director who helped grow Bristol Rhythm & Roots Reunion into one of the premier roots music festivals in the Southeast.",
				},
				{
					name: "Bristol Sessions Artists",
					description:
						"The 19 acts recorded by Ralph Peer in 1927, including the Carter Family and Jimmie Rodgers, whose legacy the festival celebrates each year.",
				},
			],
			nearbyAttractions: [
				"Paramount Center for the Arts",
				"Birthplace of Country Music Museum",
				"State Street",
				"Radio Bristol",
			],
			quote:
				"50,000 people gather on State Street to hear 120+ acts across 20+ stages. The sound born here nearly a century ago is still alive.",
		},
		isVirtual: false,
	},
	{
		id: ulid(),
		trailId,
		slug: "the-next-generation",
		name: "The Next Generation",
		location: "East Tennessee State University, Johnson City",
		county: "Washington",
		content: {
			summary:
				"The music never stopped. At ETSU, the next generation is learning the same songs on the same instruments — and writing new ones that honor the tradition while pushing it forward.",
			narrative:
				"East Tennessee State University is home to the only four-year degree program in Bluegrass, Old Time, and Country Music in the world. Students come from across the country — and the world — to study under master musicians. They learn old-time fiddle, bluegrass banjo, flatpicking guitar, and traditional singing. But they also write new songs, form new bands, and record new albums. The program's graduates perform at the Grand Ole Opry, win Grammy awards, and teach the next generation. Meanwhile, Junior Appalachian Musicians (JAM) programs across the region introduce children to traditional instruments. The sound that started on front porches a century ago is being passed to new hands.",
			historicalFigures: [
				{
					name: "Dr. Ron Roach",
					description:
						"Director of ETSU's Bluegrass, Old Time and Country Music program, preserving and advancing Appalachian musical traditions through higher education.",
				},
				{
					name: "Janette Carter",
					description:
						"Daughter of A.P. and Sara Carter who founded the Carter Family Fold to preserve her family's musical legacy for future generations.",
				},
			],
			nearbyAttractions: [
				"ETSU Bluegrass Program",
				"Down Home",
				"Carter Family Fold",
				"Junior Appalachian Musicians",
			],
			quote:
				"The only four-year degree program of its kind in the world. Students learn from master musicians on authentic instruments in the heart of bluegrass country.",
		},
		isVirtual: false,
	},
];

// =============================================================================
// RECURRING EVENTS — Music Jams, Sessions, and Regular Shows
// =============================================================================

export const recurringEvents = [
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "carter-family-fold-saturdays",
		name: "Carter Family Fold Saturday Night Shows",
		description:
			"Every Saturday night, the Carter Family Fold hosts old-time and bluegrass music in the same style the Carter Family played. National and regional acts perform in a family-friendly atmosphere where dancing is encouraged and the tradition lives on.",
		startDate: new Date("2026-01-10T19:30:00"),
		endDate: new Date("2026-01-10T22:00:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "weekly", dayOfWeek: 6 },
		admission: "$10 adults, $2 children",
		metadata: {
			performers: ["Regional old-time and bluegrass bands"],
			contactPhone: "276-386-6054",
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "radio-bristol-farm-fun-time",
		name: "Radio Bristol 'Farm and Fun Time'",
		description:
			"A live variety show broadcast from the Birthplace of Country Music Museum, modeled after the 1940s radio programs that brought country music to rural America. Features live music, comedy, and storytelling in front of a studio audience.",
		startDate: new Date("2026-02-05T19:00:00"),
		endDate: new Date("2026-02-05T21:00:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "monthly", dayOfMonth: 5 },
		admission: "Free with museum admission",
		metadata: {
			performers: ["Guest artists and house band"],
			contactPhone: "423-573-1927",
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "bluegrass-jam-johnson-city",
		name: "Weekly Bluegrass Jam — Johnson City",
		description:
			"An informal weekly jam session where musicians of all skill levels gather to play traditional bluegrass and old-time standards. Beginners welcome — bring an instrument or just listen.",
		startDate: new Date("2026-01-07T18:00:00"),
		endDate: new Date("2026-01-07T21:00:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "weekly", dayOfWeek: 3 },
		admission: "Free",
		metadata: {
			performers: ["Open jam — all musicians welcome"],
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "open-mic-down-home",
		name: "Open Mic Night at The Down Home",
		description:
			"A weekly open mic at Johnson City's legendary listening room. Singer-songwriters, poets, and acoustic musicians share original material in an intimate, supportive setting.",
		startDate: new Date("2026-01-08T19:00:00"),
		endDate: new Date("2026-01-08T22:00:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "weekly", dayOfWeek: 4 },
		admission: "Free",
		metadata: {
			performers: ["Local singer-songwriters and acoustic artists"],
			contactPhone: "423-929-9821",
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "etsu-bluegrass-concert-series",
		name: "ETSU Bluegrass Concert Series",
		description:
			"A regular concert series featuring student ensembles, faculty recitals, and guest artists from the bluegrass and old-time music world. Performances showcase the program's commitment to preserving and advancing Appalachian musical traditions.",
		startDate: new Date("2026-02-15T19:30:00"),
		endDate: new Date("2026-02-15T21:00:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "monthly", dayOfMonth: 15 },
		admission: "Free and open to the public",
		metadata: {
			performers: ["ETSU student ensembles and guest artists"],
			contactPhone: "423-439-6075",
		},
	},
];

// =============================================================================
// SPECIAL EVENTS — Festivals and Annual Celebrations
// =============================================================================

export const specialEvents = [
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "bristol-rhythm-roots-2026",
		name: "Bristol Rhythm & Roots Reunion",
		description:
			"Three days of roots music across 20+ stages in historic downtown Bristol, TN/VA. Celebrating the legacy of the 1927 Bristol Sessions with 120+ acts spanning roots, Americana, bluegrass, and country. 50,000 attendees annually.",
		startDate: new Date("2026-09-18T16:00:00"),
		endDate: new Date("2026-09-20T23:00:00"),
		isRecurring: false,
		admission: "Wristband required",
		metadata: {
			performers: ["120+ acts across roots, Americana, bluegrass, and country"],
			ticketUrl: "https://bristolrhythm.com",
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "bluegrass-day-etsu-2026",
		name: "ETSU Bluegrass Day",
		description:
			"An annual celebration of bluegrass and old-time music featuring student performances, workshops, jam sessions, and guest artist showcases. Open to the public and a highlight of the spring semester.",
		startDate: new Date("2026-04-18T10:00:00"),
		endDate: new Date("2026-04-18T17:00:00"),
		isRecurring: false,
		admission: "Free",
		metadata: {
			performers: ["ETSU students, faculty, and guest artists"],
			contactPhone: "423-439-6075",
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "jam-kids-showcase-2026",
		name: "Junior Appalachian Musicians Regional Showcase",
		description:
			"A year-end showcase where JAM program students from across the region perform the traditional Appalachian music they've learned throughout the year. Fiddle, banjo, guitar, and mandolin performances by the next generation.",
		startDate: new Date("2026-05-09T14:00:00"),
		endDate: new Date("2026-05-09T17:00:00"),
		isRecurring: false,
		admission: "Free",
		metadata: {
			performers: ["JAM program students from across Northeast Tennessee"],
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "bristol-sessions-anniversary",
		name: "Bristol Sessions Anniversary Celebration",
		description:
			"A special commemoration of the 1927 Bristol Sessions featuring live performances, historical exhibits, and educational programs at the Birthplace of Country Music Museum. Honors the artists who recorded and the legacy they created.",
		startDate: new Date("2026-07-31T10:00:00"),
		endDate: new Date("2026-08-02T17:00:00"),
		isRecurring: false,
		admission: "Free and ticketed events",
		metadata: {
			performers: ["Tribute artists and special guests"],
			contactPhone: "423-573-1927",
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "kingsport-fun-fest-music",
		name: "Kingsport Fun Fest — Music Weekend",
		description:
			"The music-focused weekend of Kingsport's signature nine-day festival featuring outdoor concerts, local artist showcases, and family-friendly performances across downtown Kingsport.",
		startDate: new Date("2026-07-24T16:00:00"),
		endDate: new Date("2026-07-25T22:00:00"),
		isRecurring: false,
		admission: "Free",
		metadata: {
			performers: ["Local and regional acts"],
		},
	},
];

// =============================================================================
// DMO CONTACTS
// =============================================================================

export const dmoContacts = [
	// West Zone (Sullivan County / Bristol / Kingsport)
	{
		id: ulid(),
		trailId,
		name: "Visit Kingsport",
		zone: "west" as const,
		phone: "423-343-9145",
		website: "https://visitkingsport.com",
		city: "Kingsport",
	},
	{
		id: ulid(),
		trailId,
		name: "Discover Bristol",
		zone: "west" as const,
		phone: "423-989-4850",
		website: "https://discoverbristol.org",
		city: "Bristol",
	},
	{
		id: ulid(),
		trailId,
		name: "Sullivan County Tourism",
		zone: "west" as const,
		phone: "423-323-1897",
		website: "https://visitsullivancountytn.com",
		city: "Blountville",
	},

	// Central Zone (Johnson City / Washington County)
	{
		id: ulid(),
		trailId,
		name: "Visit Johnson City",
		zone: "central" as const,
		phone: "423-434-6294",
		website: "https://visitjohnsoncitytn.com",
		city: "Johnson City",
	},
	{
		id: ulid(),
		trailId,
		name: "Washington County Tourism",
		zone: "central" as const,
		phone: "423-753-0203",
		website: "https://washingtoncountytn.org",
		city: "Jonesborough",
	},

	// East Zone (Elizabethton / Carter County)
	{
		id: ulid(),
		trailId,
		name: "Carter County Tourism",
		zone: "east" as const,
		phone: "423-547-3850",
		website: "https://cartercountytn.gov",
		city: "Elizabethton",
	},
	{
		id: ulid(),
		trailId,
		name: "Elizabethton-Carter County Chamber",
		zone: "east" as const,
		phone: "423-543-2122",
		website: "https://elizabethtonchamber.com",
		city: "Elizabethton",
	},

	// North Zone (Virginia border / Abingdon)
	{
		id: ulid(),
		trailId,
		name: "Abingdon CVB",
		zone: "north" as const,
		phone: "276-676-2282",
		website: "https://visitabingdonvirginia.com",
		city: "Abingdon",
	},
	{
		id: ulid(),
		trailId,
		name: "Washington County VA Tourism",
		zone: "north" as const,
		phone: "276-676-2282",
		website: "https://washingtoncountyva.com",
		city: "Abingdon",
	},
];
