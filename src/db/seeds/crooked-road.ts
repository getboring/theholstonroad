/**
 * Seed data for The Crooked Road — Virginia's Heritage Music Trail
 * This is Tenant #1 for the Trailhead platform.
 */

import { ulid } from "ulidx";

// =============================================================================
// TRAIL
// =============================================================================

export const trail = {
	id: ulid(),
	slug: "crooked-road",
	name: "The Crooked Road",
	tagline: "Where the music never stopped.",
	description:
		"A 330-mile driving trail through the mountains of Southwest Virginia connecting ten Major Venues and over 60 Affiliated Venues and Festivals that visitors can enjoy every day of the year.",
	location: "Southwest Virginia",
	website: "https://thecrookedroadva.com",
	primaryColor: "#8B4513",
	secondaryColor: "#D2691E",
	metadata: {
		routeLength: 330,
		counties: [
			"Bland",
			"Bristol",
			"Buchanan",
			"Carroll",
			"Dickenson",
			"Floyd",
			"Franklin",
			"Galax",
			"Giles",
			"Grayson",
			"Lee",
			"Montgomery",
			"Norton",
			"Patrick",
			"Pulaski",
			"Radford",
			"Russell",
			"Scott",
			"Smyth",
			"Tazewell",
			"Washington",
			"Wise",
			"Wythe",
		],
		founded: 2004,
		economicImpact: "$9.1 million annually, 130+ jobs supported",
		mission:
			"To support economic development in Southwest Virginia by promoting this region's rich heritage of traditional music.",
	},
};

const trailId = trail.id;

// =============================================================================
// MAJOR VENUES
// =============================================================================

export const majorVenues = [
	{
		id: ulid(),
		trailId,
		slug: "birthplace-of-country-music",
		name: "Birthplace of Country Music",
		type: "major" as const,
		description:
			"Showcases Bristol's role in the birth and development of country music through the Birthplace of Country Music Museum, the Bristol Rhythm & Roots Reunion music festival, WBCM Radio Bristol, and community outreach programs. Smithsonian affiliate.",
		shortDescription: "Smithsonian affiliate museum celebrating the 1927 Bristol Sessions",
		city: "Bristol",
		state: "VA",
		features: ["Museum", "Festival", "Radio Station", "Educational Programs"],
		metadata: {
			history:
				"Tells the story of the 1927 Bristol Sessions featuring first recordings of the Carter Family and Jimmie Rodgers",
			anniversary: "10th anniversary celebrated 2024",
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "blue-ridge-music-center",
		name: "Blue Ridge Music Center",
		type: "major" as const,
		description:
			"Celebrates the music and musicians of the Blue Ridge Mountains. Each spring, summer, and fall, welcomes thousands to enjoy traditional music including bluegrass, old-time, folk, Americana, country blues, and gospel.",
		shortDescription: "Live music, exhibits, jams, and hiking trails on the Blue Ridge Parkway",
		city: "Galax",
		state: "VA",
		features: ["Live Performances", "Music Exhibits", "Jam Sessions", "Hiking Trails"],
		metadata: {
			history:
				"Masterminded by the late Joe Wilson, music historian, as part of the Blue Ridge Parkway",
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "carter-family-fold",
		name: "Carter Family Fold",
		type: "major" as const,
		description:
			"The Carter Family Memorial Music Center is a non-profit organization serving fans and supporters of old-time country and folk music through weekly performances in Hiltons, Virginia. 800-seat facility with live music every Saturday night (acoustic only).",
		shortDescription: "Weekly old-time country and folk music at the Carter Family's hometown",
		city: "Hiltons",
		state: "VA",
		features: ["800-Seat Facility", "Weekly Saturday Shows", "Acoustic Only", "Dance Floor"],
		metadata: {
			history:
				"Legacy began in 1927 with A.P., Sara, and Maybelle Carter. The trio recorded 300 songs and launched the trajectory of country music.",
			anniversary: "50-year anniversary celebrated August 3, 2024",
			capacity: 800,
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "country-cabin-ii",
		name: "Country Cabin II",
		type: "major" as const,
		description:
			"Located in Norton, VA. Open April through December with weekly Saturday music. Built in 2002 with WPA art hub heritage.",
		shortDescription: "Weekly Saturday music in Norton, open April-December",
		city: "Norton",
		state: "VA",
		features: ["Weekly Saturday Music", "Seasonal Operation"],
		metadata: {
			history: "Built in 2002, carries forward WPA art hub heritage",
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "floyd-country-store",
		name: "Floyd Country Store",
		type: "major" as const,
		description:
			"Since the 1980s, a community gathering place built on the celebration of traditional Southern Appalachian music and dance. Home of the famous Friday Night Jamboree (40+ years) and Sunday old-time and bluegrass jams.",
		shortDescription: "Home of the legendary Friday Night Jamboree and Sunday jams",
		city: "Floyd",
		state: "VA",
		features: ["Friday Night Jamboree", "Sunday Jams", "Dancing", "Community Gathering"],
		metadata: {
			history: "Community gathering place since the 1980s",
			anniversary: "Friday Night Jamboree 40th anniversary celebrated 2024",
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "galax-old-fiddlers-convention",
		name: "Galax Old Fiddlers Convention",
		type: "major" as const,
		description:
			"Annual fiddlers convention in Galax, Virginia. One of the most significant old-time and bluegrass music festivals in the world.",
		shortDescription: "Annual world-renowned old-time and bluegrass festival",
		city: "Galax",
		state: "VA",
		features: ["Annual Festival", "Fiddle Competitions", "Camping", "Traditional Music"],
		metadata: {
			anniversary: "90th anniversary celebrated 2024",
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "ralph-stanley-museum",
		name: "Ralph Stanley Museum",
		type: "major" as const,
		description:
			"Located in Clintwood, VA. Dedicated to traditional mountain music and the legacy of Dr. Ralph Stanley. Westernmost stop on The Crooked Road.",
		shortDescription: "Traditional mountain music museum in Clintwood",
		city: "Clintwood",
		state: "VA",
		features: ["Museum", "Traditional Mountain Music", "Ralph Stanley Legacy"],
		metadata: {
			anniversary: "20th anniversary celebrated 2024",
		},
	},
	{
		id: ulid(),
		trailId,
		slug: "rex-theater",
		name: "Rex Theater",
		type: "major" as const,
		description: "Historic theater in Galax, Virginia hosting live music and cultural events.",
		shortDescription: "Historic theater hosting live music in Galax",
		city: "Galax",
		state: "VA",
		features: ["Live Music", "Historic Venue"],
	},
	{
		id: ulid(),
		trailId,
		slug: "southwest-virginia-cultural-center",
		name: "Southwest Virginia Cultural Center & Marketplace",
		type: "major" as const,
		description:
			"Abingdon's welcome mat to the region. Features 5,000 artisan pieces from 180 artisans, live demonstrations, and the monthly First Thursdays jam.",
		shortDescription: "Visitor center, artisan marketplace, and monthly jam in Abingdon",
		city: "Abingdon",
		state: "VA",
		features: [
			"Visitor Center",
			"Artisan Marketplace",
			"First Thursdays Jam",
			"5,000 Artisan Pieces",
		],
	},
	{
		id: ulid(),
		trailId,
		slug: "blue-ridge-institute",
		name: "Blue Ridge Institute & Farm Museum",
		type: "major" as const,
		description:
			"Located at Ferrum College. Part of a local heritage rich with singers and musicians. Hosts Monday Night Jams at 7pm.",
		shortDescription: "Monday night jams and heritage exhibits at Ferrum College",
		city: "Ferrum",
		state: "VA",
		features: ["Monday Night Jam", "Farm Museum", "Heritage Exhibits"],
		metadata: {
			history: "English scholar Cecil Sharp collected ballads in Franklin County in 1916",
		},
	},
];

// =============================================================================
// WAYSIDE EXHIBITS
// =============================================================================

export const waysides = [
	{
		id: ulid(),
		trailId,
		slug: "town-of-floyd-wayside",
		name: "Town of Floyd Wayside",
		location: "305 S Locust St, Floyd, Virginia 24091",
		county: "Floyd",
		content: {
			summary:
				"Floyd County honors community traditions while welcoming cultural expressions from elsewhere. Home to the famous Floyd Country Store Friday Night Jamboree.",
			narrative:
				"Floyd County is among the most multi-faceted of America's small places, honoring community traditions while welcoming cultural expressions from elsewhere. Its diverse population includes an older farming community, new organic growers, creative artists, skilled tradeworkers, and growing numbers of urban commuters. The County also has several respected makers of violins and fretted stringed instruments. For many, music-making has always been a family tradition. Travelers from around the world join local folks in dancing to and enjoying old-time, gospel, and bluegrass music every Friday night at The Floyd Country Store—weekly gatherings that date through generations. The noted Floyd County Ramblers recorded an arrangement of 'Step Stone' on the Victor label in 1930, a version that was later adopted in several African countries.",
			historicalFigures: [
				{
					name: "Newton Hylton",
					description:
						"Banjo maker, blacksmith, farmer, furniture maker, millwright, and country dentist who rebuilt the water wheel for historic Mabry Mill in 1945.",
				},
			],
			nearbyAttractions: [
				"Mabry Mill (most photographed site on Blue Ridge Parkway)",
				"Hiking trails",
				"Bed and breakfasts",
				"Wineries",
				"Specialty shops",
			],
			quote:
				"Looking for something? Just ask, and we'll be sure to point you in the right direction.",
		},
		isVirtual: false,
	},
	{
		id: ulid(),
		trailId,
		slug: "town-of-independence-wayside",
		name: "Town of Independence Wayside",
		location: "103 Morton Dr, Independence, Virginia 24348",
		county: "Grayson",
		content: {
			summary:
				"Grayson County is noted for traditional music and altitude. Four of Virginia's five highest mountains are here. Home to Wade Ward, the nation's most renowned old-time clawhammer banjoist.",
			narrative:
				"In 1850 Grayson County was in the midst of controversy concerning the location of the county seat. As a compromise between two rival camps, a third site was selected and named Independence. One of the most famous fighting units of the Civil War was the Grayson Daredevils, 91 farmers from the Elk Creek community. Tiny places such as Rugby have produced notable musicians for generations. Mill hands from historic Fries on the beautiful New River had a pivotal role in starting the commercial country music industry in the early 1920s.",
			historicalFigures: [
				{
					name: "Wade Ward",
					description:
						"Perhaps the nation's most renowned old-time clawhammer style banjoist. Lived in Independence and welcomed more than 1,000 aspiring banjoists, treating all as members of the Ward family.",
				},
			],
			nearbyAttractions: ["Historic 1908 Courthouse Museum", "Fries", "Gold Hill"],
			quote: "",
		},
		isVirtual: false,
	},
	{
		id: ulid(),
		trailId,
		slug: "meadows-of-dan-wayside",
		name: "Meadows of Dan Wayside",
		location: "2577 Jeb Stuart Hwy, Meadows of Dan, Virginia 24120",
		county: "Patrick",
		content: {
			summary:
				"Patrick County is named for a fiddler, Patrick Henry, and is where the Piedmont Plateau meets the Blue Ridge Mountains. Nine local families have produced musicians for two centuries.",
			narrative:
				"Patrick County is named for a fiddler, Patrick Henry, and is where the Piedmont Plateau meets the Blue Ridge Mountains. Settled in Revolutionary times, it has always been a musical place. Stuart, the county seat, is named for a string band leader who was also a Confederate cavalry officer, General J.E.B. Stuart. Famed minstrel banjoist Sam Sweeney was in Stuart's band. Nine local families have produced a huge number of musicians during two centuries: German, English, Ulster Irish, and African-American. These families share a string band music that has proven remarkably durable.",
			historicalFigures: [
				{
					name: "Spangler Family",
					description:
						"One of nine musical families enriching Patrick County traditional music for over 200 years.",
				},
				{
					name: "Bowman Family",
					description:
						"One of nine musical families with German, English, Huguenot, Ulster Irish, and African-American ancestry.",
				},
				{
					name: "Shelor Family",
					description: "Prominent musical family continuing the tradition today.",
				},
			],
			nearbyAttractions: [
				"The Pinnacles of Dan",
				"Lover's Leap",
				"Mabry Mill",
				"Covered bridges over Smith River",
				"J.E.B. Stuart's home at Ararat",
			],
			quote:
				"There's good food here, fine lodging, and if you feel an urge to sing or dance, go ahead.",
		},
		isVirtual: false,
	},
	{
		id: ulid(),
		trailId,
		slug: "town-of-wise-wayside",
		name: "Town of Wise Wayside",
		location: "Wise, Wise County, Virginia 24293",
		county: "Wise",
		content: {
			summary:
				"Known variously as Big Glades, Gladesville, and Gladeville before taking its current name in 1924. The coal and lumber industries have shaped life here since the late 1800s.",
			narrative:
				"Known variously through the years as Big Glades, Gladesville, and Gladeville, Wise took its current name in 1924 after Henry Alexander Wise, Governor of Virginia before the Civil War. The coal and lumber industries have shaped life in Wise since the late 1800s. In 1954, Clinch Valley College was formed here and provided valuable access to higher education in the coalfields region. Dr. Papa Joe Smiddy, a devoted educator and much loved old time banjo player served as biology professor, Director, and Chancellor from 1954 to 1985.",
			historicalFigures: [
				{
					name: "Dr. Papa Joe Smiddy",
					description:
						"Devoted educator and old time banjo player. Served as biology professor, Director, and Chancellor of Clinch Valley College from 1954 to 1985.",
				},
			],
			nearbyAttractions: ["Wise County Fairgrounds", "University of Virginia's College at Wise"],
			quote: "",
		},
		isVirtual: false,
	},
	{
		id: ulid(),
		trailId,
		slug: "bland-county-wayside",
		name: "Bland County Wayside",
		location: "Bland County, Virginia",
		county: "Bland",
		content: {
			summary: "Bland County virtual wayside highlighting local musical heritage.",
			narrative:
				"Bland County has produced notable musicians including Wesley 'Bane' Boyles who participated in the historic Bristol Sessions.",
			historicalFigures: [
				{
					name: "Wesley 'Bane' Boyles",
					description: "Bland County musician who participated in the Bristol Sessions.",
				},
				{ name: "Darnell Miller", description: "Traditional musician from Bland County." },
			],
			nearbyAttractions: ["Rocky Gap Welcome Center"],
			quote: "",
		},
		isVirtual: true,
	},
];

// =============================================================================
// RECURRING EVENTS
// =============================================================================

export const recurringEvents = [
	{
		id: ulid(),
		trailId,
		venueId: null, // Will be linked after venue IDs are known
		slug: "first-thursdays-jam",
		name: "First Thursdays at the Cultural Center / The Crooked Road Jam",
		description:
			"Occurs on the first Thursday of each month at the Southwest Virginia Cultural Center & Marketplace. Bring your instrument to jam or just come to listen and enjoy. 'Round the Mountain Artisans present live demonstrations and storytelling. Local food vendors available.",
		startDate: new Date("2026-05-01T18:30:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "monthly", dayOfMonth: 1 },
		admission: "Free",
		metadata: {
			performers: ["Open Jam"],
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "floyd-sunday-jam",
		name: "Floyd Country Store Sunday Jam",
		description:
			"Every Sunday afternoon the Floyd Country Store comes alive with community music during old time and bluegrass music jams. Bring your instrument and join in, or grab some food and be our audience!",
		startDate: new Date("2026-04-26T13:30:00"),
		endDate: new Date("2026-04-26T17:30:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "weekly", dayOfWeek: 0 },
		admission: "Free",
		metadata: {
			performers: ["Community Musicians"],
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "blue-ridge-monday-jam",
		name: "Jam at the Blue Ridge Institute & Museum",
		description:
			"Monday night jam at the Blue Ridge Institute and Museum. In warmer months, folks gather outside under the pavilion; on cooler nights, inside the museum.",
		startDate: new Date("2026-04-27T19:00:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "weekly", dayOfWeek: 1 },
		admission: "Free",
		metadata: {
			performers: ["Community Musicians"],
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "historic-fries-theatre-jam",
		name: "Historic Fries Theatre Jam",
		description:
			"Folks from all over the world find their way to the historic Fries Theatre for weekly Thursday night jams. All visitors welcome to mingle with local residents for a relaxing evening of old-time music and fellowship.",
		startDate: new Date("2026-04-30T19:00:00"),
		endDate: new Date("2026-04-30T21:00:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "weekly", dayOfWeek: 4 },
		admission: "Free",
		metadata: {
			performers: ["Community Musicians"],
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "pickin-in-the-pound",
		name: "Pickin' in the Pound",
		description:
			"Folks gather for pickin', dancing and a traditional Appalachian supper. Old time and traditional bluegrass music. Free admission and supper. ADA compliant.",
		startDate: new Date("2026-04-30T19:00:00"),
		endDate: new Date("2026-04-30T21:00:00"),
		isRecurring: true,
		recurrenceRule: { frequency: "weekly", dayOfWeek: 4 },
		admission: "Free (supper included)",
		metadata: {
			contactName: "Debbie Large",
			contactPhone: "276-220-1036",
		},
	},
];

// =============================================================================
// SPECIAL EVENTS (April-May 2026)
// =============================================================================

export const specialEvents = [
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "friday-night-jamboree-apr-24",
		name: "The Friday Night Jamboree at The Floyd Country Store",
		description:
			"The legendary Friday Night Jamboree — 40+ years of traditional Appalachian music and dance.",
		startDate: new Date("2026-04-24T18:30:00"),
		endDate: new Date("2026-04-24T21:30:00"),
		isRecurring: false,
		admission: "",
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "alice-gerrard-floyd",
		name: "Alice Gerrard with Tatiana Hargreaves & Reed Stutz",
		description:
			"Legendary Alice Gerrard performs at The Floyd Country Store with Tatiana Hargreaves and Reed Stutz.",
		startDate: new Date("2026-04-25T19:00:00"),
		endDate: new Date("2026-04-25T21:00:00"),
		isRecurring: false,
		admission: "",
		metadata: {
			performers: ["Alice Gerrard", "Tatiana Hargreaves", "Reed Stutz"],
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "michael-cleveland-floyd",
		name: "Michael Cleveland & Flamekeeper Live",
		description: "Michael Cleveland & Flamekeeper perform live at The Floyd Country Store.",
		startDate: new Date("2026-04-26T19:00:00"),
		isRecurring: false,
		admission: "",
		metadata: {
			performers: ["Michael Cleveland & Flamekeeper"],
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "leftover-biscuits-carter-fold",
		name: "Leftover Biscuits at the Carter Family Fold",
		description: "Leftover Biscuits perform at the Carter Family Fold.",
		startDate: new Date("2026-04-25T19:30:00"),
		endDate: new Date("2026-04-25T22:00:00"),
		isRecurring: false,
		admission: "",
		metadata: {
			performers: ["Leftover Biscuits"],
		},
	},
	{
		id: ulid(),
		trailId,
		venueId: null,
		slug: "jeff-little-trio-carter-fold",
		name: "Jeff Little Trio at the Carter Family Fold",
		description: "Jeff Little Trio performs at the Carter Family Fold.",
		startDate: new Date("2026-05-02T19:30:00"),
		endDate: new Date("2026-05-02T22:00:00"),
		isRecurring: false,
		admission: "",
		metadata: {
			performers: ["Jeff Little Trio"],
		},
	},
];

// =============================================================================
// DMO CONTACTS
// =============================================================================

export const dmoContacts = [
	// West Zone
	{
		id: ulid(),
		trailId,
		name: "Abingdon CVB",
		zone: "west" as const,
		phone: "276-676-2282",
		website: "https://visitabingdonvirginia.com/",
		city: "Abingdon",
	},
	{
		id: ulid(),
		trailId,
		name: "Bristol CVB",
		zone: "west" as const,
		phone: "423-989-4850",
		website: "https://discoverbristol.org/",
		city: "Bristol",
	},
	{
		id: ulid(),
		trailId,
		name: "Buchanan County Tourism",
		zone: "west" as const,
		phone: "276-935-6508",
		website: "https://buchanancountytourism.com/tourism",
		city: "Grundy",
	},
	{
		id: ulid(),
		trailId,
		name: "City of Norton",
		zone: "west" as const,
		phone: "276-679-1160",
		website: "https://nortonva.gov/",
		city: "Norton",
	},
	{
		id: ulid(),
		trailId,
		name: "Town of Damascus",
		zone: "west" as const,
		phone: "276-475-3831",
		website: "https://www.visitdamascus.org/",
		city: "Damascus",
	},
	{
		id: ulid(),
		trailId,
		name: "Dickenson County",
		zone: "west" as const,
		phone: "423-926-6074",
		website: "https://dickensonva.org/",
		city: "Clintwood",
	},
	{
		id: ulid(),
		trailId,
		name: "Lee County",
		zone: "west" as const,
		phone: "276-346-4629",
		website: "https://www.ilovelee.org/",
		city: "Jonesville",
	},
	{
		id: ulid(),
		trailId,
		name: "Russell County",
		zone: "west" as const,
		phone: "276-254-0745",
		website: "https://experiencerussell.com/",
		city: "Lebanon",
	},
	{
		id: ulid(),
		trailId,
		name: "Scott County",
		zone: "west" as const,
		phone: "276-386-6521",
		website: "https://explorescottcountyva.org/",
		city: "Gate City",
	},
	{
		id: ulid(),
		trailId,
		name: "Town of Haysi",
		zone: "west" as const,
		phone: "276-345-2052",
		website: "https://haysivirginia.gov/",
		city: "Haysi",
	},
	{
		id: ulid(),
		trailId,
		name: "Wise County",
		zone: "west" as const,
		phone: "276-328-2321",
		website: "https://visitwisecounty.com/",
		city: "Wise",
	},

	// Central Zone
	{
		id: ulid(),
		trailId,
		name: "Bland County",
		zone: "central" as const,
		phone: "276-688-4622",
		website: "https://www.blandcountyva.gov/",
		city: "Bland",
	},
	{
		id: ulid(),
		trailId,
		name: "Carroll County",
		zone: "central" as const,
		phone: "276-730-3100",
		website: "https://www.lovecarroll.com/",
		city: "Hillsville",
	},
	{
		id: ulid(),
		trailId,
		name: "City of Galax",
		zone: "central" as const,
		phone: "276-238-8130",
		website: "https://visitgalax.com/",
		city: "Galax",
	},
	{
		id: ulid(),
		trailId,
		name: "Grayson County",
		zone: "central" as const,
		phone: "276-773-2000",
		website: "https://www.graysoncountyva.gov/",
		city: "Independence",
	},
	{
		id: ulid(),
		trailId,
		name: "Smyth County",
		zone: "central" as const,
		phone: "276-646-3306",
		website: "https://visitsmythcountyva.com/",
		city: "Marion",
	},
	{
		id: ulid(),
		trailId,
		name: "Tazewell County",
		zone: "central" as const,
		phone: "800-588-9401",
		website: "https://visittazewellcounty.org/",
		city: "Tazewell",
	},
	{
		id: ulid(),
		trailId,
		name: "Town of Marion",
		zone: "central" as const,
		phone: "276-378-5026",
		website: "https://www.marionva.org/",
		city: "Marion",
	},
	{
		id: ulid(),
		trailId,
		name: "Wytheville CVB",
		zone: "central" as const,
		phone: "276-223-3355",
		website: "https://www.visitwytheville.com/",
		city: "Wytheville",
	},

	// East Zone
	{
		id: ulid(),
		trailId,
		name: "City of Radford",
		zone: "east" as const,
		phone: "540-267-3153",
		website: "https://www.visitradford.com/",
		city: "Radford",
	},
	{
		id: ulid(),
		trailId,
		name: "Floyd County",
		zone: "east" as const,
		phone: "540-745-4407",
		website: "https://visitfloydva.com/",
		city: "Floyd",
	},
	{
		id: ulid(),
		trailId,
		name: "Franklin County",
		zone: "east" as const,
		phone: "540-483-3030",
		website: "https://www.visitfranklincountyva.com/",
		city: "Rocky Mount",
	},
	{
		id: ulid(),
		trailId,
		name: "Giles County",
		zone: "east" as const,
		phone: "540-921-2079",
		website: "https://virginiasmtnplayground.com/",
		city: "Pearisburg",
	},
	{
		id: ulid(),
		trailId,
		name: "Montgomery County / Blacksburg / Christiansburg",
		zone: "east" as const,
		phone: "540-394-4470",
		website: "https://gotomontva.com/",
		city: "Blacksburg",
	},
	{
		id: ulid(),
		trailId,
		name: "Patrick County",
		zone: "east" as const,
		phone: "276-694-6094",
		website: "https://visitpatrickcounty.org/",
		city: "Stuart",
	},
	{
		id: ulid(),
		trailId,
		name: "Pulaski County",
		zone: "east" as const,
		phone: "540-674-1991",
		website: "https://www.pulaskivatourism.org/",
		city: "Pulaski",
	},
	{
		id: ulid(),
		trailId,
		name: "Town of Boones Mill",
		zone: "east" as const,
		phone: "540-334-5404",
		website: "https://www.townofboonesmill.org/",
		city: "Boones Mill",
	},
	{
		id: ulid(),
		trailId,
		name: "Town of Rocky Mount",
		zone: "east" as const,
		phone: "540-483-7660",
		website: "https://rockymountva.org/",
		city: "Rocky Mount",
	},
];
